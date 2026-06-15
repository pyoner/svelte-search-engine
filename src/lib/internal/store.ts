import { mount } from 'svelte';
import { writable, type Unsubscriber } from 'svelte/store';
import type { Gname } from '$lib/types/base';
import { searchType, type SearchType } from '$lib/types/search';
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

export function subscribeComponent<T extends SearchType>(
	gname: Gname,
	type: T,
	component: SearchEngineComponent<T>
) {
	return ready.subscribe((input) => {
		if (!input || input.gname !== gname || input.type !== type) {
			return;
		}

		const c = mount(component, {
			target: input.div,
			props: {
				gname: gname,
				type,
				promos: input.promos,
				results: input.results as SearchEngineComponentProps<T>['results']
			}
		});
		destroyRegistry.set(input.div, c);
	});
}

export function subscribeComponents(gname: Gname, components: UIComponents) {
	const arr = searchType.reduce<Unsubscriber[]>((acc, type) => {
		const component = components[type];
		if (component) {
			acc.push(subscribeComponent(gname, type, component as SearchEngineComponent));
		}
		return acc;
	}, []);

	return () => arr.forEach((unsubscribe) => unsubscribe());
}
