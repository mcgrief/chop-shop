import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getParts = (sectionId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/part.json?orderBy="sectionId"&equalTo="${sectionId}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getSinglePart = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/part/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const createPart = (partObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/part.json`, partObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.title };
      axios.patch(`${dbUrl}/part/${response.data.title}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const deleteSinglePart = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/part/${firebaseKey}.json`)
    .then(() => {
      getParts(uid).then((partArray) => resolve(partArray));
    })
    .catch((error) => reject(error));
});

const deleteParts = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/part/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const updatePart = (partObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/part/${partObject.firebaseKey}.json`, partObject)
    .then(resolve)
    .catch(reject);
});

export {
  getParts,
  createPart,
  deleteSinglePart,
  deleteParts,
  updatePart,
  getSinglePart,
};
