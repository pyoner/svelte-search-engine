import type { PluginBase } from '../internal/plugin';
import { getJson } from './json-interceptor';
import type { Result, Image, SearchType } from '../types/search';
import type { Gname } from '$lib/types/base';

export interface ThumbnailEntry {
	large?: string;
	medium?: string;
	largeHeight?: number;
	largeWidth?: number;
	mediumHeight?: number;
	mediumWidth?: number;
}

export interface ThumbnailApi {
	getLarge: (result: Result) => Image | undefined;
	getMedium: (result: Result) => Image | undefined;
}

class ThumbnailPlugin implements PluginBase {
	#map = new Map<string, ThumbnailEntry>();

	beforeStarting() {
		this.#map.clear();
	}

	getLarge(gname: Gname, type: SearchType, result: Result): Image | undefined {
		const extra = this.#lookupEntry(gname, type, result);
		if (!extra?.large) return undefined;
		const large: Image = { url: extra.large };
		if (extra.largeHeight !== undefined) large.height = extra.largeHeight;
		if (extra.largeWidth !== undefined) large.width = extra.largeWidth;
		return large;
	}

	getMedium(gname: Gname, type: SearchType, result: Result): Image | undefined {
		const extra = this.#lookupEntry(gname, type, result);
		if (!extra?.medium) return undefined;
		const medium: Image = { url: extra.medium };
		if (extra.mediumHeight !== undefined) medium.height = extra.mediumHeight;
		if (extra.mediumWidth !== undefined) medium.width = extra.mediumWidth;
		return medium;
	}

	#extractImageId(result: Result): string | undefined {
		const url = result.thumbnailImage?.url;
		if (!url) return undefined;
		const match = url.match(/[?&]q=tbn:([^&]+)/);
		return match?.[1];
	}

	#lookupEntry(gname: Gname, type: SearchType, result: Result): ThumbnailEntry | undefined {
		const json = getJson(gname, type);
		if (!json || !Array.isArray(json.results)) return undefined;

		const id = this.#extractImageId(result);
		if (!id) return undefined;

		// Find the result in the JSON that matches this imageId
		for (const r of json.results) {
			if (r.imageId === id) {
				return {
					large: r.tbLargeUrl,
					medium: r.tbMedUrl,
					largeHeight: Number(r.tbLargeHeight) || undefined,
					largeWidth: Number(r.tbLargeWidth) || undefined,
					mediumHeight: Number(r.tbMedHeight) || undefined,
					mediumWidth: Number(r.tbMedWidth) || undefined
				};
			}
		}
		return undefined;
	}
}

export const thumbnailPlugin = new ThumbnailPlugin();

export function getLargeThumbnail(gname: Gname, type: SearchType, result: Result) {
	return thumbnailPlugin.getLarge(gname, type, result);
}

export function getMediumThumbnail(gname: Gname, type: SearchType, result: Result) {
	return thumbnailPlugin.getMedium(gname, type, result);
}
