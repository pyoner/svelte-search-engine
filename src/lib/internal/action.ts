import type { Action } from 'svelte/action';

import type { ComponentConfig } from '$lib/types/google';
import type { UIComponents } from '$lib/types/components';

import { api } from './api';
import { registryComponents } from './registry';
import { subscribeComponents } from './store';
import type { Gname } from '$lib/types/base';

export type GcseActionParam = Required<Pick<ComponentConfig, 'gname' | 'tag' | 'attributes'>> &
	Partial<Pick<ComponentConfig, 'div'>> & {
		components?: UIComponents;
	};
export type GcseActionParamConf = GcseActionParam & Required<Pick<ComponentConfig, 'div'>>;
export type GcseActionParamOptConf = GcseActionParamConf & { tag: 'searchresults' };
export const gcseAction: Action<
	HTMLElement,
	GcseActionParam | [GcseActionParamConf, GcseActionParamOptConf] | undefined
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
