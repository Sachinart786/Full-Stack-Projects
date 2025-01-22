"use client";
import * as React from "react";
import DataGridDemo from "./data-table";
import {
  TextField,
  Breadcrumbs,
  Grid,
  Box,
  Tabs,
  Tab,
  Button,
  Stack,
  Typography,
  Modal,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import SideBar from "../../components/Sidebar";
import axios from "axios";
import { get, isEmpty } from "lodash";
import { useNotifications } from "@toolpad/core/useNotifications";
import { showNotification } from "../../utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "white",
  border: "1px solid #000",
  boxShadow: 24,
  p: 3,
};

export const PageContainer = () => {
  const toaster = useNotifications();
  const [tasks, setTasks] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [id, setId] = React.useState("");
  const [task, setTask] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [taskErr, setTaskErr] = React.useState("");
  const [descErr, setDescErr] = React.useState("");

  const getTasksByStatus = async () => {
    let status;
    if (index === 0) {
      status = "";
    } else if (index === 1) {
      status = "Pending";
    } else if (index === 2) {
      status = "Completed";
    } else if (index === 3) {
      status = "Done";
    } else {
      return;
    }
    try {
      const res = await axios.get(`http://localhost:1010/task/${status}`);
      if (get(res, "data.success", false)) {
        setTasks(get(res, "data.data", []));
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getTasksByStatus();
  }, [index]);

  const validation = () => {
    let isValid = true;
    if (isEmpty(task)) {
      isValid = false;
      setTaskErr("This field is required. Please provide task name");
    }
    if (isEmpty(task)) {
      isValid = false;
      setDescErr("This field is required. Please provide description");
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validation()) return;
    try {
      const payload = {
        name: task,
        desc,
      };
      const res = await axios.post("http://localhost:1010/task", payload);
      if (get(res, "data.success", false)) {
        setShow(false);
        setTask("");
        setDesc("");
        getTasks();
        showNotification("Added Su");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = async (id) => {
    setOpen(true);
    setId(id);
  };

  const handleDelete = async () => {
    const res = await axios.delete(`http://localhost:1010/task/${id}`);
    if (get(res, "data.success", false)) {
      getTasks();
      setOpen(false);
      return <Alert severity="success">Deleted Successfully !</Alert>;
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <SideBar />
      <br />
      <br />
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link color="inherit" href="#">
          Home
        </Link>
        <Link color="inherit" href="#">
          Create
        </Link>
      </Breadcrumbs>
      <br />
      {show && (
        <>
          <Box
            sx={{
              width: "100%",
              height: "200px",
              padding: "24px",
              border: "1px grey",
              borderRadius: "5px",
              backgroundColor: "aliceblue",
            }}
          >
            <Typography
              sx={{ fontSize: "18px", fontWeight: "500", color: "#007bff" }}
            >
              Add New Task
            </Typography>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  required
                  id="outlined-required"
                  label="Task Name"
                  placeholder="Enter Task Name"
                  value={task}
                  onChange={(e) => {
                    setTask(e.target.value);
                    setTaskErr("");
                  }}
                  error={taskErr ? true : false}
                  helperText={taskErr ? taskErr : ""}
                  fullWidth
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  id="outlined-multiline-static"
                  label="Description"
                  placeholder="Enter Description"
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                    setDescErr("");
                  }}
                  error={descErr ? true : false}
                  helperText={descErr ? descErr : ""}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>

          <br />

          <Stack direction="row" spacing={2} justifyContent="end">
            <Button
              component="label"
              variant="outlined"
              size="large"
              onClick={() => setShow(false)}
            >
              Cancel
            </Button>

            <Button
              component="label"
              variant="contained"
              size="large"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Stack>
        </>
      )}

      <br />

      {!show && (
        <>
          <Box sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={10.5}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs value={index} aria-label="basic tabs example">
                    <Tab onClick={() => setIndex(0)} label="Overview" />
                    <Tab onClick={() => setIndex(1)} label="Pending" />
                    <Tab onClick={() => setIndex(2)} label="Completed" />
                    <Tab onClick={() => setIndex(3)} label="Done" />
                  </Tabs>
                </Box>
              </Grid>
              <Grid item xs={1.5}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setShow(true)}
                >
                  Add New Task
                </Button>
              </Grid>
            </Grid>
          </Box>
          <DataGridDemo rows={tasks} handleDeleteClick={handleDeleteClick} />

          <Modal
            open={open}
            onClose={() => setOpen(true)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Delete Confirmation
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Are you sure want to delete this task ?
              </Typography>
              <br />
              <Stack direction="row" spacing={2} justifyContent="end">
                <Button
                  component="label"
                  variant="outlined"
                  size="large"
                  onClick={() => setOpen(false)}
                >
                  No
                </Button>

                <Button
                  component="label"
                  variant="contained"
                  size="large"
                  color="error"
                  onClick={handleDelete}
                >
                  Yes
                </Button>
              </Stack>
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
};
