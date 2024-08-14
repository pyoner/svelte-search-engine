import { SvelteComponent } from 'svelte';

export class CseComponent extends SvelteComponent {}
export type UIComponents = {
	web?: typeof CseComponent;
	image?: typeof CseComponent;
};
