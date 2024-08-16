<script lang="ts">
	import type { Gname } from '$lib/types/base';
	import type { UIComponents } from '$lib/types/components';
	import type { ComponentAttributes } from '$lib/types/google';

	import { gcseAction } from '$lib/internal/action';

	export let attributes: ComponentAttributes & { gname: Gname };
	let { gname } = attributes;

	export let components: UIComponents | undefined = undefined;
	const param = { tag: 'search', gname, attributes, components } as const;
</script>

<div use:gcseAction={param}></div>
