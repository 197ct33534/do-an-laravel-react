import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectStatus } from "../../features/user/userSlice";

const SpinnerMui = () => {
  const loadding = useSelector(selectStatus);
  if (loadding === "loading") {
    return (
      <Box sx={{ display: "flex", zIndex: "1000" }}>
        <CircularProgress />
      </Box>
    );
  }
};

export default SpinnerMui;
