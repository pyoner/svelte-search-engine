import type { SearchEngineComponent } from '$lib/types/components';

export const destroyRegistry = new Map<Node, SearchEngineComponent>();

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
						component.$destroy();
					}
				});
			}
		});
	});
