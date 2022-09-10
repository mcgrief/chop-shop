import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createSection, updateSection } from '../../api/sectionData';
import { getBikes } from '../../api/bikeData';

const initialState = {
  name: '',
  complete: false,
};

function SectionForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [bikes, setBikes] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getBikes(user.uid).then(setBikes);

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
      updateSection(formInput)
        .then(() => router.push(`/section/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createSection(payload).then(() => {
        router.push('/');
      });
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} New Section</h2>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            name="name"
            placeholder="Enter Section Name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </div>
        <FloatingLabel controlId="floatingSelect" label="Bike">
          <Form.Select
            aria-label="Bikes"
            name="bikeId"
            onChange={handleChange}
            className="mb-3"
            value={formInput.bikeId}
            required
          >
            <option value="">Select a Bike</option>
            {bikes.map((moto) => (
              <option
                key={moto.firebaseKey}
                value={moto.firebaseKey}
              >
                {moto.model}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <Form.Check
          className="text-white mb-3"
          type="switch"
          id="complete"
          name="complete"
          label="Finish the section?"
          checked={formInput.complete}
          onChange={(e) => setFormInput((prevState) => ({
            ...prevState,
            complete: e.target.checked,
          }))}
        />
        <Button className="btn btn-primary btn-lg copy-btn" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Section</Button>
      </Form>
    </>
  );
}

SectionForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    complete: PropTypes.bool,
    bikeId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

SectionForm.defaultProps = {
  obj: initialState,
};

export default SectionForm;
