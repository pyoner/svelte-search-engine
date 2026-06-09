import { mount } from 'svelte';
import { writable, type Unsubscriber } from 'svelte/store';
import type { Gname } from '$lib/types/base';
import { searchType } from '$lib/types/search';
import type {
	SearchEngineComponent,
	SearchEngineComponentProps,
	UIComponents
} from '$lib/types/components';

import { destroyRegistry } from './destroy';
import type { StartingInput, ReadyInput, RenderedInput } from './types';

export const init = writable(false);
export const starting = writable<StartingInput | null>(null);
export const ready = writable<ReadyInput | null>(null);
export const rendered = writable<RenderedInput | null>(null);

export function subscribeComponent(gname: Gname, component: SearchEngineComponent) {
	return ready.subscribe((input) => {
		if (!input) {
			return;
		}

		const c = mount(component, {
			target: input.div,
			props: {
				gname: gname,
				type: input.type,
				promos: input.promos,
				results: input.results
			} satisfies SearchEngineComponentProps
		});
		destroyRegistry.set(input.div, c);
	});
}

export function subscribeComponents(gname: Gname, components: UIComponents) {
	const arr = searchType.reduce<Unsubscriber[]>((acc, k) => {
		const component = components[k];
		if (component) {
			acc.push(subscribeComponent(gname, component));
		}
		return acc;
	}, []);

	return () => arr.forEach((unsubscribe) => unsubscribe());
}
