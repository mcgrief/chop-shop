import { deleteSingleBike, getBikeSections, getSingleBike } from './bikeData';
import { deleteParts } from './partData';
import { deleteSection, getSectionParts, getSingleSection } from './sectionData';

const viewBikeDetails = (bikeFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleBike(bikeFirebaseKey), getBikeSections(bikeFirebaseKey)])
    .then(([bikeObject, bikeSectionsArray]) => {
      resolve({ ...bikeObject, sections: bikeSectionsArray });
    }).catch((error) => reject(error));
});

const viewSectionDetails = (sectionFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleSection(sectionFirebaseKey), getSectionParts(sectionFirebaseKey)])
    .then(([sectionObject, sectionPartsArray]) => {
      resolve({ ...sectionObject, parts: sectionPartsArray });
    }).catch((error) => reject(error));
});

const deleteSectionParts = (sectionId) => new Promise((resolve, reject) => {
  getSectionParts(sectionId).then((partsArray) => {
    const deletePartPromises = partsArray.map((part) => deleteParts(part.firebaseKey));

    Promise.all(deletePartPromises).then(() => {
      deleteSection(sectionId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const deleteBikeSections = (bikeId) => new Promise((resolve, reject) => {
  getBikeSections(bikeId).then((sectionArray) => {
    const deleteSectionPromises = sectionArray.map((section) => deleteSectionParts(section.firebaseKey));

    Promise.all(deleteSectionPromises).then(() => {
      deleteSingleBike(bikeId).then(resolve);
    });
  }).catch((error) => reject(error));
});
export {
  viewSectionDetails,
  viewBikeDetails,
  deleteBikeSections,
  deleteSectionParts,
};
