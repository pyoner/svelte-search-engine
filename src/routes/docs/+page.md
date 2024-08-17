# Search Component

The `Search` component is a Svelte wrapper for the Programmable Search Element, allowing you to embed customizable search functionality into your application. Below are the detailed descriptions of the available props for configuration.

## Props

### `attributes`

The `attributes` prop is an object containing various configuration options for the search component. This prop is essential for customizing the behavior and appearance of the search element.

**Type**: `ComponentAttributes & WithGname`

#### `attributes.gname`
- **Type**: `Gname` (string)
- **Description**: A unique name for the Search Element object.

#### `attributes.autoSearchOnLoad`
- **Type**: `boolean`
- **Description**: Whether to execute a search by the query embedded in the URL of the page that's loading.

#### `attributes.enableHistory`
- **Type**: `boolean`
- **Description**: Enables history management for the browser Back and Forward buttons.

#### `attributes.queryParameterName`
- **Type**: `string`
- **Description**: The query parameter name embedded in the URL.

#### `attributes.resultsUrl`
- **Type**: `string`
- **Description**: The URL of the results page.

#### `attributes.newWindow`
- **Type**: `boolean`
- **Description**: Whether the results page opens in a new window.

#### `attributes.ivt`
- **Type**: `boolean`
- **Description**: Allows invalid traffic-only cookies and local storage based on consent status.

#### `attributes.mobileLayout`
- **Type**: `'enabled' | 'disabled' | 'forced'`
- **Description**: Specifies whether the mobile layout styles should be used for mobile devices.

#### `attributes.enableAutoComplete`
- **Type**: `boolean`
- **Description**: Enables autocomplete if configured in the control panel.

#### `attributes.autoCompleteMaxCompletions`
- **Type**: `number`
- **Description**: The maximum number of autocompletions to display.

#### `attributes.autoCompleteMaxPromotions`
- **Type**: `number`
- **Description**: The maximum number of promotions to display in autocomplete.

#### `attributes.autoCompleteValidLanguages`
- **Type**: `string`
- **Description**: Comma-separated list of languages for which autocomplete should be enabled.

#### `attributes.defaultToRefinement`
- **Type**: `string`
- **Description**: Specifies the default refinement label to display.

#### `attributes.refinementStyle`
- **Type**: `'tab' | 'link'`
- **Description**: Specifies the style of refinements, either tab or link.

#### `attributes.enableImageSearch`
- **Type**: `boolean`
- **Description**: Enables image search if configured in the control panel.

#### `attributes.defaultToImageSearch`
- **Type**: `boolean`
- **Description**: Specifies if the search results page will display image search results by default.

#### `attributes.imageSearchLayout`
- **Type**: `'classic' | 'column' | 'popup'`
- **Description**: Specifies the layout of the image search results page.

#### `attributes.imageSearchResultSetSize`
- **Type**: `number | string`
- **Description**: Specifies the maximum size of the search results set for image search.

#### `attributes.image_as_filetype`
- **Type**: `'jpg' | 'gif' | 'png' | 'bmp' | 'svg' | 'webp' | 'ico' | 'raw'`
- **Description**: Restricts results to files of a specified extension.

#### `attributes.image_as_oq`
- **Type**: `string`
- **Description**: Filters search results using Logical OR.

#### `attributes.image_as_rights`
- **Type**: `'cc_publicdomain' | 'cc_attribute' | 'cc_sharealike' | 'cc_noncommercial' | 'cc_nonderived'`
- **Description**: Filters based on licensing.

#### `attributes.image_as_sitesearch`
- **Type**: `string`
- **Description**: Restrict results to pages from a specific site.

#### `attributes.image_colortype`
- **Type**: `'mono' | 'gray' | 'color'`
- **Description**: Restricts search to black and white, grayscale, or color images.

#### `attributes.image_cr`
- **Type**: `string`
- **Description**: Restricts search results to documents originating in a particular country.

