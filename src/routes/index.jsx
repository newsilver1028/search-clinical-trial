import { Route, Routes } from 'react-router-dom';
import Main from './Main';
import styles from './Routes.module.scss';

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
