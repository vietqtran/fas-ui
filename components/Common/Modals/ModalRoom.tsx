import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { FormControl, MenuItem, TextField } from "@mui/material";
import useBuilding from "@/hooks/Building";
import useStudent from "@/hooks/Student";
import useRoom from "@/hooks/Room";
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

const ModalRoom = (props: Props) => {
  const { open, handleClose, id, action } = props;

  const [information, setInformation] = React.useState<any>();

  const {
    code,
    setCode,
    buildingId,
    setBuildingId,
    addRoom,
    handleUpdateRoom,
    setId,
    getRoom,
  } = useRoom();

  const { campuses } = useStudent();

  const { buildings } = useBuilding();

  const getInformationRoom = async (id) => {
    const data = await getRoom(id);
    setInformation(data);
    setId(data?.id);
    setCode(data?.code);
    setBuildingId(data?.building?.id);
  };
  React.useEffect(() => {
    getInformationRoom(id);
  }, [id]);

  React.useEffect(() => {
    if (action === "create") {
      clearFormData();
    }
  }, [action]);

  const handleSubmit = async (e) => {
    const data = await addRoom(e);
    clearFormData();
  };

  const clearFormData = () => {
    setCode("");
    setBuildingId("");
  };

  const handleUpdate = async (e) => {
    handleUpdateRoom(e);
  };

  const handleCloseModal = () => {
    setCode(information?.code);
    setBuildingId(information?.building?.id);
    handleClose();
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
                    Room's information
                  </h2>
                  <button
                    className="text-gray-400 hover:text-gray-600 transition duration-200 ease-in-out"
                    onClick={handleCloseModal}
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <FormControl fullWidth>
                      <label
                        htmlFor="campus"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Bulding
                      </label>
                      <TextField
                        className="mt-2"
                        select
                        size="small"
                        value={buildingId}
                        onChange={(e) => setBuildingId(e.target.value)}
                      >
                        {buildings &&
                          buildings.map((item, index) => (
                            <MenuItem
                              key={item.id}
                              value={item.id}
                              selected={buildingId == item.id}
                            >
                              {item.name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </FormControl>
                  </div>
                  <div className="sm:col-span-3">
                    <FormControl fullWidth>
                      <label
                        htmlFor="building-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Room Code:
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

export default ModalRoom;
