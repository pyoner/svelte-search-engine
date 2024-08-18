import type { Action } from 'svelte/action';

import type { Gname } from '$lib/types/base';
import type { UIComponents } from '$lib/types/components';
import type { ParamObject, ParamConf, ParamOptConf } from './types';

import { api } from './api';
import { registryComponents } from './registry';
import { subscribeComponents } from './store';

export const searchEngine: Action<
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
