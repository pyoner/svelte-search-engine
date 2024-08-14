<script lang="ts">
	import type { Action } from 'svelte/action';
	import { api } from '$lib/internal/api';
	import type { ComponentAttributes } from '$lib/types/google';
	import { type UIComponents } from '$lib/types/components';
	import { registryComponents } from '$lib/internal/registry';
	import { subscribeComponents } from '$lib/internal/store';

	export let attributes: ComponentAttributes;
	let { gname } = attributes;

	export let components: UIComponents | undefined = undefined;

	const gcse: Action = (node) => {
		api().then((x) => {
			x.render({ gname, tag: 'search', div: node, attributes });
		});

		if (gname && components) {
			const unRegistryComponents = registryComponents(gname, components);
			const unsubscribeComponents = subscribeComponents(gname, components);
			return {
				destroy() {
					unRegistryComponents();
					unsubscribeComponents();
				}
			};
		}
	};
</script>

<div use:gcse></div>
