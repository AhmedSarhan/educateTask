import React from 'react';
import { CourseType } from '../../interfaces/Courses';
import styles from './course.module.scss';
import CourseCard from './CourseCard';

const CoursesList: React.FC<any> = ({ courses }: { courses: CourseType[] }) => {
	return (
		<div className={styles.coursesContainer}>
			{courses?.length > 0 &&
				courses.map((course: CourseType) => (
					<CourseCard course={course} key={course.id} />
				))}
		</div>
	);
};

export default CoursesList;
