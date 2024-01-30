"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import useMajor from "@/hooks/Major";

import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { FormControl, MenuItem, TextField } from "@mui/material";
import useStudent from "@/hooks/Student";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "70%", // Set height to 100%
  overflowY: "auto",
  bgcolor: "#fff",
  boxShadow: 24,
  p: 4,
};
interface Props {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  id: string;
  action: string;
}

export default function ModalStudent(props: Props) {
  const { open, handleClose, id, action } = props;
  const { majors } = useMajor();
  const [image, setImage] = React.useState("");

  const {
    firstName,
    setFirstName,
    middleName,
    setMiddleName,
    lastName,
    setLastName,
    birthDay,
    setBirthDay,
    phone,
    setPhone,
    majorId,
    setMajorId,
    email,
    setEmail,
    studentCode,
    setStudentCode,
    username,
    setUsername,
    address,
    setAddress,
    profileImage,
    setProfileImage,
    createStudent,
    fetchStudents,
    getStudent,
    setId,
    handleUpdateStudent,
    campusId,
    setCampusId,
    campuses,
    idcard,
    setIdCard,
    gender,
    setGender,
  } = useStudent();

  const getStudentById = async (id) => {
    const data = await getStudent(id);
    setId(data?.id);
    setFirstName(data?.firstName);
    setMiddleName(data?.middleName);
    setLastName(data?.lastName);
    setBirthDay(data?.birthDay.split("T")[0]);
    setPhone(data?.phone);
    setMajorId(data?.major.id);
    setEmail(data?.email);
    setStudentCode(data?.studentCode);
    setUsername(data?.username);
    setAddress(data?.address);
    setProfileImage(data?.profileImage);
    setImage(data?.profileImage);
    setCampusId(data?.campus.id);
    setIdCard(data?.idcard);
    setGender(data?.gender);
  };
  React.useEffect(() => {
    getStudentById(id);
  }, [id]);

  React.useEffect(() => {
    if (action === "create") {
      clearFormData();
    }
  }, [action]);

  const clearFormData = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setBirthDay("");
    setPhone("");
    setMajorId("");
    setEmail("");
    setStudentCode("");
    setUsername("");
    setAddress("");
    setProfileImage("");
    setImage("");
    setCampusId("");
    setIdCard("");
    setGender(Boolean);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const upload = await uploadToCloudinary(e.target.files[0], "image");
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setProfileImage(upload);
    }
  };

  const handleSubmit = async (e) => {
    createStudent(e);
  };

  const handleUpdate = async (e) => {
    handleUpdateStudent(e);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Student Information
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First Name
                      </label>

                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        value={firstName}
                        disabled={action === "view"}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </FormControl>
                  </div>

                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label
                        htmlFor="middle-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Middle Name
                      </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        value={middleName}
                        disabled={action === "view"}
                        onChange={(e) => setMiddleName(e.target.value)}
                      />
                    </FormControl>
                  </div>

                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last Name
                      </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        value={lastName}
                        disabled={action === "view"}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label
                        htmlFor="birth-day"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Birth Day
                      </label>

                      <TextField
                        size="small"
                        className="mt-2"
                        type="date"
                        value={birthDay}
                        disabled={action === "view"}
                        onChange={(e) => setBirthDay(e.target.value)}
                      />
                    </FormControl>
                  </div>

                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label
                        htmlFor="card-id"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Card ID
                      </label>

                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        value={idcard}
                        disabled={action === "view"}
                        onChange={(e) => setIdCard(e.target.value)}
                      />
                    </FormControl>
                  </div>

                  <div className="sm:col-span-1">
                    <FormControl fullWidth>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Gender
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
                        Phone
                      </label>

                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        value={phone}
                        disabled={action === "view"}
                        onChange={(e) => setPhone(e.target.value)}
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
                              selected={majorId == item.id}
                            >
                              {item.name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </FormControl>
                  </div>

                  <div className="sm:col-span-1">
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
                              selected={campusId == item.id}
                            >
                              {item.name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </FormControl>
                  </div>

                  <div className="sm:col-span-1">
                    <FormControl fullWidth>
                      <label
                        htmlFor="code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Student Code
                      </label>

                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        value={studentCode}
                        disabled={action === "view"}
                        onChange={(e) => setStudentCode(e.target.value)}
                      />
                    </FormControl>
                  </div>

                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Username
                      </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        value={username}
                        disabled={action === "view"}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>

                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        value={email}
                        disabled={action === "view" || action === "update"}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  <div className="sm:col-span-4">
                    <FormControl fullWidth>
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Address
                      </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        value={address}
                        disabled={action === "view"}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </FormControl>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Photo
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                      <input
                        type="file"
                        disabled={action === "view"}
                        accept="image/*" // Limit file types to images
                        onChange={handleImageUpload} // Handle file upload in a function // Hide the input visually
                        id="upload-image-input" // Assign an ID for the label to refer to
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
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={handleClose}
              >
                Cancel
              </button>
              {action != "view" && (
                <button
                  type="button"
                  onClick={id ? handleUpdate : handleSubmit}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
