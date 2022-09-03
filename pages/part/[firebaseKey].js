import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getSinglePart } from '../../api/partData';
import PartCard from '../../components/PartCard';

export default function ViewPart() {
  const [partDetails, setPartDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    getSinglePart(firebaseKey).then(setPartDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Parts</title>
      </Head>
      <Link href={`/section/${partDetails.sectionId}`} passHref>
        <Button
          variant="primary"
        >Back to Section
        </Button>
      </Link>
      <div style={{ width: '25rem', margin: '10px' }}>
        <h1>{partDetails.title}</h1>
      </div>
      <div style={{ width: '18rem', margin: '10px' }}>
        <h3>Details: {partDetails.details}</h3>
      </div>
      <h5>{partDetails.parts?.map((part) => (
        <PartCard key={part.firebaseKey} partObj={part} onUpdate={() => null} />
      ))}
      </h5>
    </>
  );
}
