import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { viewSectionDetails } from '../../api/mergedData';
import { getSectionParts } from '../../api/sectionData';
import PartCard from '../../components/PartCard';

function ViewSection() {
  const [sectionDetails, setSectionDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    let isMounted = true;
    viewSectionDetails(firebaseKey).then((response) => {
      if (isMounted) {
        viewSectionDetails(response.firebaseKey).then(setSectionDetails);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [firebaseKey, sectionDetails]);

  return (
    <div style={{ width: '18rem', margin: '10px' }}>
      <title>{sectionDetails.name}</title>
      <h1>{sectionDetails.title}</h1>
      <Link href={`/bike/${sectionDetails.bikeId}`} passHref>
        <Button
          variant="primary"
        >Back to Bike Project
        </Button>
      </Link>
      <Link href={`/part/new/${sectionDetails.bikeId}`} passHref>
        <Button
          variant="primary"
        >Add a Part
        </Button>
      </Link>

      <h5>{sectionDetails.parts?.map((part) => (
        <PartCard key={part.firebaseKey} partObj={part} onUpdate={getSectionParts} />
      ))}
      </h5>
    </div>
  );
}

export default ViewSection;
