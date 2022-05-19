import fetchSearchList from 'hook/fetchSearchList';
import useQueryDebounce from 'hook/useQueryDebounce';
import { BsSearch } from 'react-icons/bs';
import { useQuery } from 'react-query';
import styles from './searchRecommendation.module.scss';

const SearchRecommendation = ({ inputText }: { inputText: string }) => {
  const debounceSearchInput = useQueryDebounce({ value: inputText, delay: 1000 });

  const { status, error, data } = useQuery<any>(
    ['search', debounceSearchInput],
    () => fetchSearchList(debounceSearchInput),
    {
      enabled: !!debounceSearchInput,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  const isArrayData = Array.isArray(data);

  const searchItem =
    isArrayData &&
    data.map((sick: any): JSX.Element => {
      return (
        <li key={sick.sickCd}>
          <span>
            <BsSearch className={styles.reactIcons} />
          </span>
          <span className={styles.searchWord}>{sick.sickNm}</span>
        </li>
      );
    });

  return (
    <div className={styles.recommendationWrapper}>
      <div>{status === 'loading' && 'loading...'}</div>
      <ul>{searchItem}</ul>
    </div>
  );
};

export default SearchRecommendation;
