import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { FormControl, MenuItem, TextField } from "@mui/material";
import useCourse from "@/hooks/Course";
import { getCourseByID } from "@/helpers/api/course";
import useAssignFeedBack from "@/hooks/AssignFeedBack";
import { getAssignFeedBackByID } from "@/helpers/api/assignFeedBack";
import { useInstructor } from "@/hooks/Instructor";
import useGrade from "@/hooks/Grade";
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

const ModalAssignFeedBack = (props: Props) => {
  const { open, handleClose, id, action } = props;

  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    instructorId,
    setInstructorId,
    gradeId,
    setGradeId,
    addAssign,
    handleUpdateAssignFeedBack,
    setIdAssignFeedBack,
    getAssignFeedBack,
  } = useAssignFeedBack();

  const { instructors } = useInstructor();
  const { grades } = useGrade();
  const getAssignFeedBackByID = async (id) => {
    const data = await getAssignFeedBack(id);
    setIdAssignFeedBack(data?.id);
    setStartDate(data?.startDate.split("T")[0]);
    setEndDate(data?.endDate.split("T")[0]);
    setInstructorId(data?.instructor?.id);
    setGradeId(data?.grade?.id);
  };
  React.useEffect(() => {
    getAssignFeedBackByID(id);
  }, [id]);

  React.useEffect(() => {
    if (action === "create") {
      clearFormData();
    }
  }, [action]);

  const handleSubmit = async (e) => {
    addAssign(e);
    clearFormData();
  };

  const clearFormData = () => {
    setIdAssignFeedBack("");
    setStartDate("");
    setEndDate("");
    setInstructorId("");
    setGradeId("");
  };

  const handleUpdate = async (e) => {
    handleUpdateAssignFeedBack(e);
  };

  console.log(instructors, grades);

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
                    FeedBack's information
                  </h2>
                  <button
                    className="text-gray-400 hover:text-gray-600 transition duration-200 ease-in-out"
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <FormControl fullWidth>
                      <label
                        htmlFor="Start-Date"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Start Date:
                      </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="date"
                        variant="outlined"
                        value={startDate}
                        disabled={action === "view"}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  <div className="sm:col-span-3">
                    <FormControl fullWidth>
                      <label
                        htmlFor="end-date"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        End Date:
                      </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="date"
                        variant="outlined"
                        value={endDate}
                        disabled={action === "view"}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  <div className="sm:col-span-3">
                    <FormControl fullWidth>
                      <label
                        htmlFor="instructor"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Instructor:
                      </label>
                      <TextField
                        className="mt-2"
                        select
                        size="small"
                        value={instructorId}
                        disabled={action === "view"}
                        onChange={(e) => setInstructorId(e.target.value)}
                      >
                        {instructors &&
                          instructors.map((item, index) => (
                            <MenuItem
                              key={item.id}
                              value={item.id}
                              selected={instructorId == item.id}
                            >
                              {item.username}
                            </MenuItem>
                          ))}
                      </TextField>
                    </FormControl>
                  </div>
                  <div className="sm:col-span-3">
                    <FormControl fullWidth>
                      <label
                        htmlFor="grade"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Grade:
                      </label>
                      <TextField
                        className="mt-2"
                        select
                        size="small"
                        value={gradeId}
                        disabled={action === "view"}
                        onChange={(e) => setGradeId(e.target.value)}
                      >
                        {grades &&
                          grades.map((item, index) => (
                            <MenuItem
                              key={item.id}
                              value={item.id}
                              selected={gradeId == item.id}
                            >
                              {item.code}
                            </MenuItem>
                          ))}
                      </TextField>
                    </FormControl>
                  </div>
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
                  onClick={id ? handleUpdate : handleSubmit}
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

export default ModalAssignFeedBack;
