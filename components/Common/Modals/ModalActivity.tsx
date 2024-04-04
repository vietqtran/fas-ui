import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useCourse from "@/hooks/Course";
import { getCourseByID } from "@/helpers/api/course";
import useActivity from "@/hooks/Activity";
import { useInstructor } from "@/hooks/Instructor";
import useRoom from "@/hooks/Room";
import { useSlot } from "@/hooks/Slot";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxHeight: "70%",
  overflowY: "auto", // or "scroll"
  bgcolor: "#fff",
  border: "1px solid #ccc",
  p: 4,
  outline: "none",
};
interface Props {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  id: string;
  action: string;
}

const ModalActivity = (props: Props) => {
  const { open, handleClose, id, action } = props;

  const { instructors } = useInstructor();
  const { courses } = useCourse();
  const { rooms } = useRoom();
  const { slots } = useSlot();

  const {
    instructorId,
    setInstructorId,
    date,
    setDate,
    activities,
    setActivities,
    slotId,
    setSlotId,
    roomId,
    setRoomId,
    assignId,
    setAssignId,
    getActivityDetail,
    activityDetail,
    handleUpdateActivity,
    setIdActivityDetail
  } = useActivity();

  const getActivity = async (id) => {
    const data = await getActivityDetail(id);
    setIdActivityDetail(data?.id);
    setInstructorId(data?.instructor?.id);
    setDate(data?.date);
    setSlotId(data?.slot?.id);
    setRoomId(data?.room?.id);
    setAssignId(data?.assign?.id);
  };
  React.useEffect(() => {
    getActivity(id);
  }, [id]);

  const handleUpdate = async (e) => {
    handleUpdateActivity(e);
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold leading-7 text-gray-900">
                    Activity's information
                  </h2>
                  <button
                    className="text-gray-400 hover:text-gray-600 transition duration-200 ease-in-out"
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <FormControl fullWidth className="col-span-3">
                    <InputLabel id="room-label">Room</InputLabel>
                    <Select
                      labelId="room-label"
                      id="room-select"
                      value={roomId}
                      label="Student Group"
                      onChange={(e) => setRoomId(e.target.value)}
                    >
                      {rooms.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.code}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth className="col-span-3">
                    <InputLabel id="slot-label">Slot</InputLabel>
                    <Select
                      labelId="slot-label"
                      id="slot-select"
                      value={slotId}
                      label="Student Group"
                      onChange={(e) => setSlotId(e.target.value)}
                    >
                      {slots.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth className="col-span-3">
                    <InputLabel id="instructor-label">Intructor</InputLabel>
                    <Select
                      labelId="instructor-label"
                      id="instructor-select"
                      value={instructorId}
                      label="Student Group"
                      onChange={(e) => setInstructorId(e.target.value)}
                    >
                      {instructors.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.username}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth className="col-span-3">
                    <TextField
                      size="medium"
                      type="date"
                      value={date}
                      disabled={action === "view"}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </FormControl>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={handleClose}
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              {action != "view" && (
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              )}
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalActivity;
