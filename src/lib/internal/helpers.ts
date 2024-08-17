import { getContext } from 'svelte';

import type { Gname } from '$lib/types/base';
import type { Context } from '$lib/internal/types';
import type { UIComponents } from '$lib/types/components';
import type { ComponentAttributes } from '$lib/types/google';

import type { gcseAction } from '$lib/internal/action';

export function assert(condition: unknown, msg?: string): asserts condition {
	if (!condition) {
		throw new Error(msg);
	}
}

export const randomString = () => Math.random().toString(16).slice(2);

export function buildParams(
	baseTag: 'searchbox' | 'searchresults',
	only: boolean,
	gname: Gname,
	attributes: ComponentAttributes,
	components?: UIComponents
) {
	const id = randomString();
	const paramBase = { div: id, gname, attributes, components };

	let param: Parameters<typeof gcseAction>[1] = undefined;

	if (only) {
		param = { ...paramBase, tag: `${baseTag}-only` };
	} else {
		const context = getContext<Context>('gcse');
		const contextValue = context[gname];

		if (contextValue) {
			if (baseTag === 'searchbox') {
				assert(contextValue.tag === 'searchresults', 'Context value should be ParamOptConf');
				param = [{ ...paramBase, tag: baseTag }, contextValue];
			} else {
				assert(contextValue.tag === 'searchbox', 'Context value should be ParamConf');
				param = [contextValue, { ...paramBase, tag: baseTag }];
			}
			delete context[gname];
		} else {
			context[gname] = { ...paramBase, tag: baseTag };
		}
	}

	return { id, param };
}
