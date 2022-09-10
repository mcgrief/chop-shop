import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPart, updatePart } from '../../api/partData';
import { getBikeSections } from '../../api/bikeData';
import { getSingleSection } from '../../api/sectionData';

const initialState = {
  title: '',
  details: '',
  complete: false,
};

function PartForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [section, setSection] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { bikeId } = router.query;

  useEffect(() => {
    if (bikeId) {
      getBikeSections(bikeId).then(setSection);
    }
    if (obj.firebaseKey) {
      getSingleSection(obj.sectionId).then((response) => {
        getBikeSections(response.bikeId).then(setSection);
      });
      setFormInput(obj);
    }
  }, [obj, bikeId]);

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
      updatePart(formInput)
        .then(() => router.push(`/part/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPart(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Section Part</h2>
        <FloatingLabel controlId="floatingInput1" label="title" className="mb-3">
          <Form.Control type="text" placeholder="Enter the Part Title" name="title" value={formInput.title} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput3" label="Details" className="mb-3">
          <Form.Control type="text" placeholder="Enter Details" name="details" value={formInput.details} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Section">
          <Form.Select
            aria-label="section"
            name="sectionId"
            onChange={handleChange}
            className="mb-3"
            value={formInput.sectionId}
            required
          >
            <option value="">Select a Section</option>
            {section.map((component) => (
              <option
                key={component.firebaseKey}
                value={component.firebaseKey}
              >
                {component.name}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <Form.Check
          className="text-white mb-3"
          type="switch"
          id="complete"
          name="complete"
          label="Is this part done?"
          checked={formInput.complete}
          onChange={(e) => setFormInput((prevState) => ({
            ...prevState,
            complete: e.target.checked,
          }))}
        />
        <Button className="btn btn-primary btn-lg copy-btn" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Part</Button>
      </Form>
    </>
  );
}

PartForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    details: PropTypes.string,
    complete: PropTypes.bool,
    sectionId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PartForm.defaultProps = {
  obj: initialState,
};

export default PartForm;
