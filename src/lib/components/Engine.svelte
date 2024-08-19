<script lang="ts">
	import { onMount, setContext } from 'svelte';

	import { createDestroyObserver } from '$lib/internal/destroy';
	import { init, createCallbacks } from '$lib/internal/store';

	import type { Context } from '$lib/internal/types';

	export let cx: string;
	let src = 'https://cse.google.com/cse.js?cx=' + cx;

	export let className = '';
	export let style = '';

	let mainElement: HTMLElement;

	// set 'gcse' context to sync components with tag searchbox and searchresults
	setContext<Context>('gcse', {});

	const scriptInitialization = new Promise((resolve, reject) => {
		onMount(() => {
			window.__gcse = {
				parsetags: 'explicit', // Defaults to 'onload'
				initializationCallback() {
					resolve(true);
					init.set(true);
				},
				searchCallbacks: {
					image: createCallbacks('image'),
					web: createCallbacks('web')
				}
			};

			const script = document.createElement('script');
			script.src = src;
			// script.onload = resolve;
			script.onerror = reject;
			document.head.appendChild(script);

			const destroyObserver = createDestroyObserver();
			destroyObserver.observe(mainElement, {
				childList: true,
				subtree: true
			});

			return () => destroyObserver.disconnect();
		});
	});
</script>

<div bind:this={mainElement} class={className} {style}>
	{#await scriptInitialization}
		<slot name="loading">loading...</slot>
	{:then}
		<slot />
	{:catch error}
		<slot name="error" {error}>
			Error: {error}
		</slot>
	{/await}
</div>
