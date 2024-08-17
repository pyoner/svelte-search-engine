<script lang="ts">
	import type { Gname } from '$lib/types/base';
	import type { ComponentAttributes } from '$lib/types/google';
	import type { UIComponents } from '$lib/types/components';

	import { gcseAction } from '$lib/internal/action';
	import { buildParams } from '$lib/internal/helpers';

	export let attributes: ComponentAttributes & { gname: Gname };
	let { gname } = attributes;

	export let components: UIComponents | undefined = undefined;
	export let only = false;

	const { id, param } = buildParams('searchresults', only, gname, attributes, components);
</script>

<div {id} use:gcseAction={param}></div>
