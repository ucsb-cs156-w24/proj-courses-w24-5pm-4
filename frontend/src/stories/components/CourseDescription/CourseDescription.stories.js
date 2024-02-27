import React from 'react';
import { storiesOf } from '@storybook/react';
import CourseDescription from '../components/CourseDescription'; // Update the path to your CourseDescription component

// Define a default course description
const defaultDescription = 'This is a sample course description.';

storiesOf('CourseDescription', module)
  .add('Default', () => <CourseDescription description={defaultDescription} />)
  .add('Long Description', () => (
    <CourseDescription
      description={
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi sed neque suscipit auctor nec id justo. Nulla facilisi. Maecenas a magna mi. Proin nec urna nec tellus tincidunt luctus. Aliquam erat volutpat. In id justo non lorem tincidunt cursus. Sed id felis sed massa interdum consectetur. Donec at lectus sit amet velit vehicula placerat eget sit amet nunc. Mauris auctor hendrerit arcu, in pellentesque orci lobortis nec.'
      }
    />
  ));
