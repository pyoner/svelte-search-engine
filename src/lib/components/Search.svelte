<script lang="ts">
	import type { WithGname } from '$lib/internal/types';
	import type { UIComponents } from '$lib/types/components';
	import type { ComponentAttributes } from '$lib/types/google';

	import { searchEngine } from '$lib/internal/action';

	export let attributes: ComponentAttributes & WithGname;
	let { gname } = attributes;

	export let components: UIComponents | undefined = undefined;
	const param = { tag: 'search', gname, attributes, components } as const;
</script>

<div use:searchEngine={param}></div>
