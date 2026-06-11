import type { StartingInput, ReadyInput, RenderedInput } from './types';

export interface PluginBase {
	init?(): void;
	beforeStarting?(input: StartingInput): void;
	afterStarting?(input: StartingInput): void;
	beforeReady?(input: ReadyInput): void;
	afterReady?(input: ReadyInput): void;
	beforeRendered?(input: RenderedInput): void;
	afterRendered?(input: RenderedInput): void;
	destroy?(): void;
}

export const plugins = new Set<PluginBase>();

export function registerPlugins(newPlugins: PluginBase[]) {
	plugins.clear();
	for (const p of newPlugins) {
		plugins.add(p);
	}
}

export function initAll() {
	for (const p of plugins) {
		p.init?.();
	}
}

export function beforeStartingAll(input: StartingInput) {
	for (const p of plugins) {
		p.beforeStarting?.(input);
	}
}

export function afterStartingAll(input: StartingInput) {
	for (const p of plugins) {
		p.afterStarting?.(input);
	}
}

export function beforeReadyAll(input: ReadyInput) {
	for (const p of plugins) {
		p.beforeReady?.(input);
	}
}

export function afterReadyAll(input: ReadyInput) {
	for (const p of plugins) {
		p.afterReady?.(input);
	}
}

export function beforeRenderedAll(input: RenderedInput) {
	for (const p of plugins) {
		p.beforeRendered?.(input);
	}
}

export function afterRenderedAll(input: RenderedInput) {
	for (const p of plugins) {
		p.afterRendered?.(input);
	}
}

export function destroyAll() {
	for (const p of plugins) {
		p.destroy?.();
	}
	plugins.clear();
}
