import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  createNewInstructor,
  deleteInstructorById,
  getAllInstructors,
  getInstructorById,
  updateInstructor,
} from "@/helpers/api/instructor";
import { getAllCampuses } from "@/helpers/api/campus";

export const useInstructor = () => {
  const [instructors, setInstructors] = useState([]);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [campuses, setCampuses] = useState([]);
  const [campusId, setCampusId] = useState("");
  const [idCard, setIdCard] = useState("");
  const [gender, setGender] = useState(Boolean);
  const [instructorDetail, setInstructorDetail] = useState<any>();

  useEffect(() => {
    fetchInstructors();
  }, []);

  useEffect(() => {
    fetchCampuses();
  }, []);

  const fetchCampuses = async () => {
    const response = await getAllCampuses().then((res) => res);

    if (response) {
      setCampuses(response.data);
    } else {
      toast.error("Fetch campuses failed");
    }
  };

  const fetchInstructors = async () => {
    try {
      const response = (await getAllInstructors().then(
        (res) => res
      )) as BaseResponse;
      if (response && response?.code === "SUCCESS") {
        setInstructors(response.data);
      } else {
        toast.error("error to fetch data");
      }
    } catch (error) {
     
    }
  };

  const handleDeleteInstructor = async (id: string) => {
    const response = (await deleteInstructorById(id).then(
      (res) => res
    )) as BaseResponse;

    if (response && response?.code === "SUCCESS") {
      toast.success(response?.message);
      await fetchInstructors();
    } else {
      toast.error("not able to delete");
    }
  };

  const handleCreateInstructor = async (e: any) => {
    e.preventDefault();

    const response = (await createNewInstructor({
      email,
      firstName,
      lastName,
      middleName,
      phone,
      birthDay,
      username,
      address,
      profileImage,
      campusId,
      gender,
      idCard,
    } as InstructorCredentials).then((res) => res)) as BaseResponse;

    if (response && response?.code === "SUCCESS") {
      toast.success(response?.message);
      let data = await fetchInstructors();
      
    } else {
      toast.error(response?.message);
    }
  };

  const fetchInstructor = async (id: string) => {
    const response = (await getInstructorById(id).then(
      (res) => res
    )) as BaseResponse;

    if (response && response?.code === "SUCCESS") {
      setInstructorDetail(response.data);
      return response.data;
    } else {
      toast.error("error to fetch data");
    }
  };

  const handleUpdateInstructor = async (e: any) => {
    e.preventDefault();

    const response = (await updateInstructor(id, {
      email,
      firstName,
      lastName,
      middleName,
      phone,
      birthDay,
      username,
      address,
      profileImage,
      campusId,
      gender,
      idCard,
    } as InstructorCredentials).then((res) => res)) as BaseResponse;

    if (response && response?.code === "SUCCESS") {
      toast.success(response?.message);
    } else {
      toast.error("not able to update");
    }
  };

  return {
    instructors,
    setInstructors,
    id,
    setId,
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    middleName,
    setMiddleName,
    phone,
    setPhone,
    birthDay,
    setBirthDay,
    username,
    setUsername,
    address,
    setAddress,
    profileImage,
    setProfileImage,
    campusId,
    setCampusId,
    campuses,
    setCampuses,
    handleDeleteInstructor,
    handleCreateInstructor,
    handleUpdateInstructor,
    fetchInstructors,
    fetchInstructor,
    gender,
    setGender,
    idCard,
    setIdCard,
    instructorDetail,
  };
};
