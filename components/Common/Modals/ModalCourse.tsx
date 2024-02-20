import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { FormControl, TextField } from "@mui/material";
import useMajor from "@/hooks/Major";
import { getMajorByID } from "@/helpers/api/major";
import useCourse from "@/hooks/Course";
import { getCourseByID } from "@/helpers/api/course";
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

const ModalCourse = (props: Props) => {
  const { open, handleClose, id, action } = props;

  const {
    code,
    setCode,
    setName,
    description,
    setDescription,
    setNoCredit,
    noCredit,
    name,
    createCourse,
    handleUpdateCourse,
    setId,
  } = useCourse();

  const getCourse = async (id) => {
    const data = await getCourseByID(id);
    setId(data?.data?.id);
    setCode(data?.data?.code);
    setName(data?.data?.name);
    setDescription(data?.data?.description);
    setNoCredit(data?.data?.noCredit);
  };
  React.useEffect(() => {
    getCourse(id);
  }, [id]);

  React.useEffect(() => {
    if (action === "create") {
      clearFormData();
    }
  }, [action]);

  const handleSubmit = async (e) => {
    createCourse(e);
    clearFormData();
  };

  const clearFormData = () => {
    setCode("");
    setDescription("");
    setName("");
    setNoCredit(null);
  };

  const handleUpdate = async (e) => {
    handleUpdateCourse(e);
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
                    Course's information
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
                        htmlFor="course-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Course Code:
                      </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                        value={code}
                        disabled={action === "view"}
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </FormControl>
                  </div>

                  <div className="sm:col-span-3">
                    <FormControl fullWidth>
                      <label
                        htmlFor="course-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Course Name:
                      </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                        value={name}
                        disabled={action === "view"}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  <div className="sm:col-span-3">
                    <FormControl fullWidth>
                      <label
                        htmlFor="course-description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Course Desciption:
                      </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                        value={description}
                        disabled={action === "view"}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  <div className="sm:col-span-3">
                    <FormControl fullWidth>
                      <label
                        htmlFor="no-credit"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        No credit:
                      </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="number"
                        variant="outlined"
                        value={noCredit}
                        disabled={action === "view"}
                        onChange={(e) => setNoCredit(parseInt(e.target.value, 10))}
                      />
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

export default ModalCourse;
