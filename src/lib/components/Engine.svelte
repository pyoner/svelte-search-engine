<script lang="ts">
	import { onMount } from 'svelte';

	import { init, createCallbacks } from '$lib/internal/store';

	export let cx: string;

	onMount(() => {
		window.__gcse = {
			parsetags: 'explicit', // Defaults to 'onload'
			initializationCallback() {
				init.set(true);
			},
			searchCallbacks: {
				image: createCallbacks('image'),
				web: createCallbacks('web')
			}
		};

		const script = document.createElement('script');
		script.src = 'https://cse.google.com/cse.js?cx=' + cx;
		document.head.appendChild(script);
	});
</script>

<slot />
