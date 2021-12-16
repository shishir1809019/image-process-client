import { Grid } from "@mui/material";
import React from "react";

const ShowData = ({ imageWithData }) => {
  const { process, template, image } = imageWithData;
  return (
    <Grid
      style={{
        display: "flex",
        border: "1px solid lightgray",
        marginRight: "5px",
        marginTop: "30px",
      }}
      item
      xs={12}
      sm={6}
      md={4}
    >
      <img
        style={{ width: "200px", height: "300px", marginRight: "20px" }}
        src={`data:image/jpeg;base64,${image}`}
        alt=""
      />
      <div>
        <h5>{process}</h5>
        <h5>{template}</h5>
      </div>
    </Grid>
  );
};

export default ShowData;
