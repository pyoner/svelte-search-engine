import type { SearchType } from './store';

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
