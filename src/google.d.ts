declare namespace google.search.cse {
	interface ComponentAttributes {
		[key: string]: string;
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
