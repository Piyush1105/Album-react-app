import "./Navbar.scss";
import { AppBar, Toolbar, Typography } from "@mui/material";

export const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      className="navbar"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Album App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
