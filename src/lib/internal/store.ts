import { mount } from 'svelte';
import { writable, type Unsubscriber } from 'svelte/store';
import type { Gname } from '$lib/types/base';
import type { Promotion, Result, SearchCallback, SearchType } from '$lib/types/search';
import { searchType } from '$lib/types/search';
import type {
	SearchEngineComponent,
	SearchEngineComponentProps,
	UIComponents
} from '$lib/types/components';

import { registry } from './registry';
import { destroyRegistry } from './destroy';
import {
	createPluginContext,
	runBeforeStartingHook,
	runAfterStartingHook,
	runBeforeReadyHook,
	runAfterReadyHook,
	runBeforeRenderedHook,
	runAfterRenderedHook
} from './plugin';

export type StartingInput = {
	type: SearchType;
	gname: Gname;
	query: string;
};

export type ReadyInput = {
	type: SearchType;
	gname: Gname;
	query: string;
	promos: Promotion[] | undefined;
	results: Result[];
	div: HTMLElement;
};

export type RenderedInput = {
	type: SearchType;
	gname: Gname;
	query: string;
	promos: HTMLElement[];
	results: HTMLElement[];
};

export const init = writable(false);
export const starting = writable<StartingInput | null>(null);
export const ready = writable<ReadyInput | null>(null);
export const rendered = writable<RenderedInput | null>(null);

export const pluginCtx = createPluginContext();

export function createCallbacks(type: SearchType): SearchCallback {
	return {
		starting(gname, query) {
			const input = { type, gname, query };
			runBeforeStartingHook(input, pluginCtx);
			starting.set(input);
			runAfterStartingHook(input, pluginCtx);
		},
		ready(gname, query, promos, results, div) {
			const input = { type, gname, query, promos, results, div };
			runBeforeReadyHook(input, pluginCtx);
			ready.set(input);
			runAfterReadyHook(input, pluginCtx);
			return registry.has(type, gname) ? true : undefined;
		},
		rendered(gname, query, promos, results) {
			const input = { type, gname, query, promos, results };
			runBeforeRenderedHook(input, pluginCtx);
			rendered.set(input);
			runAfterRenderedHook(input, pluginCtx);
		}
	};
}

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
