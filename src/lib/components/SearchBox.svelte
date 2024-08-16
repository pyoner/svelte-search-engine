<script lang="ts">
	import { getContext } from 'svelte';

	import type { ComponentAttributes } from '$lib/types/google';

	import { gcseAction } from '$lib/internal/action';
	import { randomString } from '$lib/internal/helpers';
	import type { Context } from '$lib/internal/types';

	export let attributes: ComponentAttributes & { gname: string };
	let { gname } = attributes;

	export let only = false;
	const id = randomString();
	const param = {
		div: id,
		tag: only ? 'searchbox-only' : 'searchbox',
		gname,
		attributes
	} as const;

	if (!only) {
		const context = getContext<Context>('gcse');
		context[gname] = param;
	}
</script>

<div {id} use:gcseAction={param}></div>
