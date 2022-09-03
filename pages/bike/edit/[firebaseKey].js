import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleBike } from '../../../api/bikeData';
import BikeForm from '../../../components/forms/BikeForm';

export default function EditBike() {
  const [bikeObj, setEditBike] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    getSingleBike(firebaseKey).then(setEditBike);
  }, [firebaseKey]);
  return (<BikeForm obj={bikeObj} />);
}
