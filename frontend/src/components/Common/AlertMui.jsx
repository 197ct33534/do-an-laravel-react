import { Alert, Box, Collapse, IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const AlertMui = ({ open, setOpen, content }) => {
  return (
    <Box sx={{ width: "100%" }} mb={3}>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {content}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default AlertMui;
