import axios from 'axios';
import { uniqBy } from 'lodash';

const serviceKey = 'HDqjNstfdCbTtqxIYVEIlanJjeOBLkalHbPIFPBc1S1ze298Lu0DZhdGWRO1DkMDGOoPLbuSD1oB51OBh5YWcQ%3D%3D';

const fetchSearchList = (params: string) => {
  return axios
    .get(
      `/B551182/diseaseInfoService/getDissNameCodeList?pageNo=1&numOfRows=50&ServiceKey=${serviceKey}&searchText=${params}&_type=json`
    )
    .then((res) => {
      const {
        items: { item },
      } = res.data.response.body;
      const removedDuplicate = uniqBy(item, (r: any) => r.sickCd);
      const removedDuplicateArray = Array.from(removedDuplicate);
      return removedDuplicateArray;
    });
};
export default fetchSearchList;
