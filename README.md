# Svelte Search Engine

A customizable search engine component library for Svelte applications, powered by Google's Programmable Search Engine.

## Features

- Easy integration with Google's Custom Search Engine
- Customizable search components (Search, SearchBox, SearchResults)
- Support for both web and image search
- TypeScript support
- Reactive stores for search state management
- Customizable UI components for search results
- Extensible plugin system with lifecycle hooks

## Installation

Requires **Svelte 5** or later.

```bash
npm install svelte-search-engine
```

## Usage

1. Set up a Google Programmable Search Engine and obtain your CX ID.

2. Add your CX ID to your environment variables:

```env
PUBLIC_CSE_CX=your_cx_id_here
```

3. Import and use the components in your Svelte app:

```svelte
<script>
  import { Engine, Search } from 'svelte-search-engine';
  import { PUBLIC_CSE_CX } from '$env/static/public';
</script>

<Engine cx={PUBLIC_CSE_CX}>
  <Search
    attributes={{
      gname: 'web',
      enableImageSearch: false
    }}
  />
</Engine>
```

## Components

### Engine

The `Engine` component initializes the Google Custom Search Engine script and provides the context for other search components.

```svelte
<Engine cx={YOUR_CX_ID}>
  <!-- Other search components go here -->
</Engine>
```

### Search

The `Search` component renders a complete search interface, including the search box and results.

```svelte
<Search
  attributes={{
    gname: 'web',
    enableImageSearch: false
  }}
  components={{ web: CustomResultsComponent }}
/>
```

### SearchBox

The `SearchBox` component renders only the search input field.

```svelte
<SearchBox
  attributes={{
    gname: 'mySearchBox'
  }}
/>
```

### SearchResults

The `SearchResults` component renders only the search results.

```svelte
<SearchResults
  attributes={{
    gname: 'mySearchResults'
  }}
  components={{ web: CustomResultsComponent }}
/>
```

## Customization

You can customize the appearance and behavior of the search components by passing `attributes` and `components` props.
For a full list of available attributes, refer to the `ComponentAttributes` interface in the source code:

