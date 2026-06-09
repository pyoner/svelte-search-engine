import type { Gname } from '$lib/types/base';
import type { UIComponents } from '$lib/types/components';
import { searchType, type SearchType } from '$lib/types/search';

class Registry {
	#registry = new Set<string>();
	#createKey = (type: SearchType, gname: Gname) => `${type}:${gname}`;

	has(type: SearchType, gname: Gname) {
		return this.#registry.has(this.#createKey(type, gname));
	}

	add(type: SearchType, gname: Gname) {
		this.#registry.add(this.#createKey(type, gname));
		return this;
	}

	delete(type: SearchType, gname: Gname) {
		return this.#registry.delete(this.#createKey(type, gname));
	}
}

export const registry = new Registry();

export function registryComponents(gname: Gname, components: UIComponents) {
	searchType.forEach((k) => {
		const component = components[k];
		if (component) {
			registry.add(k, gname);
		}
	});

	return () => unRegistryComponents(gname, components);
}

export function unRegistryComponents(gname: Gname, components: UIComponents) {
	searchType.forEach((k) => {
		const component = components[k];
		if (component) {
			registry.delete(k, gname);
		}
	});
}
