<script>
	import { usePlugin, jsonInterceptorPlugin, thumbnailPlugin } from '$lib';
	import Search from '$lib/components/Search.svelte';
	import DemoResults from './DemoResults.svelte';

	usePlugin(jsonInterceptorPlugin);
	usePlugin(thumbnailPlugin);
</script>

<h1>Image Search – JSONP Interceptor Demo</h1>
<p>
	Open the browser DevTools console. Every image search will dump the raw CSE
	JSONP payload there, and the results below will show the intercepted
	<strong>large</strong> thumbnail alongside the default small one.
</p>

<Search
	attributes={{
		gname: 'image',
		enableImageSearch: true,
		disableWebSearch: true
	}}
	components={{ image: DemoResults }}
/>
