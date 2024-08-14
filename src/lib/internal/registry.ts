import type { UIComponents } from '$lib/types/components';
import { searchType, type SearchType } from './store';

class Registry {
	#registry = new Set<string>();
	#createKey = (type: SearchType, gname: string) => `${type}:${gname}`;

	has(type: SearchType, gname: string) {
		return this.#registry.has(this.#createKey(type, gname));
	}

	add(type: SearchType, gname: string) {
		this.#registry.add(this.#createKey(type, gname));
		return this;
	}

	delete(type: SearchType, gname: string) {
		return this.#registry.delete(this.#createKey(type, gname));
	}
}

export const registry = new Registry();

export function registryComponents(gname: string, components: UIComponents) {
	searchType.forEach((k) => {
		const component = components[k];
		if (component) {
			registry.add(k, gname);
		}
	});

	return () => unRegistryComponents(gname, components);
}

export function unRegistryComponents(gname: string, components: UIComponents) {
	searchType.forEach((k) => {
		const component = components[k];
		if (component) {
			registry.delete(k, gname);
		}
	});
}
