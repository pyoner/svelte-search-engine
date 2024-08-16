<script lang="ts">
	import type { ComponentAttributes } from '$lib/types/google';
	import { gcseAction } from '$lib/internal/action';
	import { getContext } from 'svelte';

	export let attributes: ComponentAttributes & { gname: string };
	let { gname } = attributes;

	export let only = false;

	if (!only) {
		const context = getContext('gcse');
		if (context) {
			// context[gname] = true;
		}
	}
</script>

<div
	use:gcseAction={{
		tag: only ? 'searchbox-only' : 'searchbox',
		gname,
		attributes
	}}
></div>
