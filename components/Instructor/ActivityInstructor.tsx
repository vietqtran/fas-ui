import { auth } from "@/helpers/firebase";
import { RootState } from "@/helpers/redux/reducers";
import useAssignsChedule from "@/hooks/AssignSchedule";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

interface Props {
  activity: any;
}

const ActivityInstructor = ({ activity }: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { getAssignSchdule, assignSchedule, setAssignSchedule } =
    useAssignsChedule();

  const getData = async (id) => {
    const data = await getAssignSchdule(id);
    setAssignSchedule(data);
  };

  useEffect(() => {
    getData(activity?.assign?.id);
  }, [activity]);

  return (
    <div className="group text-center">
      <div>
        <Link href={`/attendStudent/${activity.id}`}>
          <strong className="text-blue-500 hover:cursor-pointer">
            {assignSchedule?.course?.code}
          </strong>
        </Link>
      </div>
      <div>
        <span>at {activity?.room?.code}</span>
      </div>
      <div>
        <Link href={`/classAttendance/term/${assignSchedule?.term?.id}/course/${assignSchedule?.course?.id}/class/${assignSchedule?.grade?.id}`}>
          <span className="font-semibold italic hover:cursor-pointer">
            {assignSchedule?.grade?.code}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ActivityInstructor;
