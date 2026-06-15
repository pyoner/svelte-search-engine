<script lang="ts">
	import type { SearchEngineComponentProps } from '$lib/types/components';
	import type { WebResult as WebResultType, ImageResult as ImageResultType } from '$lib/types/search';
	import WebResult from './WebResult.svelte';
	import ImageResult from './ImageResult.svelte';

	let { gname, type, results }: SearchEngineComponentProps = $props();

	let webResults = $derived(type === 'web' ? (results as WebResultType[]) : []);
	let imageResults = $derived(type === 'image' ? (results as ImageResultType[]) : []);

	$effect(() => {
		return () => {
			console.log('component was destroyed');
		};
	});
</script>

<!-- {promos} -->
<p>gname: {gname}, type: {type}</p>

<ul>
	{#if type === 'web'}
		{#each webResults as result}
			<li>
				<WebResult {result} />
			</li>
		{/each}
	{:else}
		{#each imageResults as result}
			<li>
				<ImageResult {result} />
			</li>
		{/each}
	{/if}
</ul>
