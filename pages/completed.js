/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getCompletedBikes } from '../api/bikeData';
import BikeCard from '../components/BikeCard';

export default function CompletedProjects() {
  const [projects, setProjects] = useState([]);
  const { user } = useAuth();

  const getFinishedBikes = () => {
    getCompletedBikes(user.uid).then(setProjects);
  };
  useEffect(() => {
    getFinishedBikes();
  }, [projects]);

  return (
    <div>
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {projects?.map((bike) => (
            <BikeCard key={bike?.firebaseKey} bikeObj={bike} onUpdate={getCompletedBikes} />
          ))}
        </div>

      </div>
    </div>
  );
}
