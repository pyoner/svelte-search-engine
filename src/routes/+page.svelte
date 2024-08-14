<script>
	import { PUBLIC_CSE_CX } from '$env/static/public';
	import Engine from '$lib/components/Engine.svelte';
	import Results from '$lib/components/Results.svelte';
	import Search from '$lib/components/Search.svelte';

	const cx = PUBLIC_CSE_CX;
</script>

<Engine {cx}>
	<div class="container">
		<div>
			<Search
				attributes={{
					gname: 'web',
					enableImageSearch: false
				}}
				components={{ web: Results }}
			></Search>
		</div>
		<div>
			<Search
				attributes={{
					gname: 'image',
					enableImageSearch: true,
					disableWebSearch: true
				}}
			></Search>
		</div>
	</div>
</Engine>

<style>
	.container {
		display: flex;
		flex-direction: row;
	}
	.container > div {
		flex-grow: 1;
	}
</style>
