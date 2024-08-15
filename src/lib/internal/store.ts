import { writable, type Unsubscriber } from 'svelte/store';
import type { Promotion, Result, SearchCallback } from '$lib/types/search';
import type { CseComponent, UIComponents } from '$lib/types/components';

import { registry } from './registry';
import { destroyRegistry } from './destroy';

export const searchType = ['web', 'image'] as const;
export type SearchType = (typeof searchType)[number];

export type StartingInput = {
	type: SearchType;
	gname: string;
	query: string;
};

export type ReadyInput = {
	type: SearchType;
	gname: string;
	query: string;
	promos: Promotion[] | undefined;
	results: Result[];
	div: HTMLElement;
};

export type RenderedInput = {
	type: SearchType;
	gname: string;
	query: string;
	promos: HTMLElement[];
	results: HTMLElement[];
};

export const init = writable(false);
export const starting = writable<StartingInput | null>(null);
export const ready = writable<ReadyInput | null>(null);
export const rendered = writable<RenderedInput | null>(null);

export function createCallbacks(type: SearchType): SearchCallback {
	return {
		starting(gname, query) {
			starting.set({ type, gname, query });
		},
		ready(gname, query, promos, results, div) {
			ready.set({ type, gname, query, promos, results, div });
			return registry.has(type, gname) ? true : undefined;
		},
		rendered(gname, query, promos, results) {
			rendered.set({ type, gname, query, promos, results });
		}
	};
}

export function subscribeComponent(gname: string, component: typeof CseComponent) {
	return ready.subscribe((input) => {
		if (!input) {
			return;
		}

		const c = new component({
			target: input.div,
			props: {
				promos: input.promos,
				results: input.results
			}
		});
		destroyRegistry.set(input.div, c);
	});
}

export function subscribeComponents(gname: string, components: UIComponents) {
	const arr = searchType.reduce<Unsubscriber[]>((acc, k) => {
		const component = components[k];
		if (component) {
			acc.push(subscribeComponent(gname, component));
		}
		return acc;
	}, []);

	return () => arr.forEach((unsubscribe) => unsubscribe());
}
