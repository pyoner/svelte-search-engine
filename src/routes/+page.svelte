<script>
	import { PUBLIC_CSE_CX } from '$env/static/public';
	import Engine from '$lib/components/Engine.svelte';
	import Search from '$lib/components/Search.svelte';

	const cx = PUBLIC_CSE_CX;
</script>

<Engine {cx}>
	<Search gname="test"></Search>
</Engine>
