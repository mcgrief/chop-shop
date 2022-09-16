import React, { useState } from 'react';
import { Form, Nav, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function Search() {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      router.push({
        pathname: '/search',
        query: { keyword: searchInput },
      });
      setSearchInput('');
    }
  };
  return (
    <Nav.Item className="search ms-auto">
      <Form className="d-flex">
        <Form.Control type="search" placeholder="Now where did I put that..." className="me-2" aria-label="Search" value={searchInput} onChange={handleChange} onKeyDown={handleSearch} />
        <Button variant="danger">
          Search
        </Button>
      </Form>
    </Nav.Item>
  );
}
