import { data } from '$lib/data';
import type { Load } from '@sveltejs/kit';
import type { Resource } from '$lib/types';

export const load: Load<
	never,
	never,
	never,
	{ resources: Resource[] }
> = () => {
	return {
		resources: data.resources,
	};
};
