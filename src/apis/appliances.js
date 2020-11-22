import axios from 'axios';

const instance = axios.create({
  baseURL: '//localhost:3333/api/',
});

const getAppliances = async (page, rowsPerPage, filters) => {
  const filterString = Object.entries(filters || []).reduce((acc, cur) => {
    acc += `&${cur[0]}=${cur[1]}`;
    return acc;
  }, '');

  const paramString = `?_page=${page}&_limit=${rowsPerPage}${filterString}`;

  const res = await instance.get(`appliances${paramString}`);
  console.log('##### getAppliances res', res);
  return res;
};

const deleteAppliance = async id => {
  const res = await instance.delete(`appliances/${id}`);
  console.log('##### deleteAppliance res', res);
  return res;
};

const addAppliance = async appliance => {
  const res = await instance.post(`appliances`, appliance);
  console.log('##### addAppliance res', res);
  return res;
};

const editAppliance = async (id, appliance) => {
  const res = await instance.put(`appliances/${id}`, appliance);
  console.log('##### editAppliance res', res);
  return res;
};

export { getAppliances, deleteAppliance, addAppliance, editAppliance };
