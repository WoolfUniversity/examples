import { data } from '$lib/data';
import { error, type Load } from '@sveltejs/kit';
import type { Resource } from '$lib/types';

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
