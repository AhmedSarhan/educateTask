import { useState } from 'react';
import styles from './course.module.scss';
import { FilterType, OptionType } from './../../interfaces/Courses';
import { useForm } from 'react-hook-form';
import { BsFunnel } from 'react-icons/bs';
import { FcClearFilters } from 'react-icons/fc';
import { cleanObjects } from './../../utils/cleanObjects';
const sortBys = [
	{
		field: 'name',
		direction_name: 'Ascending',
		direction: 'asc',
	},
	{
		field: 'name',
		direction_name: 'Descending',
		direction: 'desc',
	},
];
const CoursesFilters = ({
	filters,
	setFilterValues,
}: {
	filters: FilterType[];
	setFilterValues: (filters: any) => void;
}) => {
	const [sortBy, setSortBy] = useState<any>(null);
	const { register, reset, handleSubmit } = useForm({
		mode: 'onTouched',
		reValidateMode: 'onBlur',
	});
	const filterCoursesHandler = async (data: any) => {
		const cleanData = await cleanObjects(data);
		let sortByVal;
		if (sortBy) {
			sortByVal = { ...sortBy };
			delete sortByVal?.direction_name;
		}

		let filters = Object.entries(cleanData).map((filter) => {
			return { [filter[0]]: filter[1] };
		});

		const newData = { filters, sortBy: sortByVal };
		const filtersData = await cleanObjects(newData);
		console.log('before', filtersData);
		if (Object.keys(filtersData).length === 0) return;
		console.log(filtersData);
		setFilterValues(filtersData);
	};
	const clearFiltersHandler = () => {
		setFilterValues(null);
		reset();
	};
	return (
		<form
			className={styles.filtersContainer}
			onSubmit={handleSubmit(filterCoursesHandler)}
		>
			<div className={styles.formGroup}>
				<label htmlFor="sortBy">Sort By</label>
				<select
					name="sortBy"
					onChange={(e) => setSortBy(sortBys[+e?.target?.value])}
				>
					<option value={-1}>Please Select </option>
					{sortBys.map((item: any, i: number) => (
						<option key={i} value={i}>
							{item.field} ({item?.direction_name})
						</option>
					))}
				</select>
			</div>
			{filters.map((filter: FilterType) => (
				<div key={filter?.value} className={styles.formGroup}>
					<label htmlFor={filter?.value}>{filter?.name}</label>
					<select name={filter?.value} ref={register()}>
						<option value="">Please Select </option>
						{filter?.options.map(({ value, name }: OptionType, i: number) => (
							<option key={i} value={value}>
								{name}
							</option>
						))}
					</select>
				</div>
			))}

			<button type="submit">
				<BsFunnel />
				<span>Filter</span>
			</button>
			<button type="button" onClick={clearFiltersHandler}>
				<FcClearFilters />
				<span>Clear Filters</span>
			</button>
		</form>
	);
};

export default CoursesFilters;
