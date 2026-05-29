<script lang="ts">
	import type { WithGname } from '$lib/internal/types';
	import type { UIComponents } from '$lib/types/components';
	import type { ComponentAttributes } from '$lib/types/google';

	import { searchEngine } from '$lib/internal/action';

	let {
		attributes,
		components = undefined
	}: {
		attributes: ComponentAttributes & WithGname;
		components?: UIComponents;
	} = $props();

	let gname = $derived(attributes.gname);
	let param = $derived({ tag: 'search' as const, gname, attributes, components });
</script>

<div use:searchEngine={param}></div>
