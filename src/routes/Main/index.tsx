import SearchBar from 'components/searchBar/SearchBar';
import SearchRecommendation from 'components/searchRecommendation/SearchRecommendation';
import { useState } from 'react';
import styles from './routes.module.scss';

const Main = () => {
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');

  // const debounceSearchInput = useQueryDebounce({ value: inputText, delay: 200 });

  const handleInput = (e: any) => {
    const { value } = e.currentTarget;
    const encodedValue = encodeURI(value);
    setInputText(encodedValue);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className={styles.mainWrapper}>
      <h1>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </h1>
      <SearchBar onHandle={handleInput} onSubmit={handleSubmit} />
      <SearchRecommendation inputText={inputText} />
    </div>
  );
};

export default Main;
