declare namespace google.search.cse {
	interface ComponentAttributes {
		gname?: string;
		autoSearchOnLoad?: boolean;
		enableHistory?: boolean;
		queryParameterName?: string;
		resultsUrl?: string;
		newWindow?: boolean;
		ivt?: boolean;
		mobileLayout?: 'enabled' | 'disabled' | 'forced';
		enableAutoComplete?: boolean;
		autoCompleteMaxCompletions?: number;
		autoCompleteMaxPromotions?: number;
		autoCompleteValidLanguages?: string;
		defaultToRefinement?: string;
		refinementStyle?: 'tab' | 'link';
		enableImageSearch?: boolean;
		defaultToImageSearch?: boolean;
		imageSearchLayout?: 'classic' | 'column' | 'popup';
		imageSearchResultSetSize?: number | string;
		image_as_filetype?: 'jpg' | 'gif' | 'png' | 'bmp' | 'svg' | 'webp' | 'ico' | 'raw';
		image_as_oq?: string;
		image_as_rights?:
			| 'cc_publicdomain'
			| 'cc_attribute'
			| 'cc_sharealike'
			| 'cc_noncommercial'
			| 'cc_nonderived';
		image_as_sitesearch?: string;
		image_colortype?: 'mono' | 'gray' | 'color';
		image_cr?: string;
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
		image_filter?: '0' | '1';
		image_gl?: string;
		image_size?: 'icon' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'huge';
		image_sort_by?: '' | 'date';
		image_type?: 'clipart' | 'face' | 'lineart' | 'stock' | 'photo' | 'animated';
		disableWebSearch?: boolean;
		webSearchQueryAddition?: string;
		webSearchResultSetSize?: number | string;
		webSearchSafesearch?: 'off' | 'active';
		as_filetype?: string;
		as_oq?: string;
		as_rights?:
			| 'cc_publicdomain'
			| 'cc_attribute'
			| 'cc_sharealike'
			| 'cc_noncommercial'
			| 'cc_nonderived';
		as_sitesearch?: string;
		cr?: string;
		filter?: '0' | '1';
		gl?: string;
		lr?: string;
		sort_by?: string;
		enableOrderBy?: boolean;
		linkTarget?: '_blank' | '_self' | '_parent' | '_top';
		noResultsString?: string;
		resultSetSize?: number | string;
		safeSearch?: 'off' | 'active';
	}

	interface ComponentConfig {
		div: string | Element;
		tag: 'search' | 'searchbox' | 'searchbox-only' | 'searchresults-only';
		gname?: string;
		attributes?: ComponentAttributes;
	}

	interface OptComponentConfig {
		div: string | Element;
		tag: 'searchresults';
		gname?: string;
		attributes?: ComponentAttributes;
	}

	interface ElementObject {
		gname: string;
		type: string;
		uiOptions: ComponentAttributes;
		execute(query: string): void;
		prefillQuery(query: string): void;
		getInputQuery(): string;
		clearAllResults(): void;
	}

	interface ElementMap {
		[gname: string]: ElementObject;
	}

	namespace element {
		function render(
			componentConfig: ComponentConfig,
			opt_componentConfig?: OptComponentConfig
		): void;
		function go(opt_container?: string | Element): void;
		function getElement(gname: string): ElementObject | null;
		function getAllElements(): ElementMap;
	}
}

declare global {
	interface Window {
		google: typeof google;
	}
}

export {};
