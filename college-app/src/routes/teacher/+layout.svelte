<script lang='ts'>
	import { onMount } from 'svelte';
	import { setSdk } from '$lib/sdk';

	export let data: { token: string };

	onMount(async () => {
		const { Namespace, Woolf } = await import('@woolfteam/client');
		const client = await Woolf.create(data.token, {}, Namespace.Engineering);
		client.fab.show();
		await setSdk(client);
	});
</script>

<slot />
