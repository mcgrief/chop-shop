import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { deleteSectionParts } from '../api/mergedData';
import { getSectionParts } from '../api/sectionData';

function SectionCard({ sectionObj, onUpdate }) {
  const [part, setPart] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getSectionParts(sectionObj.firebaseKey).then((response) => {
      if (isMounted) {
        setPart(response);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [sectionObj]);
  const deleteThisSection = () => {
    if (window.confirm(`Delete ${sectionObj.name}?`)) {
      deleteSectionParts(sectionObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <h3>{sectionObj.name}</h3>
        <ul>
          {part.map((parts) => (
            <li key={parts.firebaseKey}>
              {parts.title}
            </li>
          ))}
        </ul>
        <Link href={`/section/${sectionObj.firebaseKey}`} passHref>
          <Button className="btn btn-danger btn-lg copy-btn" type="button" onClick="">VIEW</Button>
        </Link>
        <Link href={`/list/edit/${sectionObj.firebaseKey}`} passHref>
          <Button className="btn btn-danger btn-lg copy-btn" type="button" onClick="">UPDATE</Button>
        </Link>
        <Button className="btn btn-danger btn-lg copy-btn" type="button" onClick={deleteThisSection}>DELETE</Button>
      </Card>
    </>

  );
}

SectionCard.propTypes = {
  sectionObj: PropTypes.shape({
    name: PropTypes.string,
    bikeId: PropTypes.string,
    complete: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SectionCard;
