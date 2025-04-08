import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        color: "#333",
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: "6rem", fontWeight: "bold", mb: 2 }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Página não encontrada
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{
          backgroundColor: "#f08478",
          color: "white",
          padding: "10px 20px",
          fontSize: "1.2rem",
          borderRadius: "10px",
          textTransform: "none",
          "&:hover": { backgroundColor: "#d96b61" },
        }}
      >
        Voltar para Home
      </Button>
    </Box>
  );
};

export default NotFound;
