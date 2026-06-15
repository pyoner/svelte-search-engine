import type { Component } from 'svelte';
import type { Gname } from './base';
import type { ImageResult, Promotion, SearchType, WebResult } from './search';

export type SearchEngineComponentProps<T extends SearchType = SearchType> = {
	gname: Gname;
	type: T;
	promos?: Promotion[];
	results: T extends 'web' ? WebResult[] : ImageResult[];
};

export type SearchEngineComponent<T extends SearchType = SearchType> = Component<
	SearchEngineComponentProps<T>
>;

export type UIComponents = {
	web?: SearchEngineComponent<'web'>;
	image?: SearchEngineComponent<'image'>;
};
