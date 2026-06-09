import type { Gname } from '$lib/types/base';
import type { Promotion, Result, SearchCallback, SearchType } from '$lib/types/search';
import { registry } from './registry';
import type { PluginContext, PluginManager } from './plugin';
import { starting, ready, rendered } from './store';

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

export function createCallbacks(
	type: SearchType,
	pluginCtx: PluginContext,
	pluginManager: PluginManager
): SearchCallback {
	return {
		starting(gname, query) {
			const input = { type, gname, query };
			pluginManager.runBeforeStarting(input, pluginCtx);
			starting.set(input);
			pluginManager.runAfterStarting(input, pluginCtx);
		},
		ready(gname, query, promos, results, div) {
			const input = { type, gname, query, promos, results, div };
			pluginManager.runBeforeReady(input, pluginCtx);
			ready.set(input);
			pluginManager.runAfterReady(input, pluginCtx);
			return registry.has(type, gname) ? true : undefined;
		},
		rendered(gname, query, promos, results) {
			const input = { type, gname, query, promos, results };
			pluginManager.runBeforeRendered(input, pluginCtx);
			rendered.set(input);
			pluginManager.runAfterRendered(input, pluginCtx);
		}
	};
}
