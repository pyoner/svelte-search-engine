import { SvelteComponent } from 'svelte';
import type { Promotion, Result } from './search';

export class CseComponent extends SvelteComponent<{
	promos: Promotion[];
	results: Result[];
}> {}

export type UIComponents = {
	web?: typeof CseComponent;
	image?: typeof CseComponent;
};
