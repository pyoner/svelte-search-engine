import { init } from '$lib/internal/store';

export const api = () =>
	new Promise<typeof window.google.search.cse.element>((resolve, reject) => {
		const unsubscribe = init.subscribe((flag) => {
			if (flag) {
				try {
					resolve(window.google.search.cse.element);
				} catch (e) {
					reject(e);
				} finally {
					unsubscribe();
				}
			}
		});
	});
