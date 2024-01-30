import { Bounce, toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  checkEmailExist,
  login,
  loginWithGoogleAPI,
} from "@/helpers/api/login";
import { use, useEffect, useState } from "react";

import { auth } from "@/helpers/firebase";
import { getAllCampuses } from "@/helpers/api/campus";
import { getAllRoles } from "@/helpers/api/role";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();

  const [roles, setRoles] = useState([]);
  const [campuses, setCampuses] = useState([]);

  const [campusId, setCampusId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await getAllRoles().then((res) => res);

      if (response) {
        setRoles(response.data);
      } else {
        toast.error("Fetch roles failed");
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchCampuses = async () => {
      const response = await getAllCampuses().then((res) => res);

      if (response) {
        setCampuses(response.data);
      } else {
        toast.error("Fetch campuses failed");
      }
    };

    fetchCampuses();
  }, []);

  const loginHandle = async (e) => {
    e.preventDefault();

    if (!campusId || !roleId || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    console.log(email);
    
    const loginResponse = await login({
      campusId,
      roleId,
      email,
      password,
    } as LoginCredentials).then((res) => res);
    console.log(loginResponse);
    
    if (!loginResponse) {
      toast.error("Login failed");
    } else {
      
      // localStorage.setItem("accessToken", loginResponse.data.accessToken);
      localStorage.setItem("email", loginResponse.data.email);

      console.log(loginResponse);
      router.push("/");
    }
  };

  const loginWithGoogle = async () => {
    try {
      if (!campusId) {
        toast.error("Please select a campus");
        return;
      }

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      const loginResponse = await loginWithGoogleAPI({
        campusId: campusId,
        email: email,
      });

      if (!loginResponse) {
        toast.error("Login failed");
      } else {
        console.log(loginResponse);

        localStorage.setItem("email", loginResponse.data.email);
        console.log(loginResponse);
        router.push("/");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("An error occurred during Google login. Please check again.");
    }
  };

  const checkEmail = async (e) => {
    e.preventDefault();
    const response = (await checkEmailExist(email).then(
      (res) => res
    )) as BaseResponse;
    if (response && response?.code === "SUCCESS") {
      toast.success(response?.message);
      return response.data;
    } else {
      toast.error(response?.message);
    }
  };

  return {
    roles,
    campuses,
    loginHandle,
    loginWithGoogle,
    campusId,
    setCampusId,
    roleId,
    setRoleId,
    email,
    setEmail,
    password,
    setPassword,
    checkEmail,
  };
};
