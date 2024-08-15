<script lang="ts">
	import { createDestroyObserver } from '$lib/internal/destroy';
	import { init, createCallbacks } from '$lib/internal/store';
	import { onMount } from 'svelte';

	export let cx: string;
	let src = 'https://cse.google.com/cse.js?cx=' + cx;

	const scriptLoading = new Promise((resolve, reject) => {
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
			script.src = src;
			script.onload = resolve;
			script.onerror = reject;
			document.head.appendChild(script);

			const destroyObserver = createDestroyObserver();
			destroyObserver.observe(document.body, {
				childList: true,
				subtree: true
			});

			return () => destroyObserver.disconnect();
		});
	});
</script>

{#await scriptLoading}
	loading...
{:then}
	<slot />
{:catch err}
	error {err}
{/await}
