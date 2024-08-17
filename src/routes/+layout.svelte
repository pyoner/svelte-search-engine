<script>
	import { PUBLIC_CSE_CX } from '$env/static/public';
	import Engine from '$lib/components/Engine.svelte';

	const cx = PUBLIC_CSE_CX;
</script>

<Engine {cx}>
	<slot></slot>
</Engine>
