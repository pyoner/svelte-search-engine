<script>
	import { PUBLIC_CSE_CX } from '$env/static/public';
	import Engine from '$lib/components/Engine.svelte';
	import Results from '$lib/components/Results.svelte';
	import Search from '$lib/components/Search.svelte';
	import SearchBox from '$lib/components/SearchBox.svelte';
	import SearchResults from '$lib/components/SearchResults.svelte';
	import { rendered, ready } from '$lib/stores';

	const cx = PUBLIC_CSE_CX;

	ready.subscribe((input) => {
		console.log('ready input', input);
	});

	rendered.subscribe((input) => {
		console.log('rendered input', input);
	});
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
		<div>
			<SearchBox
				attributes={{
					gname: 'xxx'
				}}
			></SearchBox>
			<SearchResults attributes={{ gname: 'xxx' }}></SearchResults>
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
