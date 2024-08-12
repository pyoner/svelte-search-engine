<script lang="ts">
	import { onMount } from 'svelte';

	export let cx: string;

	onMount(() => {
		window.__gcse = window.__gcse || {};
		window.__gcse = {
			parsetags: 'explicit', // Defaults to 'onload'
			initializationCallback: myInitializationCallback,
			searchCallbacks: {
				image: {
					starting: myImageSearchStartingCallback,
					ready: myImageResultsReadyCallback,
					rendered: myImageResultsRenderedCallback
				},
				web: {
					starting: myWebSearchStartingCallback,
					ready: myWebResultsReadyCallback,
					rendered: myWebResultsRenderedCallback
				}
			}
		};

		const script = document.createElement('script');
		script.src = 'https://cse.google.com/cse.js?cx=' + cx;
		document.head.appendChild(script);
	});
</script>

<slot />
