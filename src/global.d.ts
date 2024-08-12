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
	/**
	 * Image/Web Search-Starting Callback
	 *
	 * The search starting callbacks are invoked immediately before the Search Element
	 * JavaScript requests search results from its server. An example use-case would be
	 * using the local time of day to control changes to the query.
	 * @param gname - Search Element's identifying string
	 * @param query - Value entered by the user (possibly modified by search element JavaScript.)
	 * The callback returns the value that should be used as the query for this search.
	 * If it returns an empty string, the return value is ignored and the caller uses
	 * the unmodified query.
	 */
	starting?: (gname: string, query: string) => void | string;
	/**
	 * Results-Ready Callback
	 *
	 * These callbacks are invoked immediately before the Search Element JavaScript renders promotions and results.
	 * An example use case would be a callback that renders promotions and results in a style that cannot be specified with normal customization.
	 *
	 * @param gname - Search Element's identifying string
	 * @param query - Query that produced these results
	 * @param promos - An array of promotion objects, which correspond to matched promotions for the user’s query. See the promotion object definition.
	 * @param results - An array of result objects. See the result object definition.
	 * @param div - An HTML div positioned in the DOM where the Search Element would ordinarily place promotions and search results. Normally, the Search Element JavaScript would handle populating this div, but this callback may choose to stop the automatic rendering of results and use this div to render results itself.
	 *
	 * Note: The callback may freely modify the parameters' values. Changes to gname, query, promos, and results do not affect the behavior of the Search Element JavaScript, but if the callback returns true, the DOM tree rooted at div is displayed.
	 * If this callback returns a true value, the Search Element JavaScript skips to its page-footer work.
	 */
	ready?: (
		gname: string,
		query: string,
		promos: Promotion[],
		results: Result[],
		div: HTMLElement
	) => void | true;
	/**
	 * Image/Web Search Results-Rendered Callback
	 *
	 * These callbacks are invoked immediately before the Search Element JavaScript renders the page footer.
	 * Example use cases would include a callback that adds result content that the search element does not display
	 * such as a save this checkbox or information that is not automatically rendered, or a callback that adds
	 * for more information buttons.
	 *
	 * If a results rendered callback needs information that was in the promos and results parameters of the results
	 * ready callback, it can pass that between them, like this:
	 *
	 * callback(gname, query, promos, results);
	 *
	 * @param gname - Search Element's identifying string
	 * @param query - Search string.
	 * @param promos - An array of the DOM elements containing promotions.
	 * @param results - An array of the DOM elements containing results.
	 *
	 * Note: Changing the value of gname and query don't alter the behavior of the Search Element JavaScript,
	 * but changes to the entries in promoElts and resultElts are changes to the DOM.
	 * Note: Only those DOM elements rendered by the Search Element JavaScript itself are passed to the resultsRendered callback.
	 */
	rendered?: (gname: string, query: string, promos: Promotion[], results: Result[]) => void;
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
