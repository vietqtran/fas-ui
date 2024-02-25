import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { FormControl, MenuItem, TextField } from "@mui/material";
import useGrade from "@/hooks/Grade";
import useMajor from "@/hooks/Major";
import useStudent from "@/hooks/Student";
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

const ModalGrade = (props: Props) => {
  const { open, handleClose, id, action } = props;

  const {
    code,
    setCode,
    addGrade,
    handleUpdateGrade,
    getGrade,
    setId,
    majorId,
    setMajorId,
    campusId,
    setCampusId
  } = useGrade();
  const { majors } = useMajor();
  const {campuses} = useStudent();
  const getGradeById = async (id) => {
    const data = await getGrade(id);
    console.log(data);
    setId(data?.id);
    setCode(data?.code);
    setMajorId(data?.major?.id);
    setCampusId(data?.campus?.id);
  };
  React.useEffect(() => {
    getGradeById(id);
  }, [id]);

  React.useEffect(() => {
    if (action === "create") {
      clearFormData();
    }
  }, [action]);

  const handleSubmit = async (e) => {
    addGrade(e);
    clearFormData();
  };

  const clearFormData = () => {
    setCode("");
    setMajorId("");
    setCampusId("");
  };

  const handleUpdate = async (e) => {
    handleUpdateGrade(e);
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
                    Grade's information
                  </h2>
                  <button
                    className="text-gray-400 hover:text-gray-600 transition duration-200 ease-in-out"
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label
                        htmlFor="grade-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Grade Name:
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

                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label
                        htmlFor="major"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Major
                      </label>
                      <TextField
                        className="mt-2"
                        select
                        size="small"
                        value={majorId}
                        disabled={action === "view"}
                        onChange={(e) => setMajorId(e.target.value)}
                      >
                        {majors &&
                          majors.map((item, index) => (
                            <MenuItem
                              key={item.id}
                              value={item.id}
                              selected={code == item.id}
                            >
                              {item.name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </FormControl>
                  </div>

                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label
                        htmlFor="campus"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Campus
                      </label>
                      <TextField
                        className="mt-2"
                        select
                        size="small"
                        value={campusId}
                        disabled={action === "view"}
                        onChange={(e) => setCampusId(e.target.value)}
                      >
                        {campuses &&
                          campuses.map((item, index) => (
                            <MenuItem
                              key={item.id}
                              value={item.id}
                              selected={code == item.id}
                            >
                              {item.name}
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

export default ModalGrade;
