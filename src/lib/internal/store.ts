import { writable } from 'svelte/store';

export type SearchType = 'web' | 'image';

export type StartingInput = {
	type: SearchType;
	gname: string;
	query: string;
};

export type ReadyInput = {
	type: SearchType;
	gname: string;
	query: string;
	promos: Promotion[];
	results: Result[];
	div: HTMLElement;
};

export type RenderedInput = {
	type: SearchType;
	gname: string;
	query: string;
	promos: Promotion[];
	results: Result[];
};

export const init = writable(false);
export const starting = writable<StartingInput | null>(null);
export const ready = writable<ReadyInput | null>(null);
export const rendered = writable<RenderedInput | null>(null);
