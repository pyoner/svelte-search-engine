import { Config } from '$lib/types/search';
import { CseElement } from '$lib/types/google';

declare global {
	interface Window {
		__gcse?: Config;
		google?: {
			search: {
				cse: {
					element: CseElement;
				};
			};
		};
	}
}

export {};
