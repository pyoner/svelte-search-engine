// export types
export type { ElementObject, ElementMap, CseElement, ComponentAttributes } from './types/google';
export type {
	BaseResult,
	ImageResult as ImageResultType,
	Result,
	WebResult as WebResultType,
	Promotion
} from './types/search';
export type {
	SearchEngineComponentProps,
	SearchEngineComponent,
	UIComponents
} from './types/components';

// export components
export { default as Engine } from './components/Engine.svelte';
export { default as ImageResult } from './components/ImageResult.svelte';
export { default as Results } from './components/Results.svelte';
export { default as Search } from './components/Search.svelte';
export { default as SearchBox } from './components/SearchBox.svelte';
export { default as SearchResults } from './components/SearchResults.svelte';
export { default as WebResult } from './components/WebResult.svelte';

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
export type { ImagePlugin, PluginBase, WebPlugin } from './internal/plugin';
export { jsonInterceptorPlugin } from './plugins/json-interceptor';
export { thumbnailPlugin } from './plugins/thumbnail';
export type { WithThumbs } from './plugins/thumbnail';
