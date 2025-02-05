import React from 'react';
import { render } from '@testing-library/react';
import { fireEvent, cleanup } from '@testing-library/react';
import App from '../../App';

afterEach(cleanup);
describe('CalculationForm', () => {
  describe('Gloss Salary input', () => {
    const defaultValue = '0,00';
    it(`Should start with ${defaultValue}`, () => {
      const { getByTestId } = render(<App />);
      const input = getByTestId('gross-salary-input');
      expect(input.value).toBe(defaultValue);
    });
    it(`Shouldn't accept letters`, () => {
      const { getByTestId } = render(<App />);
      const inputValues = ['m', 'te', 's', 'g'];
      const input = getByTestId('gross-salary-input');
      inputValues.forEach((inputValue) => {
        fireEvent.change(input, { target: { value: inputValue } });
        expect(getByTestId('gross-salary-input').value).toBe(defaultValue);
      });
    });
    it('Should auto format the value', () => {
      const { getByTestId } = render(<App />);
      const input = getByTestId('gross-salary-input');
      const inputValues = ['0', '24', '243', '2430'];
      const resultsValues = [defaultValue, '0,24', '2,43', '24,30'];
      inputValues.forEach((inputValue, index) => {
        fireEvent.change(input, { target: { value: inputValue } });
        expect(getByTestId('gross-salary-input').value).toBe(
          resultsValues[index]
        );
      });
    });
  });
  describe('Total Discount input', () => {
    const defaultValue = '0,00';
    it(`Should start with ${defaultValue}`, () => {
      const { getByTestId } = render(<App />);
      const input = getByTestId('total-discount-input');
      expect(input.value).toBe(defaultValue);
    });
    it(`Shouldn't accept letters`, () => {
      const { getByTestId } = render(<App />);
      const input = getByTestId('total-discount-input');
      const inputValues = ['m', 'te', 's', 'g'];
      inputValues.forEach((inputValue) => {
        fireEvent.change(input, { target: { value: inputValue } });
        expect(getByTestId('total-discount-input').value).toBe(defaultValue);
      });
    });
    it('Should auto format the value', () => {
      const { getByTestId } = render(<App />);
      const input = getByTestId('total-discount-input');
      const inputValues = ['0', '24', '243', '2430'];
      const resultsValues = [defaultValue, '0,24', '2,43', '24,30'];
      inputValues.forEach((inputValue, index) => {
        fireEvent.change(input, { target: { value: inputValue } });
        expect(getByTestId('total-discount-input').value).toBe(
          resultsValues[index]
        );
      });
    });
  });
  describe('Dependents number', () => {
    const defaultValue = '0';
    it(`Should start with ${defaultValue}`, () => {
      const { getByTestId } = render(<App />);
      expect(getByTestId('dependents-number-input').value).toBe(defaultValue);
    });
    it(`Shouldn't accept letters`, () => {
      const { getByTestId } = render(<App />);
      const inputValues = ['m', 'te', 's', 'g'];
      inputValues.forEach((inputValue) => {
        fireEvent.change(getByTestId('dependents-number-input'), {
          target: { value: inputValue },
        });
        expect(getByTestId('dependents-number-input').value).toBe(defaultValue);
      });
    });
    it('Should add values directly through the input', () => {
      const { getByTestId } = render(<App />);
      fireEvent.change(getByTestId('dependents-number-input'), {
        target: { value: 10 },
      });
      expect(getByTestId('dependents-number-input').value).toBe('10');
    });
    it('Should add to 1 by clicking on the +', () => {
      const { getByTestId } = render(<App />);
      const addButton = getByTestId('dependents-number-add');
      fireEvent.click(addButton);
      expect(getByTestId('dependents-number-input').value).toBe('1');
    });
    it('Should remove 1 by clicking -', () => {
      const { getByTestId } = render(<App />);
      const addButton = getByTestId('dependents-number-add');
      fireEvent.click(addButton);
      expect(getByTestId('dependents-number-input').value).toBe('1');
      const removeButton = getByTestId('dependents-number-remove');
      fireEvent.click(removeButton);
      expect(getByTestId('dependents-number-input').value).toBe(defaultValue);
    });
  });
});
