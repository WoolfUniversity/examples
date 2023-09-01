<script lang='ts'>
	import type { Resource } from '$lib/types';
	import { ResourceType } from '$lib/types';

	export let data: { resources: Resource[] };
</script>

<h1>Resources</h1>

<ul>
	{#each data.resources as { id, type, title }}
		<li><a href='/student/{type === ResourceType.CONTENT ? "resource" : "assignment"}/{id}'>{title}</a></li>
	{/each}
</ul>
