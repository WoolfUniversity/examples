import type { Actions, Load } from '@sveltejs/kit';
import type { Resource, Activity } from '$lib/types';
import { getToken, request as apiRequest, requestV1 } from '$lib/api';
import { ResourceType } from '$lib/types';
import { PUBLIC_WEIGHT_ID, PUBLIC_TEACHER_ID } from '$env/static/public';

export const load: Load<
	{ id: string },
	never,
	never,
	{
		resource: Resource;
		grade: number | null;
		feedback: string | null;
		publication: Activity;
	}
> = async ({ params }) => {
	const { activity } = await requestV1<{
		activity: Activity;
	}>(
		/* GraphQL */ `
			query GetActivity($id: ID!) {
				activity(id: $id) {
					id
					userId
					resourceId
					data
				}
			}
		`,
		{
			id: params.id,
		},
	);

	const { resource } = await requestV1<{
		resource: { id: string; name: string; content: string };
	}>(
		/* GraphQL */ `
			query GetResource($id: String!) {
				resource(id: $id) {
					id
					name
					content
				}
			}
		`,
		{
			id: activity.resourceId,
		},
	);

	const { activities: gradeActivities } = await requestV1<{
		activities: { list: Activity[] };
	}>(
		/* GraphQL */ `
			query GetGradeActivity($studentId: String!, $resourceId: String!) {
				activities(
					studentId: $studentId
					kinds: [addGrade]
					resourceId: $resourceId
				) {
					list {
						id
						resourceId
						data
					}
				}
			}
		`,
		{
			studentId: activity.userId,
			resourceId: resource.id,
		},
	);

	const { activities: feedbackActivities } = await requestV1<{
		activities: { list: Activity[] };
	}>(
		/* GraphQL */ `
			query GetGradeActivity($studentId: String!, $resourceId: String!) {
				activities(
					studentId: $studentId
					kinds: [addFeedback]
					resourceId: $resourceId
				) {
					list {
						id
						resourceId
						data
					}
				}
			}
		`,
		{
			studentId: activity.userId,
			resourceId: resource.id,
		},
	);

	return {
		resource: {
			id: resource.id,
			title: resource.name,
			content: resource.content,
			type: ResourceType.SUBMISSION,
		},
		grade: gradeActivities.list[0]?.data.score || null,
		feedback: feedbackActivities.list[0]?.data.feedbackDescr || null,
		publication: activity,
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		await apiRequest(
			/* GraphQL */ `
				mutation AddFeedback(
					$activityId: ID!
					$descr: String!
					$resourceId: ID!
					$studentId: ID!
				) {
					teacherAddFeedback(
						activityId: $activityId
						descr: $descr
						resourceId: $resourceId
						studentId: $studentId
					) {
						id
					}
				}
			`,
			{
				activityId: data.get('feedbackId'),
				resourceId: data.get('resourceId'),
				studentId: data.get('studentId'),
				descr: data.get('feedback'),
			},
			await getToken(PUBLIC_TEACHER_ID),
		);

		await apiRequest(
			/* GraphQL */ `
				mutation AddGrade(
					$activityId: ID!
					$resourceId: ID!
					$score: Float!
					$studentId: ID!
					$weightId: ID!
				) {
					teacherAddGrade(
						activityId: $activityId
						resourceId: $resourceId
						score: $score
						studentId: $studentId
						weightId: $weightId
					) {
						id
					}
				}
			`,
			{
				activityId: data.get('gradeId'),
				resourceId: data.get('resourceId'),
				studentId: data.get('studentId'),
				weightId: PUBLIC_WEIGHT_ID,
				score: +(data.get('grade') || 0),
			},
			await getToken(PUBLIC_TEACHER_ID),
		);
	},
};
