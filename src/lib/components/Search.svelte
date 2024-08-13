<script lang="ts">
	import type { Action } from 'svelte/action';
	import { api } from '$lib/internal/api';
	import type { ComponentAttributes } from '$lib/types/google';

	export let attributes: ComponentAttributes;
	let { gname } = attributes;

	const gcse: Action = (node) => {
		api().then((x) => x.render({ gname, tag: 'search', div: node, attributes }));
	};
</script>

<div use:gcse></div>
