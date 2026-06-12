// export types
export type { ElementObject, ElementMap, CseElement, ComponentAttributes } from './types/google';
export type { Result, Promotion } from './types/search';
export type {
	SearchEngineComponentProps,
	SearchEngineComponent,
	UIComponents
} from './types/components';

// export components
export { default as Engine } from './components/Engine.svelte';
export { default as Search } from './components/Search.svelte';
export { default as SearchBox } from './components/SearchBox.svelte';
export { default as SearchResults } from './components/SearchResults.svelte';

// export stores
export {
	init as initStore,
	ready as readyStore,
	rendered as renderedStore,
	starting as startingStore
} from './stores';

// export search element api
export { searchElementApi } from './internal/api';

// export plugin system
export type { PluginBase } from './internal/plugin';
export { jsonInterceptorPlugin } from './plugins/json-interceptor';
export { thumbnailPlugin } from './plugins/thumbnail';