#### `attributes.image_dominantcolor`
- **Type**: `'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'purple' | 'pink' | 'white' | 'gray' | 'black' | 'brown'`
- **Description**: Restricts search to images of a specific dominant color.

#### `attributes.image_filter`
- **Type**: `'0' | '1'`
- **Description**: Enables or disables automatic filtering of search results.

#### `attributes.image_gl`
- **Type**: `string`
- **Description**: Boosts search results whose country of origin matches the parameter value.

#### `attributes.image_size`
- **Type**: `'icon' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'huge'`
- **Description**: Specifies the size of images returned in search results.

#### `attributes.image_sort_by`
- **Type**: `'' | 'date'`
- **Description**: Sorts results using either date or other structured content.

#### `attributes.image_type`
- **Type**: `'clipart' | 'face' | 'lineart' | 'stock' | 'photo' | 'animated'`
- **Description**: Restricts search to images of a specific type.

#### `attributes.disableWebSearch`
- **Type**: `boolean`
- **Description**: Disables web search if true.

#### `attributes.webSearchQueryAddition`
- **Type**: `string`
- **Description**: Extra terms added to search query using logical OR.

#### `attributes.webSearchResultSetSize`
- **Type**: `number | string`
- **Description**: The maximum size of the web search results set.

#### `attributes.webSearchSafesearch`
- **Type**: `'off' | 'active'`
- **Description**: Specifies if SafeSearch is enabled for web search results.

#### `attributes.as_filetype`
- **Type**: `string`
- **Description**: Restricts results to files of a specified extension.

#### `attributes.as_oq`
- **Type**: `string`
- **Description**: Filters search results using Logical OR.

#### `attributes.as_rights`
- **Type**: `'cc_publicdomain' | 'cc_attribute' | 'cc_sharealike' | 'cc_noncommercial' | 'cc_nonderived'`
- **Description**: Filters based on licensing.

#### `attributes.as_sitesearch`
- **Type**: `string`
- **Description**: Restrict results to pages from a specific site.

#### `attributes.cr`
- **Type**: `string`
- **Description**: Restricts search results to documents originating in a particular country.

#### `attributes.filter`
- **Type**: `'0' | '1'`
- **Description**: Enables or disables automatic filtering of search results.

#### `attributes.gl`
- **Type**: `string`
- **Description**: Boosts search results whose country of origin matches the parameter value.

#### `attributes.lr`
- **Type**: `string`
- **Description**: Restricts search results to documents written in a particular language.

#### `attributes.sort_by`
- **Type**: `string`
- **Description**: Sort results using either date or other structured content.

#### `attributes.enableOrderBy`
- **Type**: `boolean`
- **Description**: Enables the sorting of results by relevance, date, or label.

#### `attributes.linkTarget`
- **Type**: `'_blank' | '_self' | '_parent' | '_top'`
- **Description**: Sets the link target. Default is `_blank`.

#### `attributes.noResultsString`
- **Type**: `string`
- **Description**: Specifies the default text to display when no results match the query.

#### `attributes.resultSetSize`
- **Type**: `number | string`
- **Description**: The maximum size of the results set.

#### `attributes.safeSearch`
- **Type**: `'off' | 'active'`
- **Description**: Specifies if SafeSearch is enabled for both web and image search.

### `components`

The `components` prop is an optional configuration for customizing the search components.

**Type**: `UIComponents | undefined`

#### `components.web`

- **Type**: `typeof CseComponent`
- **Description**: Custom Svelte component for rendering web search results.

#### `components.image`

- **Type**: `typeof CseComponent`
- **Description**: Custom Svelte component for rendering image search results.

## Usage Example

```svelte
<script lang="ts">
	import Search from '$lib/components/Search.svelte';

	const searchAttributes = {
		gname: 'mySearch',
		autoSearchOnLoad: true,
		enableHistory: true,
		queryParameterName: 'q',
		resultsUrl: '/search-results',
		newWindow: false,
	};

	const customComponents = {
		web: MyCustomWebComponent,
		image: MyCustomImageComponent,
	};
</script>

<Search {attributes} {components} />
