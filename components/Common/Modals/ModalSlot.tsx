import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { FormControl, TextField } from "@mui/material";
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

const ModalSlot = (props: Props) => {
  const { open, handleClose, id, action } = props;

  const {
    name,
    setName,
    startAt,
    setStartAt,
    endAt,
    setEndAt,
    createSlot,
    getSlot,
    updateSlotById,
    setId,
  } = useSlot();

  const fetchSlot = async (id) => {
    const data = await getSlot(id);
    setId(data?.id);
    setName(data?.name);
    setStartAt(data?.startAt.split("T")[0]);
    setEndAt(data?.endAt.split("T")[0]);
  };

  React.useEffect(() => {
    fetchSlot(id);
  }, [id]);

  React.useEffect(() => {
    if (action === "create") {
      clearFormData();
    }
  }, [action]);

  const handleSubmit = async (e) => {
    createSlot(e);
    clearFormData();
  };

  const clearFormData = () => {
    setName("");
    setStartAt("");
    setEndAt("");
  };

  const handleUpdate = async (e) => {
    await updateSlotById(e);
    // Update the slot information locally
    const updatedSlot = await getSlot(id);
    setId(updatedSlot.id);
    setName(updatedSlot.name);
    setStartAt(updatedSlot.startAt.split("T")[0]);
    setEndAt(updatedSlot.endAt.split("T")[0]);
  };

  console.log(startAt, endAt);
  

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
                    Slot's information
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
                        htmlFor="term-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Slot Name:
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

                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label
                        htmlFor="start-at"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Start Date:
                      </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="time"
                        variant="outlined"
                        value={startAt}
                        disabled={action === "view"}
                        onChange={(e) => setStartAt(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label
                        htmlFor="end-at"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        End Date:
                      </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="time"
                        variant="outlined"
                        value={endAt}
                        disabled={action === "view"}
                        onChange={(e) => setEndAt(e.target.value)}
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

export default ModalSlot;
