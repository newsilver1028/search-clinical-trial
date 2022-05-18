import { BsSearch } from 'react-icons/bs';

import styles from './searchBar.module.scss';

const SearchBar = ({ onHandle, onSubmit }: { onHandle: (e: any) => void; onSubmit: (e: any) => void }) => {
  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchBar}>
        <div>
          <BsSearch className={styles.reactIcons} />
        </div>
        <form onSubmit={onSubmit}>
          <input type='text' placeholder='질환명을 입력해 주세요.' onChange={onHandle} />
        </form>
        <button type='button' onSubmit={onSubmit}>
          검색
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
