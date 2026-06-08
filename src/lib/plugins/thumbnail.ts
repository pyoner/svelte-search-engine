import type { Result, Image } from '../types/search';
import type { Plugin, PluginContext } from '../internal/plugin/types';

export interface ThumbnailEntry {
	large?: string;
	medium?: string;
	largeHeight?: number;
	largeWidth?: number;
	mediumHeight?: number;
	mediumWidth?: number;
}

export interface ThumbnailApi {
	getLarge(result: Result): Image | undefined;
	getMedium(result: Result): Image | undefined;
}

let pluginCtx: PluginContext | null = null;

function extractImageId(result: Result): string | undefined {
	const url = result.thumbnailImage?.url;
	if (!url) return undefined;
	const match = url.match(/[?&]q=tbn:([^&]+)/);
	return match?.[1];
}

function lookupEntry(result: Result): ThumbnailEntry | undefined {
	if (!pluginCtx) return undefined;
	const map = pluginCtx.thumbnailMap as Map<string, ThumbnailEntry> | undefined;
	if (!map) return undefined;
	const id = extractImageId(result);
	if (!id) return undefined;
	return map.get(id);
}

export const thumbnailPlugin: Plugin<ThumbnailApi> = {
	name: 'thumbnail',
	dependencies: ['json-interceptor'],
	init(ctx) {
		pluginCtx = ctx;
	},
	api: {
		getLarge(result) {
			const extra = lookupEntry(result);
			if (!extra?.large) return undefined;
			const large: Image = { url: extra.large };
			if (extra.largeHeight !== undefined) large.height = extra.largeHeight;
			if (extra.largeWidth !== undefined) large.width = extra.largeWidth;
			return large;
		},
		getMedium(result) {
			const extra = lookupEntry(result);
			if (!extra?.medium) return undefined;
			const medium: Image = { url: extra.medium };
			if (extra.mediumHeight !== undefined) medium.height = extra.mediumHeight;
			if (extra.mediumWidth !== undefined) medium.width = extra.mediumWidth;
			return medium;
		}
	}
};

// Convenience wrappers that delegate to the plugin API
export function getLargeThumbnailUrl(result: Result): string | undefined {
	return thumbnailPlugin.api?.getLarge(result)?.url;
}

export function getMediumThumbnailUrl(result: Result): string | undefined {
	return thumbnailPlugin.api?.getMedium(result)?.url;
}
