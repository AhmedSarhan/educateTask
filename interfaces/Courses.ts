export interface MetaType {
	page: number;
	perPage: number;
	lastPage: number;
	found: number;
	total: number;
}
export interface CourseType {
	id: number;
	instructor_id: number;
	category_id: number;
	active_lecture: number;
	name: string;
	code: string;
	type: string;
	description: string;
	prerequisite: string;
	price: number;
	rating: number;
	rating_count: number;
	enrolled_count: number;
	language: string;
	thumbnail: string;
	duration: number;
	active: boolean;
	education_type_id: number;
	education_stage_id: number;
	buyable: boolean;
	preview_video_url: string;
	instructor_name: string;
	category_name: string;
	created_at: string;
	updated_at: string;
}
export interface FilterType {
	name: string;
	value: string;
	options: OptionType[];
}

export interface OptionType {
	name: string;
	value: number;
}
