import React from "react";
import { useBackend } from "main/utils/useBackend";

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CourseTable from "main/components/Courses/CourseTable";
import { useCurrentUser } from "main/utils/currentUser";
import { Button } from "react-bootstrap";

export default function CoursesIndexPage() {
  //Stryker disable StringLiteral, ObjectLiteral, BlockStatement
  const currentUser = useCurrentUser();

  const {
    data: courses,
    error: _error,
    status: _status,
  } = useBackend(
    // Stryker disable next-line all : don't test internal caching of React Query
    ["/api/courses/user/all"],
    {
      // Stryker disable next-line StringLiteral : GET is default, so replacing with "" is an equivalent mutation
      method: "GET",
      url: "/api/courses/user/all",
    },
    [],
  );
  const createButton = () => {
    // if (hasRole(currentUser, "ROLE_ADMIN")) {
    return (
      <Button
        variant="primary"
        href="/courses/create"
        data-testid="appnavbar-courses-create"
        style={{ float: "right" }}
      >
        Add Course
      </Button>
    );
    // }
  };

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Courses</h1>
        <CourseTable courses={courses} currentUser={currentUser} />
        {createButton()}
      </div>
    </BasicLayout>
  );
}
