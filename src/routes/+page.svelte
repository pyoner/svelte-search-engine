<script>
	import { PUBLIC_CSE_CX } from '$env/static/public';
	import Engine from '$lib/components/Engine.svelte';

	const cx = PUBLIC_CSE_CX;
</script>

<Engine {cx}>
	<h1>Welcome to your library project</h1>
	<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</Engine>
