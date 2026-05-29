<script lang="ts">
	import type { WithGname } from '$lib/internal/types';
	import type { ComponentAttributes } from '$lib/types/google';

	import { searchEngine } from '$lib/internal/action';
	import { buildParams } from '$lib/internal/helpers';

	let {
		attributes,
		only = false
	}: {
		attributes: ComponentAttributes & WithGname;
		only?: boolean;
	} = $props();

	let { id, param } = $derived(buildParams('searchbox', only, attributes));
</script>

<div {id} use:searchEngine={param}></div>
