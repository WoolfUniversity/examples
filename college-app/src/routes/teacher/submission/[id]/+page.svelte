<script lang='ts'>
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import type { Activity, Resource } from '$lib/types';
	import { sdk } from '$lib/sdk';

	export let data: {
		resource: Resource
		grade: number | null
		feedback: string | null
		publication: Activity
	};

	export let gradeLoading = false;
	export let feedbackLoading = false;

	const handleSubmit: SubmitFunction = async ({ formData }) => {
		gradeLoading = true;

		formData.set('resourceId', data.resource.id);
		formData.set('studentId', data.publication.userId);

		const gradeId = await $sdk.teacherAddGrade();
		formData.set('gradeId', gradeId as string);

		feedbackLoading = true;

		const feedbackId = await $sdk.teacherAddFeedback();
		formData.set('feedbackId', feedbackId as string);

		return ({ update }) => {
			gradeLoading = false;
			feedbackLoading = false;
			return update();
		};
	};
</script>

<div class='container'>
	<div class='columns'>
		<article class='column col-8'>
			<h2>{data.resource.title}</h2>
			<p><b>Student:</b> {data.publication.data.studentName}</p>

			<h3>Assignment</h3>
			{@html data.resource.content}

			<h3>Submission</h3>

			{@html data.publication.data.submissionDescr}
		</article>

		<form class='column col-4' method='POST' use:enhance={handleSubmit}>
			<div class='form-group'>
				<label class='form-label' for='grade'>Grade</label>
				<div class='has-icon-right'>
					<input class='form-input' type='text' id='grade' name='grade' value={data.grade}>
					{#if gradeLoading}
						<i class='form-icon loading'></i>
					{/if}
				</div>
			</div>

			<div class='form-group has-icon-right'>
				<label class='form-label' for='feedback'>Feedback</label>
				<div class='has-icon-right'>
					<textarea class='form-input' id='feedback' name='feedback' value={data.feedback}></textarea>
					{#if feedbackLoading}
						<i class='form-icon loading'></i>
					{/if}
				</div>
			</div>

			<button class='btn' class:loading={gradeLoading || feedbackLoading}>Save</button>
		</form>
	</div>
</div>
