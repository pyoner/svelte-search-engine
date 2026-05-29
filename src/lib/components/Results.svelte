<script lang="ts">
	import type { Result } from '$lib/types/search';

	let { results }: { results: Result[] } = $props();

	$effect(() => {
		return () => {
			console.log('component was destroyed');
		};
	});
</script>

<!-- {promos} -->

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
