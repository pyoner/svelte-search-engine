<script lang="ts">
	import SearchResults from '$lib/components/SearchResults.svelte';
	import Results from '$lib/components/Results.svelte';
	import DemoResults from './DemoResults.svelte';
	import { searchElementApi } from '$lib';

	let query = '';

	function search(event: SubmitEvent) {
		event.preventDefault();
		searchElementApi().getElement('web')?.execute(query);
		searchElementApi().getElement('image')?.execute(query);
	}
</script>

<h1>Image Search – JSONP Interceptor Demo</h1>
<p>
	Open the browser DevTools console. Every image search will dump the raw CSE
	JSONP payload there, and the results below will show the intercepted
	<strong>large</strong> thumbnail alongside the default small one.
</p>

<form onsubmit={search}>
	<input type="search" bind:value={query} placeholder="Search..." />
	<button type="submit">Search</button>
</form>

<div class="results-grid">
	<div>
		<h2>Web</h2>
		<SearchResults
			only
			attributes={{
				gname: 'web',
				enableImageSearch: false
			}}
			components={{ web: Results }}
		/>
	</div>

	<div>
		<h2>Image</h2>
		<SearchResults
			only
			attributes={{
				gname: 'image',
				enableImageSearch: true,
				disableWebSearch: true
			}}
			components={{ image: DemoResults }}
		/>
	</div>
</div>

<style>
	.results-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-top: 1rem;
	}
</style>
