<script lang="ts">
	import type { WithGname } from '$lib/internal/types';
	import type { ComponentAttributes } from '$lib/types/google';
	import type { UIComponents } from '$lib/types/components';

	import { gcseAction } from '$lib/internal/action';
	import { buildParams } from '$lib/internal/helpers';

	export let attributes: ComponentAttributes & WithGname;

	export let components: UIComponents | undefined = undefined;
	export let only = false;

	const { id, param } = buildParams('searchresults', only, attributes, components);
</script>

<div {id} use:gcseAction={param}></div>
