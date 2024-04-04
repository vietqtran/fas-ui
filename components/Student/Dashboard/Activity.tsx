import { auth } from "@/helpers/firebase";
import { RootState } from "@/helpers/redux/reducers";
import useAssignsChedule from "@/hooks/AssignSchedule";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

interface Props {
  activity: any;
}

const Activity = ({ activity }: Props) => {
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
        <strong className="text-blue-500 group-hover:underline">
          {assignSchedule?.course?.code}
        </strong>
      </div>
      <div>
        <span>at {activity?.room?.code}</span>
      </div>
      <div>
        (
        <span className="text-green-500">
          {activity.attendances.filter(
            (attendance) => attendance?.student?.id === user?.student?.id
          )[0].status ? (
            <span className="text-green-500">present</span>
          ) : (
            <span className="text-red-500">absent</span>
          )}
        </span>
        )
      </div>
    </div>
  );
};

export default Activity;
