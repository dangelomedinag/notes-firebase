// import type { FieldValue, Timestamp } from 'firebase/firestore';

export interface ServerNote<T> {
	title: string;
	content: string;
	modified: T;
	created_at: T;
}

export interface ClientNote {
	id: string;
	title: string;
	content: string;
	// selected: boolean;
	modified: Date;
	created_at: Date;
}