```typescript
export interface ComponentAttributes {
	/** The name of the Search Element object. */
	gname?: Gname;

	/** Whether to execute a search by the query embedded in the URL of the page that's loading. */
	autoSearchOnLoad?: boolean;

	/** Enables history management for the browser Back and Forward buttons. */
	enableHistory?: boolean;

	/** The query parameter name embedded in the URL. */
	queryParameterName?: string;

	/** The URL of the results page. */
	resultsUrl?: string;

	/** Whether the results page opens in a new window. */
	newWindow?: boolean;

	/** Allows invalid traffic-only cookies and local storage based on consent status. */
	ivt?: boolean;

	/** Specifies whether the mobile layout styles should be used for mobile devices. */
	mobileLayout?: 'enabled' | 'disabled' | 'forced';

	/** Enables autocomplete if configured in the control panel. */
	enableAutoComplete?: boolean;

	/** The maximum number of autocompletions to display. */
	autoCompleteMaxCompletions?: number;

	/** The maximum number of promotions to display in autocomplete. */
	autoCompleteMaxPromotions?: number;

	/** Comma-separated list of languages for which autocomplete should be enabled. */
	autoCompleteValidLanguages?: string;

	/** Specifies the default refinement label to display. */
	defaultToRefinement?: string;

	/** Specifies the style of refinements, either tab or link. */
	refinementStyle?: 'tab' | 'link';

	/** Enables image search if configured in the control panel. */
	enableImageSearch?: boolean;

	/** Specifies if the search results page will display image search results by default. */
	defaultToImageSearch?: boolean;

	/** Specifies the layout of the image search results page. */
	imageSearchLayout?: 'classic' | 'column' | 'popup';

	/** Specifies the maximum size of the search results set for image search. */
	imageSearchResultSetSize?: number | string;

	/** Restricts results to files of a specified extension. */
	image_as_filetype?: 'jpg' | 'gif' | 'png' | 'bmp' | 'svg' | 'webp' | 'ico' | 'raw';

	/** Filters search results using Logical OR. */
	image_as_oq?: string;

	/** Filters based on licensing. */
	image_as_rights?:
		| 'cc_publicdomain'
		| 'cc_attribute'
		| 'cc_sharealike'
		| 'cc_noncommercial'
		| 'cc_nonderived';

	/** Restrict results to pages from a specific site. */
	image_as_sitesearch?: string;

	/** Restricts search to black and white, grayscale, or color images. */
	image_colortype?: 'mono' | 'gray' | 'color';

	/** Restricts search results to documents originating in a particular country. */
	image_cr?: string;

	/** Restricts search to images of a specific dominant color. */
	image_dominantcolor?:
		| 'red'
		| 'orange'
		| 'yellow'
		| 'green'
		| 'teal'
		| 'blue'
		| 'purple'
		| 'pink'
		| 'white'
		| 'gray'
		| 'black'
		| 'brown';

	/** Enables or disables automatic filtering of search results. */
	image_filter?: '0' | '1';

	/** Boosts search results whose country of origin matches the parameter value. */
	image_gl?: string;

	/** Specifies the size of images returned in search results. */
	image_size?: 'icon' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'huge';

	/** Sorts results using either date or other structured content. */
	image_sort_by?: '' | 'date';

	/** Restricts search to images of a specific type. */
	image_type?: 'clipart' | 'face' | 'lineart' | 'stock' | 'photo' | 'animated';

	/** Disables web search if true. */
	disableWebSearch?: boolean;

	/** Extra terms added to search query using logical OR. */
	webSearchQueryAddition?: string;

	/** The maximum size of the web search results set. */
	webSearchResultSetSize?: number | string;

	/** Specifies if SafeSearch is enabled for web search results. */
	webSearchSafesearch?: 'off' | 'active';

	/** Restricts results to files of a specified extension. */
	as_filetype?: string;

	/** Filters search results using Logical OR. */
	as_oq?: string;

	/** Filters based on licensing. */
	as_rights?:
		| 'cc_publicdomain'
		| 'cc_attribute'
		| 'cc_sharealike'
		| 'cc_noncommercial'
		| 'cc_nonderived';

	/** Restrict results to pages from a specific site. */
	as_sitesearch?: string;

	/** Restricts search results to documents originating in a particular country. */
	cr?: string;

	/** Enables or disables automatic filtering of search results. */
	filter?: '0' | '1';

	/** Boosts search results whose country of origin matches the parameter value. */
	gl?: string;

	/** Restricts search results to documents written in a particular language. */
	lr?: string;

	/** Sort results using either date or other structured content. */
	sort_by?: string;

	/** Enables the sorting of results by relevance, date, or label. */
	enableOrderBy?: boolean;

	/** Sets the link target. Default: _blank */
	linkTarget?: '_blank' | '_self' | '_parent' | '_top';

	/** Specifies the default text to display when no results match the query. */
	noResultsString?: string;

	/** The maximum size of the results set. */
	resultSetSize?: number | string;

	/** Specifies if SafeSearch is enabled for both web and image search. */
	safeSearch?: 'off' | 'active';
}
```

## Stores

The library provides reactive stores for managing search state:

```typescript
import { init, starting, ready, rendered } from 'svelte-search-engine';

init.subscribe((value) => console.log('Initialization state:', value));
starting.subscribe((value) => console.log('Search starting:', value));
ready.subscribe((value) => console.log('Search results ready:', value));
rendered.subscribe((value) => console.log('Search results rendered:', value));
```

## Custom Results Component

You can create a custom results component to display search results. Use the `SearchEngineComponentProps` type for full TypeScript support:

```svelte
<script lang="ts">
  import type { SearchEngineComponentProps } from 'svelte-search-engine';

  let { gname, type, promos, results }: SearchEngineComponentProps = $props();
</script>

<!-- Your custom results layout here -->
```

The `SearchEngineComponentProps` type includes:

| Prop      | Type          | Description                   |
| --------- | ------------- | ----------------------------- |
| `gname`   | `Gname`       | The search element identifier |
| `type`    | `SearchType`  | `'web'` or `'image'`          |
| `promos`  | `Promotion[]` | Optional promotional results  |
| `results` | `Result[]`    | Search results                |

### Conditional Rendering by Search Type

Your custom component can render different layouts for web and image search:

