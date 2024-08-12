type Promotion = {
	content: string;
	image: {
		height: number;
		url: string;
		width: number;
	};
	title: string;
	url: string;
	visibleUrl: string;
};

type Result = {
	content: string;
	contentNoFormatting: string;
	contextUrl?: string; // Optional, for image search results only
	fileFormat: string;
	image?: {
		// Optional, for image search results only
		height: number;
		url: string;
		width: number;
	};
	perResultLabels: Array<{
		anchor: string;
		label: string;
		labelWithOp: string;
	}>;
	richSnippet: Array<Record<string, unknown>>; // For web search results only
	thumbnailImage: {
		height: number;
		url: string;
		width: number;
	};
	title: string;
	titleNoFormatting: string;
	url: string;
	visibleUrl: string;
};

type SearchCallback = {
	starting?: (gname: string, query: string) => void;
	ready?: (
		gname: string,
		query: string,
		promos: Promotion[],
		results: Result[],
		div: HTMLElement
	) => void;
	rendered?: () => void;
};

type Config = {
	parsetags?: 'explicit' | 'onload';
	initializationCallback?: () => void;
	searchCallbacks?: {
		image?: SearchCallback;
		web?: SearchCallback;
	};
};

declare global {
	interface Window {
		__gcse?: Config;
	}
}
