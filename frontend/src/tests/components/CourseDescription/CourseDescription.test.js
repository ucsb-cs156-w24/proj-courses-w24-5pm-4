import React from 'react';
import { render } from '@testing-library/react';
import CourseDescription from './CourseDescription';

describe('CourseDescription', () => {
  it('renders the course description correctly', () => {
    const description = 'This is a sample course description.';
    const { getByText } = render(<CourseDescription description={description} />);
    expect(getByText(description)).toBeInTheDocument();
  });

  // Add more test cases as needed
});
