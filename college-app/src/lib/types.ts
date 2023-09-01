export enum ResourceType {
	CONTENT,
	SUBMISSION,
}

export type Resource = {
	id: string;
	title: string;
	content: string;
	type: ResourceType;
};

export type Data = {
	resources: Resource[];
};

export type Activity = {
	id: string;
	resourceId: string;
	userId: string;
	data: {
		studentName: string;
		resourceName: string;
		submissionDescr: string;
		feedbackDescr: string;
		score: number
	};
};
