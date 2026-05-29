import { unmount } from 'svelte';

export const destroyRegistry = new Map<Node, Record<PropertyKey, unknown>>();

export const createDestroyObserver = () =>
	new MutationObserver((mutationsList) => {
		if (!destroyRegistry.size) {
			return;
		}
		mutationsList.forEach((mutation) => {
			if (mutation.type === 'childList') {
				mutation.removedNodes.forEach((node) => {
					const component = destroyRegistry.get(node);
					if (component) {
						destroyRegistry.delete(node);
						void unmount(component);
					}
				});
			}
		});
	});
