import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSinglePart } from '../../../api/partData';
import PartForm from '../../../components/forms/PartForm';

export default function EditPart() {
  const [partObj, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    getSinglePart(firebaseKey).then(setEditItem);
  }, [firebaseKey]);
  return (<PartForm obj={partObj} />);
}
