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

import { useInstructor } from "@/hooks/Instructor";
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

export default function ModalInstructor(props: Props) {
  const { open, handleClose, id, action } = props;
  const [image, setImage] = React.useState("");

  React.useEffect(() => {
    if (id) {
      getInstructor();
    }
  }, [id]);

  const getInstructor = async () => {
    let data = await fetchInstructor(id);
    setId(data?.id);
    setFirstName(data?.firstName);
    setMiddleName(data?.middleName);
    setLastName(data?.lastName);
    setBirthDay(data?.birthDay.split("T")[0]);
    setPhone(data?.phone);
    setEmail(data?.email);
    setUsername(data?.username);
    setAddress(data?.address);
    setCampusId(data?.campus?.id);
    setProfileImage(data?.profileImage);
    setImage(data?.profileImage);
    setGender(data?.gender);
    setIdCard(data?.idCard);
  };
  React.useEffect(() => {
    if (action === "create") {
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setBirthDay("");
      setPhone("");
      setEmail("");
      setUsername("");
      setAddress("");
      setCampusId("");
      setProfileImage("");
      setImage("");
      setGender(true);
      setIdCard("");
    }
  }, [action]);

  const {
    setId,
    firstName,
    setFirstName,
    middleName,
    setMiddleName,
    lastName,
    setLastName,
    phone,
    setPhone,
    email,
    setEmail,
    birthDay,
    setBirthDay,
    username,
    setUsername,
    address,
    setAddress,
    campusId,
    setCampusId,
    profileImage,
    setProfileImage,
    campuses,
    setCampuses,
    handleCreateInstructor,
    handleUpdateInstructor,
    fetchInstructor,
    gender,
    setGender,
    idCard,
    setIdCard,
  } = useInstructor();

  console.log(campusId);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const upload = await uploadToCloudinary(e.target.files[0], "image");
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setProfileImage(upload);
  };

  const handleSubmit = async (e) => {
    handleCreateInstructor(e);
  };

  const handleUpdate = async (e) => {
    handleUpdateInstructor(e);
  };

  console.log(campuses);
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
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First Name:
                      </label>
                      <TextField
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </div>

                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label
                        htmlFor="middle-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Middle Name:{" "}
                      </label>
                      <TextField
                        onChange={(e) => setMiddleName(e.target.value)}
                        value={middleName}
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </div>

                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last Name:{" "}
                      </label>
                      <TextField
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </div>
                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label
                        htmlFor="birth-day"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Birth Day:{" "}
                      </label>
                      <TextField
                        onChange={(e) => setBirthDay(e.target.value)}
                        value={birthDay}
                        size="small"
                        className="mt-2"
                        type="date"
                        variant="outlined"
                      />
                    </FormControl>
                  </div>
                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label
                        htmlFor="card-id"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Card ID:{" "}
                      </label>
                      <TextField
                        onChange={(e) => setIdCard(e.target.value)}
                        value={idCard}
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </div>
                  <div className="sm:col-span-1">
                    <FormControl fullWidth>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Gender:{" "}
                      </label>
                      <TextField
                        className="mt-2"
                        select
                        size="small"
                        value={gender}
                        disabled={action === "view"}
                        onChange={(e) =>
                          setGender(e.target.value === "true" ? true : false)
                        }
                      >
                        <MenuItem value="true" selected={gender == true}>
                          Male
                        </MenuItem>
                        <MenuItem value="false" selected={gender == false}>
                          Female
                        </MenuItem>
                      </TextField>
                    </FormControl>
                  </div>
                  <div className="sm:col-span-1">
                    <FormControl fullWidth>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone:{" "}
                      </label>
                      <TextField
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </div>
                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >

                        Email Address:{" "}
                      </label>
                      <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </div>


                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Username:{" "}
                      </label>
                      <TextField
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                      />
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
                        onChange={(e) => {
                          setCampusId(e.target.value);
                        }}
                      >
                        {campuses?.map((campus) => (
                          <MenuItem
                            key={campus.id}
                            selected={campusId == campus.id}
                            value={campus.id}
                          >
                            {campus.location}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </div>

                  <div className="col-span-full">
                    <FormControl fullWidth>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Address:{" "}
                      </label>
                      <TextField
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        size="small"
                        className="mt-2"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Photo
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        id="upload-image-input"
                        className="block w-full text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {image && (
                    <div className="col-span-full">
                      <img src={image} width={180} height={200} />
                    </div>
                  )}
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
                onClick={id ? handleUpdate : handleSubmit}
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
