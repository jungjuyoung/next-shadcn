export interface Tags {
	id: number;
	name: string;
}

export interface Post {
	id: string;
	title: string;
	content: string;
	tag: Tags;
	createdAt: Date;
}
