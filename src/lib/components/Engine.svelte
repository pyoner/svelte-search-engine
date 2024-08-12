<script lang="ts">
	import { init, createCallbacks } from '$lib/internal/store';

	export let cx: string;

	const scriptLoading = new Promise((resolve, reject) => {
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

		script.onload = resolve;
		script.onerror = reject;

		document.head.appendChild(script);
	});
</script>

{#await scriptLoading}
	<slot />
{/await}
