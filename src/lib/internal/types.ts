import type { Gname } from '$lib/types/base';
import type { UIComponents } from '$lib/types/components';
import type { ComponentConfig } from '$lib/types/google';

export type ContextValue = Required<ComponentConfig> & {
	// tag: 'searchbox' | 'searchresults';
	components?: UIComponents;
};
export type Context = Record<Gname, ContextValue>;
