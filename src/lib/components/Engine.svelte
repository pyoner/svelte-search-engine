<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	import { createDestroyObserver } from '$lib/internal/destroy';
	import { init, createCallbacks } from '$lib/internal/store';
	import { initJsonpInterceptor } from '$lib/internal/interceptor';

	import type { Context } from '$lib/internal/types';

	let {
		cx,
		className = '',
		style = '',
		children,
		loading,
		error
	}: {
		cx: string;
		className?: string;
		style?: string;
		children?: Snippet;
		loading?: Snippet;
		error?: Snippet<[unknown]>;
	} = $props();

	let mainElement: HTMLElement | undefined = undefined;

	setContext<Context>('gcse', {});

	const scriptInitialization = new Promise((resolve, reject) => {
		onMount(() => {
			const src = 'https://cse.google.com/cse.js?cx=' + cx;
			window.__gcse = {
				parsetags: 'explicit',
				initializationCallback() {
					initJsonpInterceptor();
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
			script.onerror = reject;
			document.head.appendChild(script);

			const destroyObserver = createDestroyObserver();
			destroyObserver.observe(mainElement!, {
				childList: true,
				subtree: true
			});

			return () => destroyObserver.disconnect();
		});
	});
</script>

<div bind:this={mainElement} class={className} {style}>
	{#await scriptInitialization}
		{#if loading}
			{@render loading()}
		{:else}
			loading...
		{/if}
	{:then}
		{@render children?.()}
	{:catch err}
		{#if error}
			{@render error(err)}
		{:else}
			Error: {err}
		{/if}
	{/await}
</div>
