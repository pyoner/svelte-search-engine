import { readonly } from 'svelte/store';
import * as internal from './internal/store';

export const init = readonly(internal.init);
export const starting = readonly(internal.starting);
export const ready = readonly(internal.ready);
export const rendered = readonly(internal.rendered);
