"use client";

import * as React from "react";

import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ManagerLayout from "@/components/Common/Layouts/ManagerLayout";
import ModalInstructor from "@/components/Common/Modals/ModalInsturctor";
import { RootState } from "@/helpers/redux/reducers";
import SearchIcon from "@mui/icons-material/Search";
import { useInstructor } from "@/hooks/Instructor";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface Props {}

export default function page(props: Props) {
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  if (!user || user.role.name !== "MANAGER") {
    router.push("/login");
  }

  const { instructors, setId, id, handleDeleteInstructor, fetchInstructors } =
    useInstructor();

  const [searchText, setSearchText] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");

  const handleOpen = () => {
    setAction("create");
    setId("");
    setOpen(true);
  };
  const handleClose = () => {
    fetchInstructors();
    setOpen(false);
  };

  const handleUpdate = (instructorId: string) => {
    setId(instructorId);
    setAction("update");
    setOpen(true);
  };

  const handleDelete = (instructorId: string) => {
    // Handle delete logic here
    console.log(`Delete button clicked for row with ID: ${instructorId}`);
    handleDeleteInstructor(instructorId);
  };

  const searchInstructors = (searchValue: string) => {
    setSearchText(searchValue);

    const filteredInstructors = instructors.filter((instructor) => {
      const valuesToSearch = Object.values(instructor).join(" ").toLowerCase();
      return valuesToSearch.includes(searchValue.toLowerCase());
    });

    setResults(filteredInstructors);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "firstName", headerName: "First Name", width: 100 },
    { field: "middleName", headerName: "Middle Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 100 },
    {
      field: "birthDay",
      headerName: "Birth Day",
      type: "dateTime",
      width: 100,
      valueFormatter(params) {
        return new Date(params.value).toLocaleDateString();
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <div style={{ color: params.row.status ? "green" : "red" }}>
          {params.row.status ? "Active" : "Inactive"}
        </div>
      ),
    },
    { field: "address", headerName: "Address", width: 300 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="flex gap-3">
          <button
            className="rounded bg-yellow-500 px-2 py-2 font-bold text-white hover:bg-yellow-600"
            onClick={() => handleUpdate(params.row.id)}
          >
            <EditIcon />
          </button>
          <button
            className="rounded bg-red-500 px-2 py-2 font-bold text-white hover:bg-red-700"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <ManagerLayout>
      <div className="container p-5">
        <h1 className="text-3xl font-semibold text-gray-800">
          List Of Instructors
        </h1>

        <div className="my-8 flex justify-end gap-2">
          <button className="flex items-center gap-1 rounded-md bg-green-700 px-4 py-2 font-bold text-white hover:bg-green-800">
            <FileDownloadIcon />
            Export to excel
          </button>

          <button
            className="flex items-center gap-1 rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => handleOpen()}
          >
            <AddIcon />
            Add new instructor
          </button>
        </div>

        {/* Search input */}
        <div className="mb-6">
          <div className="relative flex h-12 w-full items-center overflow-hidden rounded-lg border border-gray-200 bg-white transition duration-300 ease-in-out focus-within:border-gray-300 focus-within:shadow-lg">
            <div className="grid h-full w-12 place-items-center text-gray-300">
              <SearchIcon />
            </div>

            <input
              className="peer h-full w-full pr-2 text-sm text-gray-700 outline-none"
              type="text"
              id="search"
              value={searchText}
              onChange={(e) => searchInstructors(e.target.value)}
              placeholder="Search something..."
            />

            {searchText && (
              <div
                className="absolute right-0 top-0 flex h-full cursor-pointer items-center px-2 text-gray-300"
                onClick={() => setSearchText("")}
              >
                <CloseIcon />
              </div>
            )}
          </div>
        </div>

        {/* DataGrid */}
        <DataGrid
          rows={results?.length > 0 ? results : instructors}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20, 25, 30]}
          sx={{
            ".MuiDataGrid-columnHeader": {
              outline: "none !important",
            },
          }}
          slots={{
            toolbar: CustomToolbar,
          }}
          showColumnVerticalBorder={true}
          showCellVerticalBorder={true}
        />

        {/* Modal Instructor */}
        <ModalInstructor
          open={open}
          handleClose={handleClose}
          id={id}
          action={action}
        />
      </div>
    </ManagerLayout>
  );
}
