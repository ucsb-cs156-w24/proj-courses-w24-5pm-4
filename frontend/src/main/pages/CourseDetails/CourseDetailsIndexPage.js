import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import _BasicCourseTable from "main/components/Courses/BasicCourseTable";
import { useParams } from "react-router-dom";
import { useBackend, _useBackendMutation } from "main/utils/useBackend";
import CourseDetailsTable from "main/components/CourseDetails/CourseDetailsTable";
import { yyyyqToQyy } from "main/utils/quarterUtilities";
import CourseDescription from "./CourseDescription"; // Import the CourseDescription component

export default function CourseDetailsIndexPage() {
  let { qtr, enrollCode } = useParams();
  const {
    data: moreDetails,
    error,
    status,
  } = useBackend(
    [`/api/sections/sectionsearch?qtr=${qtr}&enrollCode=${enrollCode}`],
    {
      method: "GET",
      url: `/api/sections/sectionsearch`,
      params: {
        qtr,
        enrollCode,
      },
    },
  );

  const {
    data: CourseDescription,
    error: descriptionError,
    status: descriptionStatus,
  } = useBackend(
    [`/api/course/descriptions?courseId=${moreDetails?.courseId}`],
    {
      method: "GET",
      url: `/api/course/descriptions`,
      params: {
        courseId: moreDetails?.courseId,
      },
    },
  );

  return (
    <BasicLayout>
      <div className="pt-2">
        {status === "loading" || descriptionStatus === "loading" && <p>Loading...</p>}
        {status === "error" && <p>Error: {error.message}</p>}
        {descriptionStatus === "error" && <p>Error: {descriptionError.message}</p>}
        {status === "success" && descriptionStatus === "success" && (
          <>
            {moreDetails && moreDetails.courseId && (
              <h5>
                Course Details for {moreDetails.courseId} {yyyyqToQyy(qtr)}!
              </h5>
            )}
            {moreDetails && courseDescription && (
              <div>
                <CourseDescription description={CourseDescription} />
                <CourseDetailsTable details={[moreDetails]} />
              </div>
            )}
          </>
        )}
      </div>
    </BasicLayout>
  );
}