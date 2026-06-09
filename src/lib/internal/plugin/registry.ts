import type { Plugin, PluginContext } from './types';
import type { StartingInput, ReadyInput, RenderedInput } from '../store';

export interface PluginManager {
	init(ctx: PluginContext): Promise<void>;
	runBeforeStarting(input: StartingInput, ctx: PluginContext): void;
	runAfterStarting(input: StartingInput, ctx: PluginContext): void;
	runBeforeReady(input: ReadyInput, ctx: PluginContext): void;
	runAfterReady(input: ReadyInput, ctx: PluginContext): void;
	runBeforeRendered(input: RenderedInput, ctx: PluginContext): void;
	runAfterRendered(input: RenderedInput, ctx: PluginContext): void;
	destroy(ctx: PluginContext): void;
}

export function createPluginManager(plugins: Plugin<unknown>[]): PluginManager {
	const sorted = topologicalSort(plugins);
	return {
		async init(ctx) {
			for (const plugin of sorted) {
				if (plugin.init) {
					await Promise.resolve(plugin.init(ctx));
				}
			}
		},
		runBeforeStarting(input, ctx) {
			for (const plugin of sorted) {
				plugin.beforeStarting?.(input, ctx);
			}
		},
		runAfterStarting(input, ctx) {
			for (const plugin of sorted) {
				plugin.afterStarting?.(input, ctx);
			}
		},
		runBeforeReady(input, ctx) {
			for (const plugin of sorted) {
				plugin.beforeReady?.(input, ctx);
			}
		},
		runAfterReady(input, ctx) {
			for (const plugin of sorted) {
				plugin.afterReady?.(input, ctx);
			}
		},
		runBeforeRendered(input, ctx) {
			for (const plugin of sorted) {
				plugin.beforeRendered?.(input, ctx);
			}
		},
		runAfterRendered(input, ctx) {
			for (const plugin of sorted) {
				plugin.afterRendered?.(input, ctx);
			}
		},
		destroy(ctx) {
			for (const plugin of sorted) {
				plugin.destroy?.(ctx);
			}
		}
	};
}

/**
 * Topologically sort plugins by their dependencies.
 */
function topologicalSort(plugins: Plugin<unknown>[]): Plugin<unknown>[] {
	const visited = new Set<string>();
	const temp = new Set<string>();
	const result: Plugin<unknown>[] = [];
	const map = new Map(plugins.map((p) => [p.name, p]));

	function visit(p: Plugin<unknown>) {
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
