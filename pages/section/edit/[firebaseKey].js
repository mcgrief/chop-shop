import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleSection } from '../../../api/sectionData';
import SectionForm from '../../../components/forms/SectionForm';

function EditSection() {
  const [sectionObj, setSectionObj] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    getSingleSection(firebaseKey).then(setSectionObj);
  }, [firebaseKey]);
  return (
    <SectionForm obj={sectionObj} />
  );
}

export default EditSection;
