/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Image from 'next/image';
import { CourseType } from '../../interfaces/Courses';
import styles from './course.module.scss';
import { courseThumbnailFB } from './../../utils/imagesFallBack';
import Rating from 'react-rating';
import {
	AiOutlineUser,
	AiOutlineClockCircle,
	AiFillStar,
	AiOutlineStar,
} from 'react-icons/ai';
const CourseCard = ({ course }: { course: CourseType }) => {
	const [imgSrc, setImgSrc] = useState(() =>
		course?.thumbnail ? course?.thumbnail : courseThumbnailFB
	);
	return (
		<div className={styles.courseCard} key={course?.id}>
			{/* <Image
				src={courseThumbnailFB}
				alt={course?.name}
				onError={() => setImgSrc(courseThumbnailFB)}
				width={500}
				height={350}
				className={styles.courseCardImg}
			/> */}
			<img
				src={courseThumbnailFB}
				alt={course?.name}
				className={styles.courseCardImg}
				onError={() => setImgSrc(courseThumbnailFB)}
			/>
			<div className={styles.cardBody}>
				<h3>{course?.name}</h3>
				<h4>{course?.instructor_name}</h4>
				<div className={styles.rating}>
					<h5>{course?.rating}</h5>
					<Rating
						initialRating={course?.rating}
						readonly
						fractions={2}
						emptySymbol={
							<AiOutlineStar
								style={{ color: '#e59819', width: '1.3em', height: '1.3em' }}
							/>
						}
						fullSymbol={
							<AiFillStar
								style={{ color: '#e59819', width: '1.3em', height: '1.3em' }}
							/>
						}
					/>
					<small>({course?.rating_count})</small>
				</div>
				<p className={styles.coursePrice}>${course?.price}</p>
				<hr />
				<div className={styles.courseFooter}>
					<h5>
						<AiOutlineUser />
						<span>{course?.enrolled_count}</span>
					</h5>
					<h5>
						<AiOutlineClockCircle />
						<span>{course?.duration} h</span>
					</h5>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
