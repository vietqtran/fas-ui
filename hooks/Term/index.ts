"use client";
import { Bounce, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { addTerm, deleteTermById, getAllTerms, getTermByID, updateTerm } from "@/helpers/api/term";

type Props = {};

const useTerm = () => {
    const [terms, setTerms] = useState([]);
    const [name, setName] = useState("");
    const [startAt, setStartAt] = useState("");
    const [endAt, setEndAt] = useState("");

    const [id, setId] = useState("");

    useEffect(() => {
        fetchTerms();
    }, []);

    const fetchTerms = async () => {
        try {
            const response = await getAllTerms().then((res) => res);
            if (response) {
                setTerms(response.data);
            } else {
                toast.error("Term course failed");
            }
        } catch (error) {
            console.error("Error fetching terms:", error);
            toast.error("Fetch Term failed");
        }
    };

    const deleteTerm = async (id: string) => {
        try {
            const response = await deleteTermById(id).then(
                (res) => res
            ) as BaseResponse;
            if (response && response.code === "SUCCESS") {
                toast.success(response?.message);
                fetchTerms();
            } else {
                toast.error("Delete term failed");
            }
        } catch (error) {
            console.error("Error deleting term:", error);
            toast.error("Delete term failed");
        }
    };

    const getTerm = async (id: string) => {
        try {
            const response = await getTermByID(id).then(
                (res) => res
            ) as BaseResponse;
            if (response && response.code === "SUCCESS") {
                toast.success(response.message);
                return response.data;
            } else {
                // toast.error(response?.message || "Failed to get term");
                return undefined;
            }
        } catch (error) {
            console.error("Error getting term:", error);
            toast.error("Failed to get term");
            return undefined;
        }
    };

    const createTerm = async (e) => {
        e.preventDefault();
        try {
            const response = await addTerm({
                name,
                startAt,
                endAt,
            } as TermInformation).then(
                (res) => res
            ) as BaseResponse;
            if (response && response.code === "SUCCESS") {
                toast.success(response.message);
                await fetchTerms();
            } else {
                toast.error(response?.message || "Add term failed");
            }
        } catch (error) {
            console.error("Error adding term:", error);
            toast.error("Add course failed");
        }
    };

    const handleUpdateTerm = async (e) => {
        e.preventDefault();
        try {
            const response = await updateTerm(id, {
                name,
                startAt,
                endAt,
            } as TermInformation).then(
                (res) => res
            ) as BaseResponse;

            if (response && response.code === "SUCCESS") {
                toast.success(response.message);
                await fetchTerms();
            } else {
                toast.error(response?.message || "Update course failed");
            }
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error("Update course failed");
        }
    };

    return {
        terms,
        fetchTerms,
        deleteTerm,
        name,
        setName,
        startAt,
        setStartAt,
        endAt,
        setEndAt,
        createTerm,
        id,
        setId,
        handleUpdateTerm,
        getTerm
    };
};

export default useTerm;
