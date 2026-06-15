<script lang="ts">
	import type { SearchEngineComponentProps } from '$lib/types/components';
	import type { WithThumbs } from '$lib/plugins/thumbnail';

	let { results }: WithThumbs<SearchEngineComponentProps<'image'>> = $props();
</script>

<ul class="results">
	{#each results as result}
		<li>
			<a href={result.contextUrl} target="_blank" rel="noopener">
				{result.visibleUrl}
			</a>
			<p>{@html result.title}</p>

			<div class="thumbnails">
				<div>
					<strong>Small ({result.thumbnailImage.width ?? '?'}×{result.thumbnailImage.height ?? '?'})</strong>
					<img
						src={result.thumbnailImage.url}
						alt={result.titleNoFormatting}
						loading="lazy"
					/>
				</div>

				{#if result.thumbnailMedium}
					<div>
						<strong>Medium ({result.thumbnailMedium.width ?? '?'}×{result.thumbnailMedium.height ?? '?'})</strong>
						<img
							src={result.thumbnailMedium.url}
							alt={result.titleNoFormatting}
							loading="lazy"
						/>
					</div>
				{/if}

				{#if result.thumbnailLarge}
					<div>
						<strong>Large ({result.thumbnailLarge.width ?? '?'}×{result.thumbnailLarge.height ?? '?'})</strong>
						<img
							src={result.thumbnailLarge.url}
							alt={result.titleNoFormatting}
							loading="lazy"
						/>
					</div>
				{:else}
					<div class="missing">
						<strong>Large</strong>
						<p>Not intercepted yet</p>
					</div>
				{/if}
			</div>
		</li>
	{/each}
</ul>

<style>
	.results {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.results li {
		margin-bottom: 1.5rem;
		padding: 1rem;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
	}
	.thumbnails {
		display: flex;
		gap: 1rem;
		margin-top: 0.5rem;
		flex-wrap: wrap;
	}
	.thumbnails > div {
		text-align: center;
	}
	.thumbnails img {
		display: block;
		margin-top: 0.25rem;
		max-width: 200px;
		max-height: 300px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	.missing {
		color: #888;
		min-width: 100px;
	}
</style>
