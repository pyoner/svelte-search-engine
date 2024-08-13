<script lang="ts">
	import type { Action } from 'svelte/action';
	import { api } from '$lib/internal/api';

	export let gname: string;

	const gcse: Action = (node) => {
		api().then((x) => x.render({ gname, tag: 'search', div: node }));
	};
</script>

<div use:gcse></div>
