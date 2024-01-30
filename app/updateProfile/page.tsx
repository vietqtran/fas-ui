"use client";
import Header from "@/components/Common/Header";
import useStudent from "@/hooks/Student";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { FormControl, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

type Props = {};

const page = (props: Props) => {
  const {
    idcard,
    setIdCard,
    gender,
    setGender,
    id,
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
    fetchStudentByEmail,
  } = useStudent();
  let [student, setStudent] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    birthDay: "",
    phone: "",
    major: {
      code: "",
    },
    campusId: "",
    studentCode: "",
    username: "",
    address: "",
    profileImage: "",
    id: "",
    email: "",
    gender: true,
    idcard: "",
  });

  let emailStudent = localStorage.getItem("email");

  useEffect(() => {
    handleGetStudent(emailStudent);
  }, []);

  const handleGetStudent = async (emailStudent) => {
    let data = await fetchStudentByEmail(emailStudent);
    setEmail(data?.email);
    setUsername(data?.username);
    setProfileImage(data?.profileImage);
    setFirstName(data?.firstName);
    setMiddleName(data?.middleName);
    setLastName(data?.lastName);
    setBirthDay(data?.birthDay.split("T")[0]);
    setPhone(data?.phone);
    setAddress(data?.address);
    setImage(data?.profileImage);
    setId(data?.id);
    setIdCard(data?.idcard);
    setCampusId(data?.campus?.id);
    setMajorId(data?.major?.id);

    setStudent(data);
  };
  // set data from local storage

  const [image, setImage] = React.useState("");

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
    e.preventDefault();
    handleUpdateStudent(e);
  };

  return (
    <div className="bg-white text-black h-[100%] w-[100vw] ">
      <div className="container mx-auto py-5 text-gray-600">
        <Header />
        <div className="mt-5 bg-gray-200 p-3">
          <h4 className="text-xl text-center my-3 font-bold">Update Profile</h4>
          <p className="text-center">
            Đây là những thông tin quan trọng, được nhà trường dùng để in bằng
            tốt nghiệp, bảng điểm tốt nghiệp và các chứng chỉ cấp cho sinh viên,
            ngoài ra còn để báo cáo các Bộ ngành liên quan nên sinh viên cần
            nhập thông tin đầy đủ, chính xác.
          </p>
        </div>
        <div>
          <form>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
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
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  <div className="sm:col-span-1">
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
                        onChange={(e) => setBirthDay(e.target.value)}
                      />
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
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </FormControl>
                  </div>

                  <div className="sm:col-span-2">
                    <FormControl fullWidth>
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </FormControl>
                  </div>

                  <div className="sm:col-span-1">
                    <FormControl fullWidth>
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Id Card
                      </label>
                      <TextField
                        size="small"
                        className="mt-2"
                        type="text"
                        value={idcard}
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
          </form>
          <button
            type="button"
            className="text-right rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
