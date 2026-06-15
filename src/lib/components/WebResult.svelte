<script lang="ts">
	import type { WebResult } from '$lib/types/search';

	let { result }: { result: WebResult } = $props();
</script>

<a href={result.url}>
	{result.visibleUrl}
</a>
<p>
	{result.content}
</p>
