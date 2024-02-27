import React from "react";

import CourseDetailsIndexPage from "main/pages/CourseDetails/CourseDetailsIndexPage";

export default {
  title: "pages/CourseDetails/CourseDetailsIndexPage",
  component: CourseDetailsIndexPage,
  parameters: {
    qtr: "20221",
    enrollCode: "06619",
  },
};

const Template = (args) => <CourseDetailsIndexPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  moreDetails: {
    courseId: "CS101",
    courseDescription: "This is a sample course description.",
    // Add other relevant data for moreDetails as needed
  },
};
