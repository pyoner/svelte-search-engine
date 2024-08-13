import { init } from '$lib/internal/store';
import type { CseElement } from '$lib/types/google';

export const api = () =>
	new Promise<CseElement>((resolve, reject) => {
		const unsubscribe = init.subscribe((flag) => {
			if (flag) {
				try {
					// @ts-expect-error 'google' property can be undefined
					resolve(window.google.search.cse.element);
				} catch (e) {
					reject(e);
				} finally {
					unsubscribe();
				}
			}
		});
	});
