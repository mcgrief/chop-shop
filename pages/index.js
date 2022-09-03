/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getBikes } from '../api/bikeData';
import BikeCard from '../components/BikeCard';

export default function Home() {
  const [bikes, setBikes] = useState([]);
  const { user } = useAuth();

  const getAllBikes = () => {
    getBikes(user.uid).then(setBikes);
  };
  useEffect(() => {
    getAllBikes();
  }, []);

  return (
    <div>
      <div className="text-center my-4">
        <Link href="/bike/new" passHref>
          <Button>Start a New Bike Project</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {bikes?.map((moto) => (
            <BikeCard key={moto?.firebaseKey} bikeObj={moto} onUpdate={getBikes} />
          ))}
        </div>

      </div>
    </div>
  );
}
