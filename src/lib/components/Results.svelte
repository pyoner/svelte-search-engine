<script lang="ts">
	import type { SearchEngineComponentProps } from '$lib/types/components';

	let { gname, type, results }: SearchEngineComponentProps = $props();

	$effect(() => {
		return () => {
			console.log('component was destroyed');
		};
	});
</script>

<!-- {promos} -->
<p>gname: {gname}, type: {type}</p>

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
