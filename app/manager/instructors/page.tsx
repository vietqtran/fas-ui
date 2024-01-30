"use client";

import * as React from "react";

import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useInstructor } from "@/hooks/Instructor";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ModalInstructor from "@/components/Common/Modals/ModalInsturctor";
import ManagerLayout from "@/components/Common/Layouts/ManagerLayout";

interface Props {}

export default function page(props: Props) {

  const { instructors, setId, id, handleDeleteInstructor, fetchInstructors } = useInstructor();


  const [searchText, setSearchText] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");

  const handleOpen = () => {
    setAction("create");
    setOpen(true);
  };
  const handleClose = () => {
    fetchInstructors();
    setOpen(false);
  };


  const handleUpdate = (instructorId: string) => {
    // Handle update logic here
    console.log(`Update button clicked for row with ID: ${instructorId}`);
    setId(instructorId);
    setAction("update");
    setOpen(true)
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
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-2 rounded"
            onClick={() => handleUpdate(params.row.id)}
          >
            <EditIcon />
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
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

        <div className="flex justify-end my-8 gap-2">
          <button className="flex items-center gap-1 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md">
            <FileDownloadIcon />
            Export to excel
          </button>

          <button
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={() => handleOpen()}
          >
            <AddIcon />
            Add new instructor
          </button>
        </div>

        {/* Search input */}
        <div className="mb-6">
          <div className="relative border border-gray-200 focus-within:border-gray-300 flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden transition duration-300 ease-in-out">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <SearchIcon />
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              value={searchText}
              onChange={(e) => searchInstructors(e.target.value)}
              placeholder="Search something..."
            />

            {searchText && (
              <div
                className="absolute top-0 right-0 flex items-center h-full px-2 cursor-pointer text-gray-300"
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
        <ModalInstructor open={open} handleClose={handleClose} id={id} action={action} />
      </div>
    </ManagerLayout>
  );
}
