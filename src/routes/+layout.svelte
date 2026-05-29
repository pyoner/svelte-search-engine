<script>
	import { PUBLIC_CSE_CX } from '$env/static/public';
	import Engine from '$lib/components/Engine.svelte';

	const cx = PUBLIC_CSE_CX;

	let { children } = $props();
</script>

<Engine {cx}>
	{@render children()}
</Engine>
