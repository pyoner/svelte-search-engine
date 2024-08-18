<script lang="ts">
	import type { WithGname } from '$lib/internal/types';
	import type { ComponentAttributes } from '$lib/types/google';

	import { searchEngine } from '$lib/internal/action';
	import { buildParams } from '$lib/internal/helpers';

	export let attributes: ComponentAttributes & WithGname;

	export let only = false;
	const { id, param } = buildParams('searchbox', only, attributes);
</script>

<div {id} use:searchEngine={param}></div>
