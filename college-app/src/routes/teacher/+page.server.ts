import type { Load } from '@sveltejs/kit';
import { requestV1 } from '$lib/api';
import type { Activity } from '$lib/types';
import { PUBLIC_STUDENT_ID } from '$env/static/public';

export const load: Load<
	never,
	never,
	never,
	{ activities: Activity[] }
> = async () => {
	const response = await requestV1<{
		activities: { list: Activity[] };
	}>(
		/* GraphQL */ `
			query ListActivities($studentId: String!) {
				activities(studentId: $studentId, kinds: [submitAssignment]) {
					list {
						id
						resourceId
						data
					}
				}
			}
		`,
		{
			studentId: PUBLIC_STUDENT_ID,
		},
	);

	return { activities: response.activities.list };
};
