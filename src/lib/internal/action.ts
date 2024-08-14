import type { Action } from 'svelte/action';

import type { ComponentConfig } from '$lib/types/google';
import type { UIComponents } from '$lib/types/components';

import { api } from '$lib/internal/api';
import { registryComponents } from './registry';
import { subscribeComponents } from './store';

export type GcseActionParams = Required<Pick<ComponentConfig, 'gname' | 'tag' | 'attributes'>> & {
	components?: UIComponents;
};
export const gcseAction: Action<HTMLElement, GcseActionParams> = (
	node,
	{ gname, tag, attributes, components }
) => {
	api().then((x) => {
		x.render({ gname, tag, div: node, attributes });
	});

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
