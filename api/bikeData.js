import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getBikes = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/bike.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createBike = (bikeObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/bike.json`, bikeObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.make };
      axios.patch(`${dbUrl}/bike/${response.data.name}.json`, payload).then(() => {
        getBikes().then(resolve);
      });
    }).catch(reject);
});

const getSingleBike = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/bike/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteSingleBike = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/bike/${firebaseKey}.json`)
    .then(() => {
      getBikes(uid).then((bikeArray) => resolve(bikeArray));
    })
    .catch((error) => reject(error));
});

const updateBike = (bikeObj, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/bike/${bikeObj.firebaseKey}.json`, bikeObj)
    .then(() => getBikes(uid).then(resolve))
    .catch((error) => reject(error));
});

const getBikeSections = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/section.json?orderBy="bikeId"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getBikes,
  createBike,
  getSingleBike,
  deleteSingleBike,
  updateBike,
  getBikeSections,
};
