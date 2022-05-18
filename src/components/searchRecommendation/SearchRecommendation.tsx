import fetchSearchList from 'hook/fetchSearchList';
import useQueryDebounce from 'hook/useQueryDebounce';
import { escapeRegExp } from 'lodash';
import { BsSearch } from 'react-icons/bs';
import { useQuery } from 'react-query';
import styles from './searchRecommendation.module.scss';

const SearchRecommendation = ({ inputText }: { inputText: string }) => {
  const debounceSearchInput = useQueryDebounce({ value: inputText, delay: 1000 });

  const { status, error, data } = useQuery<any>(
    ['search', debounceSearchInput],
    () => fetchSearchList(debounceSearchInput),
    {
      enabled: !!inputText,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: 10000000000,
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

// fuzzy string test
const tempData = [
  { sickCd: 'A00', sickNm: '콜레라' },
  { sickCd: 'A000', sickNm: '비브리오 콜레리 01 콜레라형균에 의한 콜레라' },
  { sickCd: 'A001', sickNm: '비브리오 콜레리 01 엘토르형균에 의한 콜레라' },
  { sickCd: 'A009', sickNm: '상세불명의 콜레라' },
  { sickCd: 'A01', sickNm: '장티푸스 및 파라티푸스' },
  { sickCd: 'A010', sickNm: '장티푸스' },
  { sickCd: 'A011', sickNm: '파라티푸스 A' },
  { sickCd: 'A012', sickNm: '파라티푸스 B' },
  { sickCd: 'A013', sickNm: '파라티푸스 C' },
  { sickCd: 'A014', sickNm: '상세불명의 파라티푸스' },
  { sickCd: 'A02', sickNm: '기타 살모넬라 감염' },
  { sickCd: 'A020', sickNm: '살모넬라 장염' },
  { sickCd: 'A021', sickNm: '살모넬라 패혈증' },
  { sickCd: 'A022', sickNm: '국소성 살모넬라 감염' },
  { sickCd: 'A028', sickNm: '기타 명시된 살모넬라 감염' },
  { sickCd: 'A029', sickNm: '상세불명의 살모넬라 감염' },
  { sickCd: 'A03', sickNm: '시겔라증' },
  { sickCd: 'A030', sickNm: '시겔라 디센테리에 의한 시겔라증' },
  { sickCd: 'A031', sickNm: '시겔라 플렉스너리에 의한 시겔라증' },
  { sickCd: 'A032', sickNm: '시겔라 보이디에 의한 시겔라증' },
  { sickCd: 'A033', sickNm: '시겔라 소네이에 의한 시겔라증' },
  { sickCd: 'A038', sickNm: '기타 시겔라증' },
];

function createFuzzyMatcher(input: string) {
  const pattern = input.split('').map(escapeRegExp).join('.*?');
  return new RegExp(pattern);
}
const regex = createFuzzyMatcher('암');

tempData.forEach((data) => {
  const result = regex.test(data.sickNm); // true
  // console.log({ result });
});
