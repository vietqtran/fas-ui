"use client";
import Header from "@/components/Common/Header";
import { RootState } from "@/helpers/redux/reducers";
import useTerm from "@/hooks/Term";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const rows = Array.from({ length: 30 }, (_, index) => index + 1);

const page = () => {
  const { terms } = useTerm();
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  if (!user) {
    router.push("/login");
  }

  return (
    <div className="min-h-[100vh] h-[100%] w-[100vw] bg-white text-black ">
      <div className="container mx-auto py-5 text-gray-600">
        <Header />
        <div className="mt-10">
          <h1 className="text-3xl font-semibold text-black">Term List</h1>
          <h2 className="mt-10 mb-4">Campus: FU_HL</h2>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow style={{ backgroundColor: "#6b90da" }}>
                  <TableCell>TERM</TableCell>
                  <TableCell>START DATE</TableCell>
                  <TableCell>END DATE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {terms.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(row.startAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(row.endAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default page;
