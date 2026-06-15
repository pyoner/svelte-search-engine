import type { Plugin } from '../internal/plugin';
import { getJson, type CseResult } from './json-interceptor';
import type { BaseResult, Image } from '../types/search';
import type { ReadyInput } from '../internal/types';

export type WithThumbs<T extends { results: Array<BaseResult> }> = Omit<T, 'results'> & {
	results: Array<
		T['results'][number] & {
			thumbnailLarge?: Image;
			thumbnailMedium?: Image;
		}
	>;
};

type TbPrefix = 'tbLarge' | 'tbMed';
type CseImageFields = {
	tbUrl: string;
	tbHeight: string;
	tbWidth: string;
};

function cseResultToImage(r: CseResult, prefix: TbPrefix): Image | undefined {
	const fields: CseImageFields = {
		tbUrl: r[`${prefix}Url`],
		tbHeight: r[`${prefix}Height`],
		tbWidth: r[`${prefix}Width`]
	};
	if (!fields.tbUrl) return undefined;
	const image: Image = { url: fields.tbUrl };
	const h = Number(fields.tbHeight);
	const w = Number(fields.tbWidth);
	if (!Number.isNaN(h)) image.height = h;
	if (!Number.isNaN(w)) image.width = w;
	return image;
}

function extractImageId(result: BaseResult): string | undefined {
	const url = result.thumbnailImage?.url;
	if (!url) return undefined;
	const match = url.match(/[?&]q=tbn:([^&]+)/);
	return match?.[1];
}

class ThumbnailPlugin implements Plugin<'image'> {
	type = 'image' as const;

	beforeReady(input: WithThumbs<ReadyInput<'image'>>) {
		const json = getJson(input.gname, input.type);
		if (!json?.results) return;

		for (const result of input.results) {
			const id = extractImageId(result);
			if (!id) continue;

			const r = json.results.find((x) => x.imageId === id);
			if (!r) continue;

			const large = cseResultToImage(r, 'tbLarge');
			if (large) result.thumbnailLarge = large;

			const medium = cseResultToImage(r, 'tbMed');
			if (medium) result.thumbnailMedium = medium;
		}
	}
}

export const thumbnailPlugin = new ThumbnailPlugin();
