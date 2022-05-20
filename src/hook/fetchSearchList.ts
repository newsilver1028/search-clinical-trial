import axios from 'axios';
import { uniqBy } from 'lodash';

const serviceKey = 'HDqjNstfdCbTtqxIYVEIlanJjeOBLkalHbPIFPBc1S1ze298Lu0DZhdGWRO1DkMDGOoPLbuSD1oB51OBh5YWcQ%3D%3D';

const fetchSearchList = (params: string) => {
  const request = axios.CancelToken.source();
  return axios
    .get(
      `https://apis.data.go.kr/B551182/diseaseInfoService/getDissNameCodeList?pageNo=1&numOfRows=50&ServiceKey=${serviceKey}&searchText=${params}&_type=json`,
      {
        cancelToken: request.token,
      }
    )
    .then((res) => {
      const {
        // totalCount,
        items: { item },
      } = res.data.response.body;
      // if (totalCount === 1) return [item];
      const removedDuplicate = uniqBy(item, (r: any) => r.sickCd);
      const removedDuplicateArray = Array.from(removedDuplicate);
      return removedDuplicateArray;
    })
    .catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        console.log('request canceled');
      }
    });
};
export default fetchSearchList;
