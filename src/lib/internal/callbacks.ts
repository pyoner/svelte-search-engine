import type { SearchCallback, SearchType } from '$lib/types/search';
import { registry } from './registry';
import {
	createPluginContext,
	createPluginManager,
	type Plugin,
	type PluginContext,
	type PluginManager
} from './plugin';
import { init, starting, ready, rendered } from './store';

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

export function createCSECallbacks(
	plugins: Plugin<unknown>[],
	onInit: () => void
): {
	initializationCallback: () => void;
	searchCallbacks: {
		image: SearchCallback;
		web: SearchCallback;
	};
	destroy: () => void;
} {
	const pluginCtx = createPluginContext();
	const pluginManager = createPluginManager(plugins);

	return {
		initializationCallback: () => {
			pluginManager.init(pluginCtx);
			init.set(true);
			onInit();
		},
		searchCallbacks: {
			image: createCallbacks('image', pluginCtx, pluginManager),
			web: createCallbacks('web', pluginCtx, pluginManager)
		},
		destroy() {
			pluginManager.destroy(pluginCtx);
		}
	};
}
