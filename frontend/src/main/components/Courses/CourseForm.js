import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PersonalScheduleDropdown from "../PersonalSchedules/PersonalScheduleDropdown";
import { useBackend } from "main/utils/useBackend";

function CourseForm({ initialCourse, submitAction, buttonLabel = "Create" }) {
  // Stryker disable all
  const yyyyq_regex = /((19)|(20))\d{2}[1-4]/i;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: initialCourse || {} });
  // Stryker restore all

  const navigate = useNavigate();

  const {
    data: schedules,
    error: _error,
    status: _status,
  } = useBackend(
    // Stryker disable next-line all : don't test internal caching of React Query
    ["/api/personalschedules/all"],
    // Stryker disable next-line all : don't test internal caching of React Query
    { method: "GET", url: "/api/personalschedules/all" },
    [],
  );

  // Stryker disable all : not sure how to test/mock local storage
  const localSchedule = localStorage.getItem("CourseForm-psId");
  const [schedule, setSchedule] = useState(localSchedule || "");
  if (schedule) {
    localStorage.setItem("CourseForm-psId", schedule);
  }
  // Stryker restore all

  useEffect(() => {
    if (schedules && schedules.length > 0 && !localSchedule) {
      setSchedule(schedules[0].id);
      // Stryker disable all : not sure how to test/mock local storage
      localStorage.setItem("CourseForm-psId", schedules[0].id);
      // Stryker restore all
    }
  }, [schedules, localSchedule]);

  return (
    <Form onSubmit={handleSubmit(submitAction)}>
      {initialCourse && (
        <Form.Group className="mb-3">
          <Form.Label htmlFor="id">Id</Form.Label>
          <Form.Control
            data-testid="CourseForm-id"
            id="id"
            type="text"
            {...register("id")}
            value={initialCourse.id}
            disabled
          />
        </Form.Group>
      )}

      <Form.Group className="mb-3">
        <Form.Label htmlFor="courseName">Course Name</Form.Label>
        <Form.Control
          data-testid="CourseForm-courseName"
          id="courseName"
          type="text"
          isInvalid={Boolean(errors.courseName)}
          {...register("courseName", {
            required: "Course Name is required.",
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.courseName?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="enrollCd">Enrollment Code</Form.Label>
        <Form.Control
          data-testid="CourseForm-enrollCd"
          id="enrollCd"
          type="text"
          isInvalid={Boolean(errors.enrollCd)}
          {...register("enrollCd", {
            required: "Enroll Code is required.",
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.enrollCd?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" data-testid="CourseForm-psId">
        <PersonalScheduleDropdown
          schedules={schedules}
          schedule={schedule}
          setSchedule={setSchedule}
          controlId={"CourseForm-psId"}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="schduleName">Schdule Name</Form.Label>
        <Form.Control
          data-testid="CourseForm-schduleName"
          id="schduleName"
          type="text"
          isInvalid={Boolean(errors.enrollCd)}
          {...register("schduleName", {
            required: "Schdule Name is required.",
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.courseName?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="quarter">Quarter</Form.Label>
        <Form.Control
          data-testid="CourseForm-quarter"
          id="quarter"
          type="text"
          isInvalid={Boolean(errors.quarter)}
          {...register("quarter", { required: true, pattern: yyyyq_regex })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.quarter && "Quarter is required."}
          {errors.quarter?.type === "pattern" &&
            "Quarter must be in the format YYYYQ, e.g. 20224 for Fall 2022"}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" data-testid="CourseForm-submit">
        {buttonLabel}
      </Button>
      <Button
        variant="Secondary"
        onClick={() => navigate(-1)}
        data-testid="CourseForm-cancel"
      >
        Cancel
      </Button>
    </Form>
  );
}

export default CourseForm;
