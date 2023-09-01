<script lang='ts'>
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	import type { Resource } from '$lib/types';
	import { sdk } from '$lib/sdk';

	export let data: Resource;
	export let loading = false;
	export let submission = '';

	const handleSubmit: SubmitFunction = async ({ formData }) => {
		loading = true;

		const id = await $sdk.studentSubmitAssignment();
		formData.set('activityId', id as string);

		return ({ update }) => {
			loading = false;
			return update();
		};
	};
</script>

<div>
	<article data-resource-woolf='{data.id}'>
		<h2>{data.title}</h2>

		{@html data.content}
	</article>

	<h2>Submission</h2>

	<form method='POST' use:enhance={handleSubmit}>
		<div class='container'>
			<div class='columns mb-2'>
				<div class='col-12'>
					<textarea class='form-input' name='content' rows='10' bind:value={submission}></textarea>
				</div>
			</div>

			<div class='columns'>
				<div class='col-ml-auto'>
					<button class='btn' class:loading={loading} disabled={!submission}>Send submission</button>
				</div>
			</div>
		</div>
	</form>
</div>
