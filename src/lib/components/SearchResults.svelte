<script lang="ts">
	import type { ComponentAttributes } from '$lib/types/google';
	import { type UIComponents } from '$lib/types/components';
	import { gcseAction } from '$lib/internal/action';

	export let attributes: ComponentAttributes & { gname: string };
	let { gname } = attributes;

	export let components: UIComponents | undefined = undefined;
	export let only = false;
</script>

<div
	use:gcseAction={{
		tag: only ? 'searchresults-only' : 'searchresults',
		gname,
		attributes,
		components
	}}
></div>
