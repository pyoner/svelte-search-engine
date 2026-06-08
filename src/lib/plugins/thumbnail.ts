import type { Result } from '../types/search';
import type { Plugin, PluginContext } from '../internal/plugin/types';

export interface ThumbnailEntry {
	large?: string;
	medium?: string;
	largeHeight?: number;
	largeWidth?: number;
	mediumHeight?: number;
	mediumWidth?: number;
}

export const thumbnailPlugin: Plugin = {
	name: 'thumbnail',
	dependencies: ['json-interceptor'],
	beforeReady(input, ctx) {
		const map = ctx.thumbnailMap as Map<string, ThumbnailEntry> | undefined;
		if (!map) return;
		for (const result of input.results) {
			const url = result.thumbnailImage?.url;
			if (!url) continue;

			const match = url.match(/[?&]q=tbn:([^&]+)/);
			const id = match?.[1];
			if (!id) continue;

			const extra = map.get(id);
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
	}
};

export function getLargeThumbnailUrl(result: Result): string | undefined {
	const r = result as Record<string, unknown>;
	return (r['thumbnailImageLarge'] as { url?: string } | undefined)?.url;
}

export function getMediumThumbnailUrl(result: Result): string | undefined {
	const r = result as Record<string, unknown>;
	return (r['thumbnailImageMedium'] as { url?: string } | undefined)?.url;
}

export function enrichResults(results: Result[], ctx: PluginContext) {
	const map = ctx.thumbnailMap as Map<string, ThumbnailEntry> | undefined;
	if (!map) return results;
	for (const result of results) {
		const url = result.thumbnailImage?.url;
		if (!url) continue;

		const match = url.match(/[?&]q=tbn:([^&]+)/);
		const id = match?.[1];
		if (!id) continue;

		const extra = map.get(id);
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
