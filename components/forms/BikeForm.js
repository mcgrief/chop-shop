import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createBike, updateBike } from '../../api/bikeData';

const initialState = {
  make: '',
  model: '',
  year: '',
  image: '',
  complete: false,
};

function BikeForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateBike(formInput)
        .then(() => router.push(`/bike/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createBike(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <>
      <Head>
        <title>Creat a New Bike!</title>
      </Head>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} New Bike Project</h2>
        <FloatingLabel controlId="floatingInput1" label="Make" className="mb-3">
          <Form.Control type="text" placeholder="Enter the Make" name="make" value={formInput.make} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput3" label="Model" className="mb-3">
          <Form.Control type="text" placeholder="Enter the Model" name="model" value={formInput.model} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput3" label="Year" className="mb-3">
          <Form.Control type="text" placeholder="Enter the Year" name="year" value={formInput.year} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="Bike Image" className="mb-3">
          <Form.Control type="url" placeholder="Enter your bike image" name="image" value={formInput.image} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput3" label="Color" className="mb-3">
          <Form.Control type="text" placeholder="Enter the Color" name="color" value={formInput.color} onChange={handleChange} required />
        </FloatingLabel>
        <Button className="btn btn-primary btn-lg copy-btn" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Bike</Button>
      </Form>
    </>
  );
}

BikeForm.propTypes = {
  obj: PropTypes.shape({
    make: PropTypes.string,
    model: PropTypes.string,
    year: PropTypes.string,
    image: PropTypes.string,
    complete: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

BikeForm.defaultProps = {
  obj: initialState,
};

export default BikeForm;
