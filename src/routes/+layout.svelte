<script>
	import { PUBLIC_CSE_CX } from '$env/static/public';
	import Engine from '$lib/components/Engine.svelte';
	import { jsonInterceptorPlugin, thumbnailPlugin } from '$lib';

	const cx = PUBLIC_CSE_CX;

	let { children } = $props();
</script>

<Engine {cx} plugins={[jsonInterceptorPlugin, thumbnailPlugin]}>
	{@render children()}
</Engine>
