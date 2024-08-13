import type { SearchType } from './store';

export const registry = new Set<string>();
export const key = (type: SearchType, gname: string) => `${type}:${gname}`;
