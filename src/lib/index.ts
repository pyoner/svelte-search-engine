/**
 * @deprecated Use subpath imports instead:
 * - `svelte-search-engine/components`
 * - `svelte-search-engine/types`
 * - `svelte-search-engine/plugins`
 * - `svelte-search-engine/stores`
 * - `svelte-search-engine/api`
 */

// export components
export * from './components';

// export plugin system
export * from './plugins';

// export stores with legacy suffix naming
export {
	init as initStore,
	ready as readyStore,
	rendered as renderedStore,
	starting as startingStore
} from './stores';

// export search element api
export { searchElementApi } from './api';

// export remaining types that do not clash with component names
export type { BaseResult, Promotion, Result } from './types';
