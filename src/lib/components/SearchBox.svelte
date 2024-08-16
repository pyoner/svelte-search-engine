<script lang="ts">
	import { getContext } from 'svelte';

	import type { Gname } from '$lib/types/base';
	import type { Context } from '$lib/internal/types';
	import type { ComponentAttributes } from '$lib/types/google';

	import { gcseAction } from '$lib/internal/action';
	import { randomString } from '$lib/internal/helpers';

	export let attributes: ComponentAttributes & { gname: Gname };
	let { gname } = attributes;

	export let only = false;
	const id = randomString();
	const paramBase = { div: id, gname, attributes };

	let param: Parameters<typeof gcseAction>[1] = undefined;

	if (only) {
		param = { ...paramBase, tag: 'searchbox-only' };
	} else {
		const context = getContext<Context>('gcse');
		const contextValue = context[gname];
		if (contextValue) {
			param = [{ ...paramBase, tag: 'searchbox' }, contextValue];
		} else {
			context[gname] = { ...paramBase, tag: 'searchbox' };
		}
	}
</script>

<div {id} use:gcseAction={param}></div>
