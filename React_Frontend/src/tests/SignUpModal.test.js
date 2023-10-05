import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import SignUpModal from '../modals/SignUpModal.js';

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
  utils = render(<SignUpModal show={true} />);
  container = utils.container;
});

//Tests to see whether the component itself renders properly within the HTML Document
test("Renders Sign Up Form Properly", () => {
  expect(container).toBeInTheDocument();
});

//Tests to see whether the Email Input will return an invalid response given an empty string
test("Detects Empty Response in Email Input via Required Tag", () => {
    const input = utils.getByLabelText('Email');
    expect(input).toBeInvalid();
});
