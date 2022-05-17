import { uniqBy } from 'lodash';

const serviceKey = 'HDqjNstfdCbTtqxIYVEIlanJjeOBLkalHbPIFPBc1S1ze298Lu0DZhdGWRO1DkMDGOoPLbuSD1oB51OBh5YWcQ%3D%3D';

const fetchSearchList = (params: string) => {
  return fetch(
    `/B551182/diseaseInfoService/getDissNameCodeList?pageNo=1&numOfRows=20&ServiceKey=${serviceKey}&searchText=${params}&_type=json`
  )
    .then((res) => {
      const response = res.json();
      return response;
    })
    .then((resultData) => {
      const { item } = resultData.response.body.items;
      const removedDuplicate = uniqBy(item, (r: any) => r.sickCd);
      const removedDuplicateArray = Array.from(removedDuplicate);
      console.log({ removedDuplicateArray });

      return removedDuplicateArray;
    });
};
export default fetchSearchList;
