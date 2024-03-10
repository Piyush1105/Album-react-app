import "./App.css";
import { ToastContainer } from "react-toastify";
import { Box, Grid, Stack } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import AppSwitch from "./routes/Routes";

function App() {
  return (
    <>
      <Box className="dashboard-layout">
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          draggable={false}
          theme="light"
        />
        <Navbar />
        <Stack direction="row" p={0} className="dashboard-container">
          <Grid className="main-page-container">
            <AppSwitch />
          </Grid>
        </Stack>
      </Box>
    </>
  );
}

export default App;
