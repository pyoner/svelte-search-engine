import { searchApi, searchCSEApi } from '$lib/internal/api';
import type { StartingInput } from '$lib/internal/types';
import type { Gname } from '$lib/types/base';
import type { SearchType } from '$lib/types/search';
import type { CseElement } from '$lib/types/google';
import type { Plugin } from '../internal/plugin';

interface CseCursor {
	currentPageIndex: number;
	estimatedResultCount: string;
	moreResultsUrl: string;
	resultCount: string;
	searchResultTime: string;
	pages: Array<{ label: number; start: string }>;
}

interface CseContext {
	title: string;
	total_results: string;
	display_facets: unknown[];
}

export interface CseResult {
	content: string;
	contentNoFormatting: string;
	title: string;
	titleNoFormatting: string;
	unescapedUrl: string;
	url: string;
	visibleUrl: string;
	originalContextUrl: string;
	height: string;
	width: string;
	tbUrl: string;
	tbMedUrl: string;
	tbLargeUrl: string;
	tbHeight: string;
	tbMedHeight: string;
	tbLargeHeight: string;
	tbWidth: string;
	tbMedWidth: string;
	tbLargeWidth: string;
	imageId: string;
	breadcrumbUrl: { crumbs: string[] };
	fileFormat: string;
	target: string;
	html: Record<string, unknown>;
}

export interface CsePayload {
	cursor?: CseCursor;
	context?: CseContext;
	results?: CseResult[];
}

type CseApiMenthodName = `api${string}`;
type CseApiMethod = (payload: CsePayload) => void;

type CseTarget = {
	element: CseElement;
	[key: CseApiMenthodName]: CseApiMethod | undefined;
};

class JsonInterceptorPlugin implements Plugin {
	#json = new Map<string, CsePayload>();
	#key: string | null = null;

	init() {
		const search = searchApi();
		const cse = searchCSEApi();

		const handler: ProxyHandler<CseTarget> = {
			set: (target, prop, value) => {
				if (typeof prop === 'string' && prop.startsWith('api')) {
					const key = this.#key;
					const original = value as CseApiMethod;

					target[prop as CseApiMenthodName] = (payload: CsePayload) => {
						if (key) {
							this.#json.set(key, payload);
						}
						return original(payload);
					};
					return true;
				}
				return Reflect.set(target, prop, value);
			}
		};

		search.cse = new Proxy(cse, handler);
	}

	private createKey(gname: Gname, type: SearchType): string {
		return `${gname}:${type}`;
	}

	beforeStarting(input: StartingInput) {
		this.#key = this.createKey(input.gname, input.type);
	}

	afterRendered(): void {
		if (this.#key) {
			this.#json.delete(this.#key);
			this.#key = null;
		}
	}

	getJson(gname: Gname, type: SearchType): CsePayload | undefined {
		return this.#json.get(this.createKey(gname, type));
	}
}

export const jsonInterceptorPlugin = new JsonInterceptorPlugin();

export function getJson(gname: Gname, type: SearchType): CsePayload | undefined {
	return jsonInterceptorPlugin.getJson(gname, type);
}