```svelte
<script lang="ts">
  import type { SearchEngineComponentProps } from 'svelte-search-engine';

  let { type, results }: SearchEngineComponentProps = $props();
</script>

{#if type === 'image'}
  <!-- Image search results layout -->
  <div class="image-grid">
    {#each results as result}
      <img src={result.image?.url} alt={result.title} />
    {/each}
  </div>
{:else}
  <!-- Web search results layout -->
  <ul>
    {#each results as result}
      <li>
        <a href={result.url}>{result.title}</a>
        <p>{result.content}</p>
      </li>
    {/each}
  </ul>
{/if}
```

Then use it in the `Search` or `SearchResults` component:

```svelte
<Search
  attributes={{ gname: 'web' }}
  components={{ web: YourCustomResultsComponent, image: YourCustomResultsComponent }}
/>
```

## Plugin System

The library supports an extensible plugin architecture with lifecycle hooks that let you intercept and transform search data without mutating the core `Result` type.

### Built-in Plugins

Two plugins are included for extracting large thumbnails from image search results:

```typescript
import { usePlugin, jsonInterceptorPlugin, thumbnailPlugin } from 'svelte-search-engine';

// Register before mounting Engine
usePlugin(jsonInterceptorPlugin);
usePlugin(thumbnailPlugin);
```

`jsonInterceptorPlugin` intercepts the raw CSE JSONP response and stores `tbLargeUrl` / `tbMedUrl` data. `thumbnailPlugin` (which depends on `jsonInterceptorPlugin`) exposes an API to retrieve large/medium thumbnails:

```svelte
<script lang="ts">
  import { usePlugin, thumbnailPlugin } from 'svelte-search-engine';
  import type { SearchEngineComponentProps } from 'svelte-search-engine';

  const thumb = usePlugin(thumbnailPlugin);

  let { type, results }: SearchEngineComponentProps = $props();
</script>

{#each results as result}
  {@const large = thumb?.getLarge(result)}
  {#if large}
    <img src={large.url} alt={result.title} />
  {/if}
{/each}
```

### Writing a Custom Plugin

A plugin implements the `Plugin` interface with optional lifecycle hooks:

```typescript
import type { Plugin } from 'svelte-search-engine';

export const myPlugin: Plugin<{ log: () => void }> = {
	name: 'my-plugin',
	dependencies: ['json-interceptor'], // optional
	init(ctx) {
		// Runs once after CSE script loads
		ctx.myPluginState = {};
	},
	beforeStarting(input, ctx) {
		// Runs before each search starts
	},
	beforeReady(input, ctx) {
		// Runs when results are ready, before they are passed to components
	},
	afterReady(input, ctx) {
		// Runs after results are passed to stores
	},
	destroy(ctx) {
		// Cleanup when plugin is unregistered
		delete ctx.myPluginState;
	},
	api: {
		log() {
			console.log('Hello from my plugin');
		}
	}
};
```

Register it:

```typescript
import { usePlugin } from 'svelte-search-engine';

usePlugin(myPlugin);
```

### Lifecycle Hooks

| Hook             | When It Fires                                |
| ---------------- | -------------------------------------------- |
| `init`           | After CSE script loads                       |
| `beforeStarting` | Before each search request                   |
| `afterStarting`  | After search request is sent                 |
| `beforeReady`    | When results are ready, before stores update |
| `afterReady`     | After stores update                          |
| `beforeRendered` | Before rendered callback                     |
| `afterRendered`  | After rendered callback                      |
| `destroy`        | When plugin is unregistered                  |

Plugins are executed in dependency order (topological sort). A plugin can declare `dependencies` to ensure it runs after other plugins.

## Exported Types

The library exports the following TypeScript types for building custom components and plugins:

```typescript
import type {
	SearchEngineComponentProps,
	SearchEngineComponent,
	UIComponents,
	Gname,
	SearchType,
	Promotion,
	Result,
	ComponentAttributes,
	Plugin
} from 'svelte-search-engine';
```

| Type                         | Description                                           |
| ---------------------------- | ----------------------------------------------------- |
| `SearchEngineComponentProps` | Props type for custom result components               |
| `SearchEngineComponent`      | Svelte `Component` type for result renderers          |
| `UIComponents`               | Map of custom components for `web` and `image` search |
| `Gname`                      | Search element identifier type (aliased `string`)     |
| `SearchType`                 | Union type: `'web' \| 'image'`                        |
| `Promotion`                  | Promotion result object type                          |
| `Result`                     | Search result object type                             |
| `ComponentAttributes`        | Google CSE component configuration attributes         |
| `Plugin`                     | Plugin interface for extending the library            |

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
