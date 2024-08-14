import { SvelteComponent } from 'svelte';
import type { Promotion, Result } from './search';

export class PromotionsComponent extends SvelteComponent<{
	items: Promotion[];
}> {}

export class ResultsComponent extends SvelteComponent<{
	items: Result[];
}> {}

export type CseComponents = {
	promos?: typeof PromotionsComponent;
	results?: typeof ResultsComponent;
};

export type UIComponents = {
	web?: CseComponents;
	image?: CseComponents;
};
