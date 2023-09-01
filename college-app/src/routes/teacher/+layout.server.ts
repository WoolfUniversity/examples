import { PUBLIC_TEACHER_ID } from '$env/static/public';
import { getToken } from '$lib/api';
import type { Load } from '@sveltejs/kit';

export const load: Load<never, never, { token: string }> = async () => {
	const token = await getToken(PUBLIC_TEACHER_ID);
	return { token };
};
