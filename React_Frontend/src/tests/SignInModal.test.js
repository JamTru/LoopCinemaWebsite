import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import SignInModal from '../modals/SignInModal.js';

let container;
let utils;

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

//Before each test, render the component in a test environment.
beforeEach(() =>{
  function dummyFunction() {return};
  utils = render(<SignInModal show={true} />);
  container = utils.container;
});

//Tests to see whether the component itself renders properly within the HTML Document
test("Renders Sign In Form Properly", () => {
  expect(container).toBeInTheDocument();
});
