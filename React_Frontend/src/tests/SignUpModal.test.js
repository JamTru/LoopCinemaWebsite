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

//Tests to see whether the Email Input will return an invalid response given an invalid email according to regex
test("Detects Invalid Email in Email Input via Regex", () => {
    const input = utils.getByLabelText('Email');
    fireEvent.change(input, {target: {value: "ThisIsn'tValidString"}});
    console.log(screen.getByText(/Please enter correct email format\./i));
    expect(screen.getByText(/Please enter correct email format\./i).textContent).toEqual(" Please enter correct Email format. ");
});

//Tests to see whether the Password Input will return an invalid response given an invalid password according to regex
test("Detects Invalid Password in Password Input via Regex", () => {
    const input = utils.getByLabelText('Password');
    fireEvent.change(input, {target: {value: "badpassword"}});

    expect(screen.getByText(/please enter a minimum of 8 letters \(including numbers and special characters\)/i).textContent).toEqual(" Please enter a minimum of 8 letters (including numbers and special characters) ");
});
