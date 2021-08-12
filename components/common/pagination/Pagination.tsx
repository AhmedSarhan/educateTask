import React from 'react';
import styles from './pagination.module.scss';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';

import clsx from 'clsx';
const Pagination = ({
	lastPage,
	currentPage,
	onPageChange,
}: {
	lastPage: number;
	currentPage: number;
	onPageChange: (pageNo: number) => void;
}) => {
	return (
		<div className={styles.paginationContainer}>
			<div className={styles.paginationNavContainer}>
				<button
					onClick={() => onPageChange(1)}
					className={styles.paginationNav}
					disabled={currentPage === 1}
				>
					<BiArrowToLeft />
					First
				</button>
				<button
					onClick={() => onPageChange(currentPage - 1)}
					className={styles.paginationNav}
					disabled={currentPage === 1}
				>
					<BsArrowLeft />
					Prev
				</button>
			</div>
			<div className={styles.pages}>
				{Array.from(Array(lastPage).keys()).map((i: number) => (
					<button
						className={clsx(
							styles.page,
							currentPage === i + 1 ? styles.active : ' '
						)}
						key={i}
						onClick={() => onPageChange(i + 1)}
						disabled={currentPage === i + 1}
					>
						{i + 1}
					</button>
				))}
			</div>
			<div className={styles.paginationNavContainer}>
				<button
					onClick={() => onPageChange(currentPage + 1)}
					className={styles.paginationNav}
					disabled={currentPage === lastPage}
				>
					Next <BsArrowRight />
				</button>
				<button
					onClick={() => onPageChange(lastPage)}
					className={styles.paginationNav}
					disabled={currentPage === lastPage}
				>
					Last <BiArrowToRight />
				</button>
			</div>
		</div>
	);
};

export default Pagination;
