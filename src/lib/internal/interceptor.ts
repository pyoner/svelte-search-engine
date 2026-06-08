import type { Result } from '$lib/types/search';

interface ThumbnailEntry {
	large?: string;
	medium?: string;
	largeHeight?: number;
	largeWidth?: number;
	mediumHeight?: number;
	mediumWidth?: number;
}

interface CsePayload {
	results?: Array<{
		imageId?: string;
		tbLargeUrl?: string;
		tbMedUrl?: string;
		tbLargeHeight?: string | number;
		tbLargeWidth?: string | number;
		tbMedHeight?: string | number;
		tbMedWidth?: string | number;
	}>;
}

// Lookup map populated by the JSONP interceptor
const thumbnailMap = new Map<string, ThumbnailEntry>();

/**
 * Patches the google.search.cse object with a Proxy that intercepts
 * dynamic JSONP callback assignments (e.g. google.search.cse.api4978).
 * When a callback is assigned, we wrap it so the raw JSONP payload is
 * dumped to console and the tbLargeUrl / tbMedUrl values are captured.
 *
 * This relies on an internal Google naming convention and may break
 * without warning. Use only as a best-effort enrichment.
 */
export function initJsonpInterceptor() {
	if (typeof window === 'undefined') return;

	const interval = setInterval(() => {
		const googleObj = window.google as unknown as Record<string, unknown> | undefined;
		const searchObj = googleObj?.search as Record<string, unknown> | undefined;
		const cse = searchObj?.cse as Record<string, unknown> | undefined;
		if (!cse) return;
		clearInterval(interval);

		const handler: ProxyHandler<Record<string, unknown>> = {
			set(target, prop: string | symbol, value: unknown) {
				if (typeof prop === 'string' && prop.startsWith('api') && typeof value === 'function') {
					const original = value as (...args: unknown[]) => unknown;
					target[prop] = (...args: unknown[]) => {
						// Dump raw JSONP payload to console
						console.log('[CSE JSONP]', prop, args);
						try {
							const payload = args[0] as CsePayload | undefined;
							if (payload && Array.isArray(payload.results)) {
								for (const r of payload.results) {
									const id = r.imageId;
									if (!id) continue;
									thumbnailMap.set(id, {
										large: r.tbLargeUrl,
										medium: r.tbMedUrl,
										largeHeight: Number(r.tbLargeHeight) || undefined,
										largeWidth: Number(r.tbLargeWidth) || undefined,
										mediumHeight: Number(r.tbMedHeight) || undefined,
										mediumWidth: Number(r.tbMedWidth) || undefined
									});
								}
							}
						} catch (e) {
							console.warn('[CSE JSONP] failed to parse payload', e);
						}
						return original(...args);
					};
					return true;
				}
				target[prop as string] = value;
				return true;
			}
		};

		const proxy = new Proxy(cse, handler);
		if (searchObj) {
			searchObj.cse = proxy;
		}
	}, 50);
}

/**
 * Enrich a Result array in-place by looking up intercepted large/medium
 * thumbnails via the result's thumbnailImage URL (which contains the imageId).
 */
export function enrichResults(results: Result[]) {
	for (const result of results) {
		const url = result.thumbnailImage?.url;
		if (!url) continue;

		// Extract imageId from the small thumbnail URL query param
		const match = url.match(/[?&]q=tbn:([^&]+)/);
		const id = match?.[1];
		if (!id) continue;

		const extra = thumbnailMap.get(id);
		if (!extra) continue;

		const enriched = result as Record<string, unknown>;

		if (extra.large) {
			const large: Record<string, unknown> = { url: extra.large };
			if (extra.largeHeight !== undefined) large.height = extra.largeHeight;
			if (extra.largeWidth !== undefined) large.width = extra.largeWidth;
			enriched['thumbnailImageLarge'] = large;
		}
		if (extra.medium) {
			const medium: Record<string, unknown> = { url: extra.medium };
			if (extra.mediumHeight !== undefined) medium.height = extra.mediumHeight;
			if (extra.mediumWidth !== undefined) medium.width = extra.mediumWidth;
			enriched['thumbnailImageMedium'] = medium;
		}
	}
	return results;
}

/**
 * Get the large thumbnail URL for a Result (if intercepted).
 */
export function getLargeThumbnailUrl(result: Result): string | undefined {
	const r = result as Record<string, unknown>;
	return (r['thumbnailImageLarge'] as { url?: string } | undefined)?.url;
}

/**
 * Get the medium thumbnail URL for a Result (if intercepted).
 */
export function getMediumThumbnailUrl(result: Result): string | undefined {
	const r = result as Record<string, unknown>;
	return (r['thumbnailImageMedium'] as { url?: string } | undefined)?.url;
}
