import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
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
}

export default function ModalInstructor(props: Props) {
  const { open, handleClose } = props;

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
                    Instructor's information
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
                      <label>Email: </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </div>

                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label>Email: </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </div>

                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label>Email: </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </div>
                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label>Email: </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </div>
                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label>Email: </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </div>
                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label>Email: </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </div>

                  <div className="sm:col-span-3">
                    <FormControl fullWidth>
                      <label>Email: </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </div>

                  <div className="sm:col-span-3">
                    <FormControl fullWidth>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <TextField
                        className="mt-2"
                        select
                        size="small"
                        SelectProps={{
                          value: "",
                        }}
                        onChange={(e) => {}}
                      >
                        <MenuItem value="option1">Option 1</MenuItem>
                        <MenuItem value="option2">Option 2</MenuItem>
                        <MenuItem value="option3">Option 3</MenuItem>
                      </TextField>
                    </FormControl>
                  </div>

                  <div className="col-span-full">
                    <FormControl fullWidth>
                      <label>Email: </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <FormControl fullWidth>
                      <label>Email: </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </div>

                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label>Email: </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                        defaultValue="Outlined"
                      />
                    </FormControl>
                  </div>

                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label>Email: </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
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
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
