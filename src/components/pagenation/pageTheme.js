import { createTheme } from "@mui/material";


const theme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "black", // Set text color to white for all instances
          backgroundColor: "#F5F5F5", // Default background color for all items
          "&.Mui-selected": {
            backgroundColor: "#2F4EFF", // Selected page color
            color: "white",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#2F4EFF", // Keep selected page color on hover
            color: "white",
          },
          "&:hover": {
            backgroundColor: "#2F4EFF", // Hover color
            color: "white",
          },
        },
      },
    },
  },
});

export default theme;
