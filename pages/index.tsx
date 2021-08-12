import type { GetServerSideProps, NextPage } from 'next';
import { useState, useEffect, useRef } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import axios from 'axios';
import { CourseType } from '../interfaces/Courses';
import { MetaType, FilterType } from './../interfaces/Courses';
import Pagination from '../components/common/pagination/Pagination';
import CoursesList from '../components/courses/CoursesList';
import CoursesFilters from './../components/courses/CoursesFilters';
import Search from '../components/common/Search';
interface HomePageProps {
	courses: CourseType[];
	meta: MetaType;
	filters: FilterType[];
}
const Home: NextPage<HomePageProps> = ({
	courses,
	meta: { page, lastPage, perPage, found, total },
	filters,
}) => {
	const [coursesState, setCoursesState] = useState<CourseType[]>(() => [
		...courses,
	]);
	const [currentPage, setCurrentPage] = useState<number>(() => page);
	const [lastPageState, setLastPageState] = useState<number>(() => lastPage);
	const [coursesPerPage, setCoursesPerPage] = useState<number>(1);
	const [filtersState, setFiltersState] = useState<FilterType[]>(() => [
		...filters,
	]);
	const [searchQuery, setSearchQuery] = useState<string | null>(null);
	const [filterValues, setFilterValues] = useState<any>(null);
	const firstRender = useRef(true);

	const pageChangeHandler = (selectedPage: number) => {
		setCurrentPage(selectedPage);
	};
	const fetchCoursesHandler = async () => {
		try {
			const resp = await axios.post(
				'https://stag.api.student.gateway.eduact.me/api/course/fetch',
				{
					perPage: coursesPerPage,
					page: currentPage,
					...filterValues,
					searchQuery,
				}
			);

			const {
				data: courses,
				meta: { page, perPage, lastPage, found, total },
				meta: { filters },
			} = resp?.data;
			setCoursesState([...courses]);
			setLastPageState(lastPage);
			setFiltersState([...filters]);
		} catch (error) {
			console.log(error?.message);
		}
	};
	useEffect(() => {
		if (firstRender.current) {
			console.log('leaving');
			firstRender.current = false;
			return;
		}
		console.log(currentPage);
		fetchCoursesHandler();
		console.log('data is fetching');
	}, [currentPage, coursesPerPage, filterValues, searchQuery]);

	return (
		<div className={styles.container}>
			<Head>
				<title>Educate Courses Page</title>
				<meta
					name="description"
					content="We offer variety of great courses to your satisfaction"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h3>Our Courses</h3>
				<Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

				<div className={styles.main}>
					<div style={{ position: 'relative' }}>
						<CoursesFilters
							setFilterValues={setFilterValues}
							filters={filtersState}
						/>
					</div>
					{coursesState?.length === 0 && (
						<p
							style={{
								textAlign: 'center',
								marginBlock: '30vh',
								width: '100%',
								gridColumn: 'span 4 / span 4',
							}}
						>
							No Courses found
						</p>
					)}
					<CoursesList courses={coursesState} />
				</div>
				<div className={styles.pagination}>
					<div className={styles.formGroup}>
						<label>Courses per page</label>
						<select
							value={coursesPerPage}
							onChange={(e) => setCoursesPerPage(+e.target.value)}
						>
							{Array.from(Array(total).keys()).map((i: number) => (
								<option key={i} value={i + 1}>
									{i + 1}
								</option>
							))}
						</select>
					</div>
					<Pagination
						lastPage={lastPageState}
						currentPage={currentPage}
						onPageChange={pageChangeHandler}
					/>
				</div>
			</main>
		</div>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const resp = await axios.post(
		'https://stag.api.student.gateway.eduact.me/api/course/fetch',
		{
			perPage: 1,
			page: 1,
		}
	);

	const {
		data: courses,
		meta: { page, perPage, lastPage, found, total },
		meta: { filters },
	} = resp?.data;
	return {
		props: {
			courses,
			meta: { page, perPage, lastPage, found, total },
			filters,
		},
	};
};
