import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { viewBikeDetails } from '../../api/mergedData';
import { getBikeSections } from '../../api/bikeData';
import SectionCard from '../../components/SectionCard';

function ViewBike() {
  const [bikeDetails, setBikeDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    let isMounted = true;
    viewBikeDetails(firebaseKey).then((response) => {
      if (isMounted) {
        viewBikeDetails(response.firebaseKey).then(setBikeDetails);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [firebaseKey, bikeDetails]);

  return (
    <div style={{ width: '18rem', margin: '10px' }}>
      <title>{bikeDetails.image}</title>
      <div>{bikeDetails.year} {bikeDetails.make} {bikeDetails.model}</div>
      <Link href="/section/new" passHref>
        <Button
          variant="primary"
        >Add a Section
        </Button>
      </Link>

      {bikeDetails.sections?.map((section) => (
        <SectionCard key={section.firebaseKey} sectionObj={section} onUpdate={getBikeSections} />))}

    </div>
  );
}

export default ViewBike;
