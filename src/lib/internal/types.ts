import type { Gname } from '$lib/types/base';
import type { UIComponents } from '$lib/types/components';
import type { ComponentConfig, OptComponentConfig } from '$lib/types/google';
import type { ImageResult, Promotion, SearchType, WebResult } from '$lib/types/search';

export type WithGname = { gname: Gname };
export type WithTag<T extends ComponentConfig['tag']> = { tag: T };
export type WithPartialComponents = {
	components?: UIComponents;
};

export type ParamBase = ComponentConfig & WithGname & WithPartialComponents;
export type ParamObject = Omit<ParamBase, 'div'> &
	WithTag<'search' | 'searchbox-only' | 'searchresults-only'>;
export type ParamConf = ParamBase & WithTag<'searchbox'>;
export type ParamOptConf = OptComponentConfig & WithGname & WithPartialComponents;

export type ContextValue = ParamConf | ParamOptConf;
export type Context = Record<Gname, ContextValue>;

export type StartingInput = {
	type: SearchType;
	gname: Gname;
	query: string;
};

export type ReadyInput<T extends SearchType = SearchType> = {
	type: T;
	gname: Gname;
	query: string;
	promos: Promotion[] | undefined;
	results: T extends 'web' ? WebResult[] : ImageResult[];
	div: HTMLElement;
};

export type RenderedInput = {
	type: SearchType;
	gname: Gname;
	query: string;
	promos: HTMLElement[];
	results: HTMLElement[];
};
