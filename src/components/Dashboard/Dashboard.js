import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid, Button, Input } from "@mui/material";
import ShowData from "./ShowData";

const drawerWidth = 240;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["Inbox", "Manage Product", "New Product", "Add Product"].map(
          (text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [process, setProcess] = React.useState("");
  const [template, setTemplate] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      return;
    }
    const formData = new FormData();
    formData.append("process", process);
    formData.append("template", template);
    formData.append("image", image);

    fetch("https://blooming-waters-39053.herokuapp.com/imageWithData", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setIsLoading(true);
          alert("added to database successfully");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [imagesWithData, setImagesWithData] = React.useState([]);
  React.useEffect(() => {
    fetch("https://blooming-waters-39053.herokuapp.com/imageWithData")
      .then((res) => res.json())
      .then((data) => setImagesWithData(data));
  }, [isLoading]);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            VInnovate Technologies
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        {/* <Box sx={{ minWidth: 120 }}> */}
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ width: "25%" }}>
            <InputLabel id="demo-simple-select-label">Process</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={process}
              label="precess"
              onChange={(e) => setProcess(e.target.value)}
            >
              <MenuItem value={"Process 1"}>Process 1</MenuItem>
              <MenuItem value={"Process 2"}>Process 2</MenuItem>
              <MenuItem value={"Process 3"}>Process 3</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label1">Template</InputLabel>
            <Select
              labelId="demo-simple-select-label1"
              id="demo-simple-select1"
              value={template}
              label="template"
              onChange={(e) => setTemplate(e.target.value)}
            >
              <MenuItem value={"Template 1"}>Template 1</MenuItem>
              <MenuItem value={"Template 2"}>Template 2</MenuItem>
              <MenuItem value={"Template 3"}>Template 3</MenuItem>
            </Select>
            <Input
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              type="file"
            />{" "}
            <br />
            <Button variant="contained" type="submit">
              Process
            </Button>
          </FormControl>
        </form>
        {/* </Box> */}
        <Grid container spacing={2}>
          {imagesWithData.map((imageWithData) => (
            <ShowData imageWithData={imageWithData}></ShowData>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
