import { type Actions, error, type Load } from '@sveltejs/kit';

import { data } from '$lib/data';
import { getToken, request as apiRequest } from '$lib/api';
import type { Resource } from '$lib/types';

import { PUBLIC_STUDENT_ID } from '$env/static/public';

export const load: Load<{ id: string }, never, never, Resource> = ({
	params,
}) => {
	const resource = data.resources.find(({ id }) => {
		return id === params.id;
	});

	if (!resource) {
		throw error(404);
	}

	return resource;
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();

		await apiRequest(
			/* GraphQL */ `
				mutation SubmitAssignment(
					$activityId: ID!
					$resourceId: ID!
					$content: String!
				) {
					studentSubmitAssignment(
						activityId: $activityId
						resourceId: $resourceId
						descr: $content
					) {
						id
					}
				}
			`,
			{
				activityId: data.get('activityId'),
				resourceId: params.id,
				content: data.get('content'),
			},
			await getToken(PUBLIC_STUDENT_ID),
		);
	},
};
