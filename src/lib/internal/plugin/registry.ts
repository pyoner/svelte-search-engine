import type { Plugin, PluginContext } from './types';
import type { StartingInput, ReadyInput, RenderedInput } from '../store';

const plugins: Plugin[] = [];
let initialized = false;
let initCtx: PluginContext | null = null;

export function usePlugin(plugin: Plugin) {
	plugins.push(plugin);

	// If the system is already initialized, immediately run this plugin's init hook.
	// This handles plugins registered after Engine has mounted (e.g. in page components).
	if (initialized && initCtx && plugin.init) {
		Promise.resolve(plugin.init(initCtx)).catch((e) => {
			console.warn(`[Plugin] init failed for ${plugin.name}:`, e);
		});
	}
}

export function getPlugins(): Plugin[] {
	return plugins.slice();
}

export function clearPlugins() {
	plugins.length = 0;
	initialized = false;
	initCtx = null;
}

/**
 * Topologically sort plugins by their dependencies.
 */
function topologicalSort(plugins: Plugin[]): Plugin[] {
	const visited = new Set<string>();
	const temp = new Set<string>();
	const result: Plugin[] = [];
	const map = new Map(plugins.map((p) => [p.name, p]));

	function visit(p: Plugin) {
		if (temp.has(p.name)) {
			throw new Error(`Plugin dependency cycle detected at ${p.name}`);
		}
		if (visited.has(p.name)) return;
		temp.add(p.name);
		for (const dep of p.dependencies || []) {
			const depPlugin = map.get(dep);
			if (!depPlugin) {
				throw new Error(`Plugin ${p.name} depends on ${dep} which is not registered`);
			}
			visit(depPlugin);
		}
		temp.delete(p.name);
		visited.add(p.name);
		result.push(p);
	}

	for (const p of plugins) {
		visit(p);
	}
	return result;
}

export function createPluginContext(): PluginContext {
	return {};
}

export async function runInitHooks(ctx: PluginContext) {
	initCtx = ctx;
	initialized = true;
	const sorted = topologicalSort(plugins);
	for (const plugin of sorted) {
		if (plugin.init) {
			await Promise.resolve(plugin.init(ctx));
		}
	}
}

export function runBeforeStartingHook(input: StartingInput, ctx: PluginContext) {
	const sorted = topologicalSort(plugins);
	for (const plugin of sorted) {
		plugin.beforeStarting?.(input, ctx);
	}
}

export function runAfterStartingHook(input: StartingInput, ctx: PluginContext) {
	const sorted = topologicalSort(plugins);
	for (const plugin of sorted) {
		plugin.afterStarting?.(input, ctx);
	}
}

export function runBeforeReadyHook(input: ReadyInput, ctx: PluginContext) {
	const sorted = topologicalSort(plugins);
	for (const plugin of sorted) {
		plugin.beforeReady?.(input, ctx);
	}
}

export function runAfterReadyHook(input: ReadyInput, ctx: PluginContext) {
	const sorted = topologicalSort(plugins);
	for (const plugin of sorted) {
		plugin.afterReady?.(input, ctx);
	}
}

export function runBeforeRenderedHook(input: RenderedInput, ctx: PluginContext) {
	const sorted = topologicalSort(plugins);
	for (const plugin of sorted) {
		plugin.beforeRendered?.(input, ctx);
	}
}

export function runAfterRenderedHook(input: RenderedInput, ctx: PluginContext) {
	const sorted = topologicalSort(plugins);
	for (const plugin of sorted) {
		plugin.afterRendered?.(input, ctx);
	}
}
