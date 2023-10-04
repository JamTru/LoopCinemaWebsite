import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import SignInModal from '../modals/SignUpModal.js';

let container;
let utils;

//Before each test, render the component in a test environment.
beforeEach(() =>{
  function dummyFunction() {return};
  utils = render(
    <ReviewFormModal show={true} />
  );
  container = utils.container;
});

//Tests to see whether the component itself renders properly within the HTML Document
test("Renders Sign Up Form Properly", () => {
  expect(container).toBeInTheDocument();
});
