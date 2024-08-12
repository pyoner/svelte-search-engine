import { Config } from '$lib/types';

declare global {
	interface Window {
		__gcse?: Config;
	}
}

export {};
