import type { StartingInput, ReadyInput, RenderedInput } from './types';
import type { SearchType } from '$lib/types/search';

export interface PluginBase<T extends SearchType = SearchType> {
	type?: T | T[];
	init?(): void;
	beforeStarting?(input: StartingInput): void;
	afterStarting?(input: StartingInput): void;
	beforeReady?(input: ReadyInput<T>): void;
	afterReady?(input: ReadyInput<T>): void;
	beforeRendered?(input: RenderedInput): void;
	afterRendered?(input: RenderedInput): void;
	destroy?(): void;
}

export interface WebPlugin extends PluginBase<'web'> {
	type: 'web';
}

export interface ImagePlugin extends PluginBase<'image'> {
	type: 'image';
}

export const plugins = new Set<PluginBase>();

export function registerPlugins(newPlugins: PluginBase[]) {
	plugins.clear();
	for (const p of newPlugins) {
		plugins.add(p);
	}
}

function matchesType(plugin: PluginBase, type: SearchType): boolean {
	if (plugin.type === undefined) return true;
	if (Array.isArray(plugin.type)) return plugin.type.includes(type);
	return plugin.type === type;
}

export function initAll() {
	for (const p of plugins) {
		p.init?.();
	}
}

export function beforeStartingAll(input: StartingInput) {
	for (const p of plugins) {
		if (matchesType(p, input.type)) {
			p.beforeStarting?.(input);
		}
	}
}

export function afterStartingAll(input: StartingInput) {
	for (const p of plugins) {
		if (matchesType(p, input.type)) {
			p.afterStarting?.(input);
		}
	}
}

export function beforeReadyAll(input: ReadyInput) {
	for (const p of plugins) {
		if (matchesType(p, input.type)) {
			p.beforeReady?.(input);
		}
	}
}

export function afterReadyAll(input: ReadyInput) {
	for (const p of plugins) {
		if (matchesType(p, input.type)) {
			p.afterReady?.(input);
		}
	}
}

export function beforeRenderedAll(input: RenderedInput) {
	for (const p of plugins) {
		if (matchesType(p, input.type)) {
			p.beforeRendered?.(input);
		}
	}
}

export function afterRenderedAll(input: RenderedInput) {
	for (const p of plugins) {
		if (matchesType(p, input.type)) {
			p.afterRendered?.(input);
		}
	}
}

export function destroyAll() {
	for (const p of plugins) {
		p.destroy?.();
	}
	plugins.clear();
}
