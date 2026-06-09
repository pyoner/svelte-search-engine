import type { StartingInput, ReadyInput, RenderedInput } from '../callbacks';

export interface PluginContext {
	[key: string]: unknown;
}

export interface Plugin<TApi = Record<string, unknown>> {
	name: string;
	dependencies?: string[];

	init?: (ctx: PluginContext) => void | Promise<void>;
	beforeStarting?: (input: StartingInput, ctx: PluginContext) => void;
	afterStarting?: (input: StartingInput, ctx: PluginContext) => void;
	beforeReady?: (input: ReadyInput, ctx: PluginContext) => void;
	afterReady?: (input: ReadyInput, ctx: PluginContext) => void;
	beforeRendered?: (input: RenderedInput, ctx: PluginContext) => void;
	afterRendered?: (input: RenderedInput, ctx: PluginContext) => void;
	destroy?: (ctx: PluginContext) => void;
	api?: TApi;
}
