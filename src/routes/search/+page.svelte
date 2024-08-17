<script>
	import Results from '$lib/components/Results.svelte';
	import Search from '$lib/components/Search.svelte';
</script>

<Search
	attributes={{
		gname: 'web',
		enableImageSearch: false
	}}
	components={{ web: Results }}
></Search>

<Search
	attributes={{
		gname: 'image',
		enableImageSearch: true,
		disableWebSearch: true
	}}
></Search>
