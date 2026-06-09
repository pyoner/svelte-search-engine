<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	import { createDestroyObserver } from '$lib/internal/destroy';
	import { createCSECallbacks } from '$lib/internal/callbacks';

	import type { Context } from '$lib/internal/types';
	import type { Plugin } from '$lib/internal/plugin';

	let {
		cx,
		className = '',
		style = '',
		plugins = [],
		children,
		loading,
		error
	}: {
		cx: string;
		className?: string;
		style?: string;
		plugins?: Plugin<unknown>[];
		children?: Snippet;
		loading?: Snippet;
		error?: Snippet<[unknown]>;
	} = $props();

	let mainElement: HTMLElement | undefined = undefined;

	setContext<Context>('gcse', {});

	const scriptInitialization = new Promise((resolve, reject) => {
		onMount(() => {
			const src = 'https://cse.google.com/cse.js?cx=' + cx;
		const cseCallbacks = createCSECallbacks(plugins, () => {
			resolve(true);
		});

			window.__gcse = {
				parsetags: 'explicit',
				...cseCallbacks
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

			return () => {
				cseCallbacks.destroy();
				destroyObserver.disconnect();
			};
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
