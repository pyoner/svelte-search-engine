<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	import { createDestroyObserver } from '$lib/internal/destroy';
	import { init, createCallbacks } from '$lib/internal/store';
	import { createPluginContext, createPluginManager, type PluginManager } from '$lib/internal/plugin';

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

	const pluginCtx = createPluginContext();
	const pluginManager = createPluginManager(plugins);

	const scriptInitialization = new Promise((resolve, reject) => {
		onMount(() => {
			const src = 'https://cse.google.com/cse.js?cx=' + cx;
			window.__gcse = {
				parsetags: 'explicit',
				async initializationCallback() {
					await pluginManager.init(pluginCtx);
					resolve(true);
					init.set(true);
				},
				searchCallbacks: {
					image: createCallbacks('image', pluginCtx, pluginManager),
					web: createCallbacks('web', pluginCtx, pluginManager)
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

			return () => {
				pluginManager.destroy(pluginCtx);
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
