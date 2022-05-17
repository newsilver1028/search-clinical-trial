import fetchSearchList from 'hook/fetchSearchList';
import { BsSearch } from 'react-icons/bs';
import { useQuery } from 'react-query';

import styles from './searchRecommendation.module.scss';

const SearchRecommendation = ({ inputText }: { inputText: string }) => {
  const { status, error, data } = useQuery<any>(['search', inputText], () => fetchSearchList(inputText), {
    enabled: !!inputText,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  return (
    <div className={styles.recommendationWrapper}>
      <div>{status === 'loading' && 'loading...'}</div>
      <ul>
        {data?.map((sick: any) => {
          return (
            <li key={sick.sickCd}>
              <span>
                <BsSearch className={styles.reactIcons} />
              </span>
              <span className={styles.searchWord}>{sick.sickNm}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchRecommendation;
