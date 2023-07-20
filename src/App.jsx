import { useEffect, useState } from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';
import { getPosts } from './axios';
import { setData } from './redux/actions/mainActions';

export default function App() {
	const [loading, setLoading] = useState(true);
	const [offset, setOffset] = useState(0);
	const [search, setSearch] = useState('');

	const data = useSelector((state) => state.main.data);
	const totalData = useSelector((state) => state.main.data).length;

	const dispatch = useDispatch();

	useEffect(() => {
		setLoading(true);
		getPosts()
			.then((res) => dispatch(setData(res.data)))
			.catch((err) => console.log(err))
			.finally(() => {
				setLoading(false);
			});
	}, [dispatch]);

	const truncate = (str, n) => {
		return str?.length > n ? str.substr(0, n - 1) + '...' : str;
	};

	if (loading) {
		return <LoopCircleLoading size="large" color="#212121" />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<span className={styles.title}>
					Data Posts for <b>BigNet</b> by <span className={styles.name}>Said Nizamudin</span>
				</span>
				<table className={styles.table}>
					<thead className={styles.tableHead}>
						<tr>
							<th className={styles.headCellNo}>No</th>
							<th className={styles.headCellTitle}>Title</th>
							<th className={styles.headCellBody}>Body</th>
						</tr>
					</thead>
					<tbody className={styles.tableBody}>
						{data
							.filter((data) => {
								if (search === '') {
									return data;
								} else if (data.title.toLowerCase().includes(search.toLowerCase())) {
									return data;
								}
							})
							.slice(offset, offset + 8)
							.map((data, index) => (
								<tr key={data.id}>
									<td className={styles.bodyCellNo}>{index + 1}</td>
									<td className={styles.bodyCellIndex}>{truncate(data.title, 60)}</td>
									<td className={styles.bodyCellBody}>{truncate(data.body, 180)}</td>
								</tr>
							))}
					</tbody>
				</table>
				<div className={styles.paginationButton}>
					<button
						className={styles.button}
						onClick={() => setOffset(offset - 8)}
						disabled={offset - 8 < 0}>
						Sebelumnya
					</button>
					<input
						type="text"
						name="search"
						id="search"
						className={styles.search}
						placeholder="Cari data berdasarkan title..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button
						className={styles.button}
						onClick={() => setOffset(offset + 8)}
						disabled={offset + 8 >= totalData}>
						Selanjutnya
					</button>
				</div>
			</div>
		</div>
	);
}
