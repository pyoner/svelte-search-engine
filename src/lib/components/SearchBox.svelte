<script lang="ts">
	import type { Gname } from '$lib/types/base';
	import type { ComponentAttributes } from '$lib/types/google';

	import { gcseAction } from '$lib/internal/action';
	import { generateParams } from '$lib/internal/helpers';

	export let attributes: ComponentAttributes & { gname: Gname };
	let { gname } = attributes;

	export let only = false;
	const { id, param } = generateParams('searchbox', only, gname, attributes);
</script>

<div {id} use:gcseAction={param}></div>
