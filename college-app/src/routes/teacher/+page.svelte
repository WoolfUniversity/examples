<script lang='ts'>
	import type { Activity } from '$lib/types';

	export let data: { activities: Activity[] };
</script>

<h1>Submissions</h1>

<ul>
	{#each data.activities as { id, data }}
		<li><a href='/teacher/submission/{id}'><b>{data.studentName}</b> - {data.resourceName}</a></li>
	{/each}
</ul>


