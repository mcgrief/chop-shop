import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getIncompleteBikes } from '../api/bikeData';
import BikeCard from '../components/BikeCard';
import { useAuth } from '../utils/context/authContext';

export default function Search() {
  const { user } = useAuth();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);

  const getBikes = () => {
    getIncompleteBikes(user.uid).then((bikeArray) => {
      const value = router.query.keyword;
      setFilteredData(bikeArray);
      const results = bikeArray.filter((bike) => bike.make.toLowerCase().includes(value.toLowerCase()) || bike.model.toLowerCase().includes(value.toLowerCase()) || bike.year.toLowerCase().includes(value.toLowerCase()) || bike.color.toLowerCase().includes(value.toLowerCase()));
      setFilteredData(results);
    });
  };

  useEffect(() => {
    getBikes();
    setFilteredData([]);
  }, [router.query.keyword]);

  return (
    <div>
      {filteredData.length ? filteredData.map((bike) => (
        <BikeCard key={bike.firebaseKey} bikeObj={bike} />

      )) : <h2>Lost Your Ride?</h2>}
    </div>
  );
}
