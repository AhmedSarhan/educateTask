import { useEffect, useState } from 'react';
import styles from './common.module.scss';
import { useForm } from 'react-hook-form';
import { BsSearch } from 'react-icons/bs';
const Search = ({
	setSearchQuery,
	searchQuery,
}: {
	setSearchQuery: (val: string | null) => void;
	searchQuery: string | null;
}) => {
	const {
		register,
		errors,
		handleSubmit,
		formState: { isValid },
	} = useForm();
	const [searchText, setSearchText] = useState<string | null>(
		() => searchQuery
	);
	useEffect(() => {
		if (!isValid) {
			setSearchText(null);
		}
	}, [isValid]);
	const searchHandler = (data: any) => {
		console.log(data);
		setSearchText(data?.search);
		setSearchQuery(data?.search);
	};
	return (
		<>
			<form
				className={styles.searchForm}
				onSubmit={handleSubmit(searchHandler)}
			>
				<div>
					<input
						type="text"
						name="search"
						placeholder="Search"
						ref={register({
							required: 'Please Enter a search value first',
						})}
					/>
				</div>
				<button>
					<BsSearch />
				</button>
			</form>
			{errors?.search && (
				<p className={styles.error}>{errors?.search?.message}</p>
			)}
			{searchText && (
				<p style={{ textAlign: 'center' }}> you searched for {searchText}</p>
			)}
		</>
	);
};

export default Search;
