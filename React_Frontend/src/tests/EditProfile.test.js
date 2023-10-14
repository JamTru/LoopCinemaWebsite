import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import EditProfile from '../pages/EditProfile.js';

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
  const email = "email";
  const date = "2000-01-01";
  const username = "username";
  const displayUsername = "displayUsername"
  const password = "password";
  utils = render(<EditProfile email={email} date={date} username={username} displayUsername={displayUsername} password={password} logoutUser={dummyFunction} loginUser={dummyFunction}/>);
  container = utils.container;
});

//Tests to see whether the component itself renders properly within the HTML Document
test("Renders User Editor Form Properly", () => {
  expect(container).toBeInTheDocument();
});

//Tests to see if the displayUsername input has the correct placeholder and default value parsed in
test("Detects the displayUsername input value is equal to the prop passed in", () => {
  const input = utils.getByPlaceholderText('displayUsername');
  expect(input).toHaveValue('displayUsername');
});

//Tests to see if the Email input has the correct placeholder and default value parsed in
test("Detects the email input value is equal to the prop passed in", () => {
  const input = utils.getByPlaceholderText('email');
  expect(input).toHaveValue('email');
});
