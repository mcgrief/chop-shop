import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { deleteBikeSections } from '../api/mergedData';

export default function BikeCard({ bikeObj, onUpdate }) {
  const deleteThisBike = () => {
    if (window.confirm(`Delete ${bikeObj.model}?`)) {
      deleteBikeSections(bikeObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <>
      <div className="card" style={{ width: '25rem', margin: '10px' }}>
        <h1>
          <Card.Img variant="top" src={bikeObj.image} alt={bikeObj.make} style={{ height: '400px' }} />
        </h1>

        <>
          <Link href={`/bike/${bikeObj.firebaseKey}`} passHref>
            <Button className="btn btn-dark btn-lg copy-btn" type="button" onClick="">View</Button>
          </Link>
          <Link href={`/bike/edit/${bikeObj.firebaseKey}`} passHref>
            <Button className="btn btn-dark btn-lg copy-btn" type="button" onClick="">Update</Button>
          </Link>
          <Button className="btn btn-danger btn-lg copy-btn" type="button" onClick={deleteThisBike}>Delete</Button>
        </>
      </div>
    </>
  );
}

BikeCard.propTypes = {
  bikeObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    make: PropTypes.string,
    model: PropTypes.string,
    image: PropTypes.string,
    complete: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
