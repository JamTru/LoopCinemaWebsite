import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import ReviewFormModal from '../modals/ReviewFormModal.js';

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
test("Renders Review Form Properly", () => {
  expect(container).toBeInTheDocument();
});

//Tests to see whether the numRating Input will return an invalid response given an empty input
test("Detects Empty Response in NumRating Input via Required Tag", () => {
    const input = utils.getByLabelText('Rate from 0 to 100');
    expect(input).toBeInvalid();
});

//Tests to see whether the numRating Input will return a valid response given a valid input
test("Detects Valid Input in NumRating", () => {
    const input = utils.getByLabelText('Rate from 0 to 100');
    fireEvent.change(input, {target: {value: '50'}})
    expect(input).toBeValid();
});

//Tests to see whether the numRating Input will return an invalid response given an input below the minimum 0
test("Detects Invalid Input in NumRating given number below 0", () => {
    const input = utils.getByLabelText('Rate from 0 to 100');
    fireEvent.change(input, {target: {value: '-1'}})
    expect(input).toBeInvalid();
});

//Tests to see whether the numRating Input will return an invalid response given an input above the maximum 100
test("Detects Invalid Input in NumRating given number below 0", () => {
    const input = utils.getByLabelText('Rate from 0 to 100');
    fireEvent.change(input, {target: {value: '101'}})
    expect(input).toBeInvalid();
});
//Tests the required HTML tag of the text area input to ensure empty string cannot be submitted
test("Detects Empty String in Comment input", () => {
    const input = document.querySelector('textarea[name="comments"]');
    expect(input).toBeInvalid();
  });
