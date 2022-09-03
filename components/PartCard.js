import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { deleteSinglePart } from '../api/partData';

export default function PartCard({ partObj, onUpdate }) {
  const deleteThisPart = () => {
    if (window.confirm(`Delete ${partObj.title}?`)) {
      deleteSinglePart(partObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <h3>{partObj?.title}</h3>
        <Link href={`/part/${partObj.firebaseKey}`} passHref>
          <Button className="btn btn-danger btn-lg copy-btn" type="button" onClick="">VIEW</Button>
        </Link>
        <Link href={`/part/edit/${partObj.firebaseKey}`} passHref>
          <Button className="btn btn-danger btn-lg copy-btn" type="button" onClick="">UPDATE</Button>
        </Link>
        <Button className="btn btn-danger btn-lg copy-btn" type="button" onClick={deleteThisPart}>DELETE</Button>
      </Card>
    </>
  );
}

PartCard.propTypes = {
  partObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    sectionId: PropTypes.string,
    details: PropTypes.string,
    complete: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
