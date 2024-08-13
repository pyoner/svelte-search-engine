<script lang="ts">
	import type { Action } from 'svelte/action';
	import { api } from '$lib/internal/api';
	import type { ComponentAttributes } from '$lib/types/google';
	import type { UIComponents } from '$lib/types/components';
	import { registry } from '$lib/internal/registry';
	import type { SearchType } from '$lib/internal/store';

	export let attributes: ComponentAttributes;
	let { gname } = attributes;

	export let components: UIComponents | undefined = undefined;

	if (components && gname) {
		Object.keys(components).forEach((k) => {
			registry.add(k as SearchType, gname);
		});
	}
	const gcse: Action = (node) => {
		api().then((x) => x.render({ gname, tag: 'search', div: node, attributes }));
	};
</script>

<div use:gcse></div>
