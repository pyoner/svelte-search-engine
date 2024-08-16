import type { Gname } from '$lib/types/base';
import type { UIComponents } from '$lib/types/components';
import type { ComponentConfig, OptComponentConfig } from '$lib/types/google';

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
