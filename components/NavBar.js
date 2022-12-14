/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Search from './SearchBar';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark Nav">
      <div className="container-fluid">

        <a className="navbar-brand" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
          <img className="Logo" src="/images/logo.png" alt="Chop Shop" />
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto">
            <div className="left">
              <li className="nav-item">
                <Link passHref href="/">
                  <a className="nav-link">
                    Back to the Garage
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link passHref href="/completed">
                  <a className="nav-link">
                    Finished Projects
                  </a>
                </Link>
              </li>
            </div>
            <div className="right">
              <li className="nav-item">
                <Search />
              </li>
              <li className="nav-item">
                <button type="button" className="btn btn-danger" onClick={signOut}>
                  Sign Out
                </button>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
