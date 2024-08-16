import type { Action } from 'svelte/action';

import type { ComponentConfig, OptComponentConfig } from '$lib/types/google';
import type { UIComponents } from '$lib/types/components';

import { api } from './api';
import { registryComponents } from './registry';
import { subscribeComponents } from './store';
import type { Gname } from '$lib/types/base';

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

export const gcseAction: Action<
	HTMLElement,
	ParamObject | [ParamConf, ParamOptConf] | undefined
> = (node, param) => {
	if (!param) {
		return;
	}

	let gname: Gname;
	let components: UIComponents | undefined = undefined;
	if (Array.isArray(param)) {
		const [conf, optConf] = param;
		gname = conf.gname;
		components = optConf.components;
		api().then((x) => {
			x.render(conf, optConf);
		});
	} else {
		gname = param.gname;
		components = param.components;
		api().then((x) => {
			x.render({ ...param, div: node });
		});
	}

	if (!components) {
		return;
	}
	const unRegistryComponents = registryComponents(gname, components);
	const unsubscribeComponents = subscribeComponents(gname, components);
	return {
		destroy() {
			unRegistryComponents();
			unsubscribeComponents();
		}
	};
};
