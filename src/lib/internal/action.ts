import type { Action } from 'svelte/action';
import { api } from '$lib/internal/api';
import type { ComponentAttributes } from '$lib/types/google';
import type { UIComponents } from '$lib/types/components';
import { registryComponents } from './registry';
import { subscribeComponents } from './store';

export const gcseAction: Action<
	HTMLElement,
	{ gname: string; tag: 'search'; attributes: ComponentAttributes; components?: UIComponents }
> = (node, { gname, tag, attributes, components }) => {
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
