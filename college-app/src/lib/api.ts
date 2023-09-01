import { API_URL, COLLEGE_TOKEN } from '$env/static/private';
import { error } from '@sveltejs/kit';

type GqlResponse<T> = {
	data: T;
	errors?: {
		message: string;
	}[];
};

async function _request<T>(
	url: string,
	query: string,
	variables?: Record<string, unknown>,
	token?: string,
) {
	const response = await fetch(url, {
		body: JSON.stringify({ query, variables }),
		headers: {
			authorization: `Bearer ${token || COLLEGE_TOKEN}`,
			'content-type': 'application/json',
		},
		method: 'POST',
	});
	const { data, errors } = (await response.json()) as GqlResponse<T>;

	if (errors?.length) {
		const formatted = errors
			.map(({ message }) => {
				return message;
			})
			.join('\n===\n');
		throw error(500, formatted);
	}

	return data;
}

export async function request<T>(
	query: string,
	variables?: Record<string, unknown>,
	token?: string,
) {
	return _request<T>(API_URL, query, variables, token);
}

export async function requestV1<T>(
	query: string,
	variables?: Record<string, unknown>,
	token?: string,
) {
	return _request<T>(`${API_URL}/v1`, query, variables, token);
}

export async function getToken(userId: string) {
	const response = await request<{ authorizeOAuth: { accessToken: string } }>(
		/* GraphQL */ `
			mutation Authorise($userId: ID!) {
				authorizeOAuth(userId: $userId) {
					accessToken
				}
			}
		`,
		{ userId },
	);

	return response.authorizeOAuth.accessToken;
}
