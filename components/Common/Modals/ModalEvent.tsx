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
import useMajor from "@/hooks/Major";
import { getMajorByID } from "@/helpers/api/major";
import useEvent from "@/hooks/Event";
import { getEventByID } from "@/helpers/api/event";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
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

export default function ModalEvent(props: Props) {
  const { open, handleClose, id, action } = props;
  const [previewImage, setPreviewImage] = React.useState("");
  const {
    image,
    fetchEvent,
    url,
    setImageEvent,
    setUrlEvent,
    createEvent,
    handleUpdateEvent,
    setId,
  } = useEvent();

  const getEvent = async (id) => {
    const data = await getEventByID(id);
    setId(data?.data?.id);
    setImageEvent(data?.data?.image);
    setUrlEvent(data?.data?.url);
  };
  React.useEffect(() => {
    getEvent(id);
  }, [id]);

  React.useEffect(() => {
    if (action === "create") {
      clearFormData();
    }
  }, [action]);

  const handleSubmit = async (e) => {
    createEvent(e);
    clearFormData();
  };

  const clearFormData = () => {
    setImageEvent("");
    setUrlEvent("");
  };

  const handleUpdate = async (e) => {
    handleUpdateEvent(e);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const upload = await uploadToCloudinary(e.target.files[0], "image");
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setImageEvent(upload);
    }
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
                    Event's information
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
                        htmlFor="major-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Image:{" "}
                      </label>
                      <input
                        type="file"
                        accept="image/*" // Limit file types to images
                        onChange={handleImageUpload} // Handle file upload in a function // Hide the input visually
                        id="upload-image-input" // Assign an ID for the label to refer to
                        className="block w-full text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </FormControl>
                    {image && (
                      <div className="col-span-full">
                        <img src={image} width={180} height={200} />
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-3">
                    <FormControl fullWidth>
                      <label
                        htmlFor="major-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Url:{" "}
                      </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                        value={url}
                        disabled={action === "view"}
                        onChange={(e) => setUrlEvent(e.target.value)}
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
}
