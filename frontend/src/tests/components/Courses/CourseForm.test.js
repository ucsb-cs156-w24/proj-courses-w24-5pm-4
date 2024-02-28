import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import CourseForm from "main/components/Courses/CourseForm";
import { coursesFixtures } from "fixtures/pscourseFixtures";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("CourseForm tests", () => {
  test("renders correctly", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CourseForm />
        </Router>
      </QueryClientProvider>,
    );

    expect(await screen.findByText(/Schedule/)).toBeInTheDocument();
    expect(screen.getByText(/Enrollment Code/)).toBeInTheDocument();
    expect(screen.getByText(/Course Name/)).toBeInTheDocument();
    expect(screen.getByText(/Schdule Name/)).toBeInTheDocument();
    expect(screen.getByText(/Quarter/)).toBeInTheDocument();
    expect(screen.getByText(/Create/)).toBeInTheDocument();
  });

  test("renders correctly when passing in a Course", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CourseForm initialCourse={coursesFixtures.oneCourse} />
        </Router>
      </QueryClientProvider>,
    );

    expect(await screen.findByTestId(/CourseForm-id/)).toBeInTheDocument();
    expect(screen.getByText(/Id/)).toBeInTheDocument();
    expect(screen.getByTestId(/CourseForm-id/)).toHaveValue("27");
  });

  test("Correct Error messages on missing input", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CourseForm />
        </Router>
      </QueryClientProvider>,
    );
    expect(await screen.findByTestId("CourseForm-submit")).toBeInTheDocument();
    const submitButton = screen.getByTestId("CourseForm-submit");

    fireEvent.click(submitButton);

    expect(
      await screen.findByText(/Enroll Code is required./),
    ).toBeInTheDocument();
    screen.getByText(/Course Name is required./);
    screen.getByText(/Schdule Name is required/);
    screen.getByText(/Quarter is required./);
  });
  test("No Error messages on good input", async () => {
    const mockSubmitAction = jest.fn();
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CourseForm submitAction={mockSubmitAction} />
        </Router>
      </QueryClientProvider>,
    );

    expect(await screen.findByTestId("CourseForm-psId")).toBeInTheDocument();

    const psId = document.querySelector("#CourseForm-psId");
    const enrollCd = screen.getByTestId("CourseForm-enrollCd");
    const courseName = screen.getByTestId("CourseForm-courseName");
    const schduleName = screen.getByTestId("CourseForm-schduleName");
    const quarter = screen.getByTestId("CourseForm-quarter");
    const submitButton = screen.getByTestId("CourseForm-submit");

    fireEvent.change(psId, { target: { value: 13 } });
    fireEvent.change(enrollCd, { target: { value: "20124" } });
    fireEvent.change(courseName, { target: { value: "MATH" } });
    fireEvent.change(schduleName, { target: { value: "cgaucho's schdule" } });
    fireEvent.change(quarter, { target: { value: 20222 } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

    expect(
      screen.queryByText(/Personal Schedule ID is required./),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Enroll Code is required./),
    ).not.toBeInTheDocument();
    expect(enrollCd).toHaveValue("20124");
  });

  test("that navigate(-1) is called when Cancel is clicked", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CourseForm />
        </Router>
      </QueryClientProvider>,
    );
    expect(await screen.findByTestId("CourseForm-cancel")).toBeInTheDocument();
    const cancelButton = screen.getByTestId("CourseForm-cancel");

    fireEvent.click(cancelButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
  });
});

test("Correct Error messsages on bad input", async () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <CourseForm />
      </Router>
    </QueryClientProvider>,
  );
  await screen.findByTestId("CourseForm-quarter");
  const quarterField = screen.getByTestId("CourseForm-quarter");
  const submitButton = screen.getByTestId("CourseForm-submit");

  fireEvent.change(quarterField, { target: { value: "bad-input" } });

  fireEvent.click(submitButton);

  await screen.findByText(
    /Quarter must be in the format YYYYQ, e.g. 20224 for Fall 2022/,
  );
});

// test("that the correct validations are performed", async () => {
//   const queryClient = new QueryClient();
//   render(
//       <QueryClientProvider client={queryClient}>
//           <Router>
//               <CourseForm />
//           </Router>
//       </QueryClientProvider>
//   );

//   expect(await screen.findByText(/Create/)).toBeInTheDocument();
//   const submitButton = screen.getByText(/Create/);
//   fireEvent.click(submitButton);

// expect(await screen.findByTestId("CourseForm-submit")).toBeInTheDocument();
// const submitButton = screen.getByTestId("CourseForm-submit");

// fireEvent.click(submitButton);

// expect(
//   // await screen.findByText(/Course Name is required./),
//   await screen.findByText(/Enroll Code is required./),
//   // screen.getByText(/Schdule Name is required/),
//   // screen.getByText(/Quarter is required./),
// ).toBeInTheDocument();
// await screen.getByText(/Course Name is required./).toBeInTheDocument();

// await screen.findByText(/Course Name is required./);
// expect(screen.getByText(/Enroll Code is required./)).toBeInTheDocument();

// const nameInput = screen.getByTestId(`${testId}-name`);
// fireEvent.change(nameInput, { target: { value: "a".repeat(31) } });
// fireEvent.click(submitButton);

// await waitFor(() => {
//     expect(screen.getByText(/Max length 30 characters/)).toBeInTheDocument();
// });
// });
