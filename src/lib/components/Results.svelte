<script lang="ts">
	import type { Promotion, Result } from '$lib/types/search';
	import { onDestroy } from 'svelte';

	export let promos: Promotion[];
	export let results: Result[];
	onDestroy(() => {
		console.log('component was destroied');
	});
</script>

{promos}

<ul>
	{#each results as result}
		<li>
			<a href={result.url}>
				{result.visibleUrl}
			</a>
			<p>
				{result.content}
			</p>
		</li>
	{/each}
</ul>
