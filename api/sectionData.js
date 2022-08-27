import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getSections = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/section.json?orderBy="bikeId"&equalTo="${firebaseKey}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deleteSection = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/section/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const getSingleSection = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/section/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createSection = (sectionObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/section.json`, sectionObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/section/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateSection = (sectionObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/section/${sectionObj.firebaseKey}.json`, sectionObj)
    .then(resolve)
    .catch(reject);
});

const getSectionParts = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/part.json?orderBy="sectionId"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getSections,
  createSection,
  deleteSection,
  getSingleSection,
  updateSection,
  getSectionParts,
};
