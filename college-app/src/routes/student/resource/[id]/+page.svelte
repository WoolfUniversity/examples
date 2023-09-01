<script lang='ts'>
	import type { Resource } from '$lib/types';

	export let data: Resource;
</script>

<div>
	<article data-resource-woolf='{data.id}'>
		<h2>{data.title}</h2>

		{@html data.content}
	</article>
</div>
