import type { PluginBase } from '../internal/plugin';

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

export interface ThumbnailEntry {
	large?: string;
	medium?: string;
	largeHeight?: number;
	largeWidth?: number;
	mediumHeight?: number;
	mediumWidth?: number;
}

class JsonInterceptorPlugin implements PluginBase {
	#json: CsePayload | null = null;

	init() {
		if (typeof window === 'undefined') return;

		const interval = setInterval(() => {
			const googleObj = window.google as unknown as Record<string, unknown> | undefined;
			const searchObj = googleObj?.search as Record<string, unknown> | undefined;
			const cse = searchObj?.cse as Record<string, unknown> | undefined;
			if (!cse) return;
			clearInterval(interval);

			const handler: ProxyHandler<Record<string, unknown>> = {
				set: (target, prop: string | symbol, value: unknown) => {
					if (typeof prop === 'string' && prop.startsWith('api') && typeof value === 'function') {
						const original = value as (...args: unknown[]) => unknown;
						target[prop] = (...args: unknown[]) => {
							console.log('[CSE JSONP]', prop, args);
							try {
								const payload = args[0] as CsePayload | undefined;
								if (payload) {
									this.#json = payload;
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

	beforeStarting() {
		this.#json = null;
	}

	getJson(): CsePayload | null {
		return this.#json;
	}
}

export const jsonInterceptorPlugin = new JsonInterceptorPlugin();

export function getJson(): CsePayload | null {
	return jsonInterceptorPlugin.getJson();
}
