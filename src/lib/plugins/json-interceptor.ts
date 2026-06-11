import type { RenderedInput, StartingInput } from '$lib/internal/types';
import type { Gname } from '$lib/types/base';
import type { SearchType } from '$lib/types/search';
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
	#json: Map<string, CsePayload> = new Map();
	#key: string | null = null;

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
						console.log('jsonp callback', prop);
						const key = this.#key;
						console.log('key', key);
						const original = value as (...args: unknown[]) => unknown;
						target[prop] = (...args: unknown[]) => {
							console.log('[CSE JSONP]', prop, args);
							try {
								const payload = args[0] as CsePayload | undefined;
								if (payload && key) {
									this.#json.set(key, payload);
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

	private createKey(gname: Gname, type: SearchType): string {
		return `${gname}:${type}`;
	}

	beforeStarting(input: StartingInput) {
		this.#key = this.createKey(input.gname, input.type);
		console.log('beforeStarting', input);
	}

	afterRendered(input: RenderedInput): void {
		if (this.#key) {
			this.#json.delete(this.#key);
			this.#key = null;
		}
		console.log('afterRendered', input);
		console.log('clear');
	}

	getJson(gname: Gname, type: SearchType): CsePayload | undefined {
		console.log('getJson', gname, type);
		return this.#json.get(this.createKey(gname, type));
	}
}

export const jsonInterceptorPlugin = new JsonInterceptorPlugin();

export function getJson(gname: Gname, type: SearchType): CsePayload | undefined {
	return jsonInterceptorPlugin.getJson(gname, type);
}
