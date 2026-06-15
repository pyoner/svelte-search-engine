<script lang="ts">
	import type { ImageResult } from '$lib/types/search';

	let { result }: { result: ImageResult } = $props();
</script>

<a href={result.contextUrl} target="_blank" rel="noopener">
	{result.visibleUrl}
</a>
<p>{@html result.title}</p>
<img src={result.image.url} alt={result.titleNoFormatting} loading="lazy" />
