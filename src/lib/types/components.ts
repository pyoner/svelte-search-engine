import { SvelteComponent } from 'svelte';
import type { Promotion, Result } from './search';

export class SearchEngineComponent extends SvelteComponent<{
	promos: Promotion[] | undefined;
	results: Result[];
}> {}

export type UIComponents = {
	web?: typeof SearchEngineComponent;
	image?: typeof SearchEngineComponent;
};
