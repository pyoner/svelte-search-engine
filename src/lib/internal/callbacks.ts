import type { SearchCallback, SearchType } from '$lib/types/search';
import { registry } from './registry';
import {
	initAll,
	beforeStartingAll,
	afterStartingAll,
	beforeReadyAll,
	afterReadyAll,
	beforeRenderedAll,
	afterRenderedAll,
	destroyAll
} from './plugin';
import { init, starting, ready, rendered } from './store';

export function createCallbacks(type: SearchType): SearchCallback {
	return {
		starting(gname, query) {
			const input = { type, gname, query };
			beforeStartingAll(input);
			starting.set(input);
			afterStartingAll(input);
		},
		ready(gname, query, promos, results, div) {
			const input = { type, gname, query, promos, results, div };
			beforeReadyAll(input);
			ready.set(input);
			afterReadyAll(input);
			return registry.has(type, gname) ? true : undefined;
		},
		rendered(gname, query, promos, results) {
			const input = { type, gname, query, promos, results };
			beforeRenderedAll(input);
			rendered.set(input);
			afterRenderedAll(input);
		}
	};
}

export function createCSECallbacks(onInit: () => void): {
	initializationCallback: () => void;
	searchCallbacks: {
		image: SearchCallback;
		web: SearchCallback;
	};
	destroy: () => void;
} {
	return {
		initializationCallback: () => {
			initAll();
			init.set(true);
			onInit();
		},
		searchCallbacks: {
			image: createCallbacks('image'),
			web: createCallbacks('web')
		},
		destroy() {
			destroyAll();
		}
	};
}
