declare namespace google.search.cse {
	/**
	 * Defines optional attributes for configuration of search components.
	 */
	interface ComponentAttributes {
		/** The name of the Search Element object. */
		gname?: string;

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

	/**
	 * Defines the configuration for a Programmable Search Element component.
	 */
	interface ComponentConfig {
		/** The ID of the <div> or the div element in which the Programmable Search Element is to be rendered. */
		div: string | Element;

		/** The type of component(s) to be rendered. */
		tag: 'search' | 'searchbox' | 'searchbox-only' | 'searchresults-only';

		/** A unique name for this component. */
		gname?: string;

		/** Optional attributes for configuring the component. */
		attributes?: ComponentAttributes;
	}

	/**
	 * Defines the second optional component configuration argument in two-column mode.
	 */
	interface OptComponentConfig {
		/** The ID of the <div> or the div element in which the element is to be rendered. */
		div: string | Element;

		/** The type of component(s) to be rendered. */
		tag: 'searchresults';

		/** A unique name for this component, which should match the gname of componentConfig. */
		gname?: string;

		/** Optional attributes for configuring the component. */
		attributes?: ComponentAttributes;
	}

	/**
	 * Represents an element object with methods for manipulating it.
	 */
	interface ElementObject {
		/** The name of the element object. */
		gname: string;

		/** The type of element. */
		type: string;

		/** The final attributes used to render the element. */
		uiOptions: ComponentAttributes;

		/**
		 * Executes a programmatic query.
		 * @param query The query string to execute.
		 */
		execute(query: string): void;

		/**
		 * Prefills the searchbox with a query string without executing the query.
		 * @param query The query string to prefill.
		 */
		prefillQuery(query: string): void;

		/**
		 * Gets the current value displayed in the input box.
		 * @returns The current value in the search input box.
		 */
		getInputQuery(): string;

		/** Clears the control by hiding everything but the search box, if any. */
		clearAllResults(): void;
	}

	/**
	 * Represents a map of all successfully created element objects, keyed by gname.
	 */
	interface ElementMap {
		[gname: string]: ElementObject;
	}

	/**
	 * Namespace for managing search elements.
	 */
	namespace element {
		/**
		 * Renders a search element using the provided configurations.
		 * @param componentConfig The configuration for the main component.
		 * @param opt_componentConfig Optional configuration for the search results component in two-column mode.
		 */
		function render(
			componentConfig: ComponentConfig,
			opt_componentConfig?: OptComponentConfig
		): void;

		/**
		 * Renders all Search Element tags/classes in the specified container.
		 * @param opt_container The container containing the Search Element components to render. Specify either the ID of the container (string) or the element itself.
		 */
		function go(opt_container?: string | Element): void;

		/**
		 * Retrieves an element object by its gname.
		 * @param gname The unique name of the element.
		 * @returns The element object if found, otherwise null.
		 */
		function getElement(gname: string): ElementObject | null;

		/**
		 * Returns a map of all successfully created element objects, keyed by gname.
		 * @returns A map of all element objects.
		 */
		function getAllElements(): ElementMap;
	}
}

declare global {
	interface Window {
		google: typeof google;
	}
}

export {};
