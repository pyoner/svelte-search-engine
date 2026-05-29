import type { Component } from 'svelte';
import type { Promotion, Result } from './search';

export type SearchEngineComponent = Component<{
	promos?: Promotion[];
	results: Result[];
}>;

export type UIComponents = {
	web?: SearchEngineComponent;
	image?: SearchEngineComponent;
};
