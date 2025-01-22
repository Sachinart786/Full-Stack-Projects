import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DataGridDemo({ handleDeleteClick, rows }) {
  const columns = [
    {
      field: "name",
      headerName: "Task name",
      width: 260,
    },
    {
      field: "desc",
      headerName: "Description",
      width: 700,
    },
    {
      field: "createdAt",
      headerName: "Created On",
      width: 180,
      getActions: (props) => {
        console.log("props", props)
        return [
          <GridActionsCellItem
            key={`delete-${id}`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      // getActions: ({props}) => {
      //   console.log("props", props);
      //   return [
      //       // if()
      //   ];
      // },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={`delete-${id}`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[8]}
        checkboxSelection
      />
    </Box>
  );
}
