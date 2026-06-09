import type { Component } from 'svelte';
import type { Gname } from './base';
import type { Promotion, Result, SearchType } from './search';

export type SearchEngineComponentProps = {
	gname: Gname;
	type: SearchType;
	promos?: Promotion[];
	results: Result[];
};

export type SearchEngineComponent = Component<SearchEngineComponentProps>;

export type UIComponents = {
	web?: SearchEngineComponent;
	image?: SearchEngineComponent;
};
