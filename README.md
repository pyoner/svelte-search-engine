# Svelte Search Engine

A customizable search engine component library for Svelte applications, powered by Google's Programmable Search Engine.

## Features

- Easy integration with Google's Custom Search Engine
- Customizable search components (Search, SearchBox, SearchResults)
- Support for both web and image search
- TypeScript support
- Reactive stores for search state management
- Customizable UI components for search results

## Installation

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
	gname?: Gname;
	/** Whether to execute a search by the query embedded in the URL of the page that's loading. */
	autoSearchOnLoad?: boolean;
	autoSearchOnLoad?: boolean;
	/** Enables history management for the browser Back and Forward buttons. */
	enableHistory?: boolean;
	enableHistory?: boolean;
	/** The query parameter name embedded in the URL. */
	queryParameterName?: string;
	queryParameterName?: string;
	/** The URL of the results page. */
	resultsUrl?: string;
	resultsUrl?: string;
	/** Whether the results page opens in a new window. */
	newWindow?: boolean;
	newWindow?: boolean;
	/** Allows invalid traffic-only cookies and local storage based on consent status. */
	ivt?: boolean;
	ivt?: boolean;
	/** Specifies whether the mobile layout styles should be used for mobile devices. */
	mobileLayout?: 'enabled' | 'disabled' | 'forced';
	mobileLayout?: 'enabled' | 'disabled' | 'forced';
	/** Enables autocomplete if configured in the control panel. */
	enableAutoComplete?: boolean;
	enableAutoComplete?: boolean;
	/** The maximum number of autocompletions to display. */
	autoCompleteMaxCompletions?: number;
	autoCompleteMaxCompletions?: number;
	/** The maximum number of promotions to display in autocomplete. */
	autoCompleteMaxPromotions?: number
	autoCompleteMaxPromotions?: number
	/** Comma-separated list of languages for which autocomplete should be enabled. */
	autoCompleteValidLanguages?: string;
 * Defines optional attributes for configuration of search components.
	/** Specifies the default refinement label to display. */
	defaultToRefinement?: string;
	...
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
	image_as_rights?:
	/** Restrict results to pages from a specific site. */
	image_as_sitesearch?: string
		| 'cc_sharealike'
		| 'cc_noncommercial'
		| 'cc_nonderived';
 * Defines optional attributes for configuration of search components.
	/** Restrict results to pages from a specific site. */
	image_as_sitesearch?: string
	...
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
		| 'purple'
	/** Enables or disables automatic filtering of search results. */
	image_filter?: '0' | '1';
		| 'gray'
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
	webSearchResultSetSize?: number | string

	/** Extra terms added to search query using logical OR. */
	webSearchQueryAddition?: string;
 * Defines optional attributes for configuration of search components.
	/** The maximum size of the web search results set. */
	webSearchResultSetSize?: number | string
	...
	/** Filters search results using Logical OR. */
	as_oq?: string;

	/** Filters based on licensing. */
	as_rights?:
		| 'cc_publicdomain'
		| 'cc_attribute'
		| 'cc_sharealike'
		| 'cc_noncommercial'
		| 'cc_nonderived';
	as_rights?:
	/** Restrict results to pages from a specific site. */
	as_sitesearch?: string;
		| 'cc_sharealike'
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
	noResultsString?: string

	/** Sets the link target. Default: _blank */
	linkTarget?: '_blank' | '_self' | '_parent' | '_top';
 * Defines optional attributes for configuration of search components.
	/** Specifies the default text to display when no results match the query. */
	noResultsString?: string
```


## Stores

The library provides reactive stores for managing search state:

```typescript
import { init, starting, ready, rendered } from 'svelte-search-engine';

init.subscribe(value => console.log('Initialization state:', value));
starting.subscribe(value => console.log('Search starting:', value));
ready.subscribe(value => console.log('Search results ready:', value));
rendered.subscribe(value => console.log('Search results rendered:', value));
```

## Custom Results Component

You can create a custom results component to display search results:

```svelte
<script lang="ts">
  import type { Promotion, Result } from 'svelte-search-engine';

  export let promos: Promotion[] | undefined;
  export let results: Result[];
</script>

<!-- Your custom results layout here -->
```

Then use it in the `Search` or `SearchResults` component:

```svelte
<Search
  attributes={{ gname: 'web' }}
  components={{ web: YourCustomResultsComponent }}
/>
```

## License

MIT


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
