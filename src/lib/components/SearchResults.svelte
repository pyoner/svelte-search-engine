<script lang="ts">
	import type { WithGname } from '$lib/internal/types';
	import type { ComponentAttributes } from '$lib/types/google';
	import type { UIComponents } from '$lib/types/components';

	import { searchEngine } from '$lib/internal/action';
	import { buildParams } from '$lib/internal/helpers';

	let {
		attributes,
		components = undefined,
		only = false
	}: {
		attributes: ComponentAttributes & WithGname;
		components?: UIComponents;
		only?: boolean;
	} = $props();

	let { id, param } = $derived(buildParams('searchresults', only, attributes, components));
</script>

<div {id} use:searchEngine={param}></div>
