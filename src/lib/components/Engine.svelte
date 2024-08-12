<script lang="ts">
	import { onMount } from 'svelte';

	export let cx: string;

	onMount(() => {
		const script = document.createElement('script');
		script.src = 'https://cse.google.com/cse.js?cx=' + cx;
		document.head.appendChild(script);
	});
</script>

<slot />
