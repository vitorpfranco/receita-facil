import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export type PDFViewer = {
  name: string;
  url: string;
};
type PdfListViewerProps = {
  pdfList: PDFViewer[];
};
const PdfListViewer: React.FC<PdfListViewerProps> = ({ pdfList }) => {
  const [selectedPdf, setSelectedPdf] = useState<PDFViewer | null>(null);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        padding: "2rem",
        backgroundColor: "#f8f9fa",
      }}
    >
      {!selectedPdf ? (
        <Box sx={{ width: "100%", maxWidth: "600px" }}>
          <Typography
            sx={{ marginBottom: "1rem", textAlign: "center", fontSize:"1.5rem", fontWeight:"400" }}
          >
            Escolha um PDF:
          </Typography>
          <List
            sx={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: 2 }}
          >
            {pdfList.map((pdf) => (
              <ListItem key={pdf.name} disablePadding>
                <ListItemButton onClick={() => setSelectedPdf(pdf)}>
                  <Typography>{pdf.name}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: "-4rem",
              left: "0rem",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              gap:'10px'
            }}
          >
            <Button
              onClick={() => setSelectedPdf(null)}
              variant="contained"
              sx={{
                backgroundColor: "#f08478",
                "&:hover": { backgroundColor: "#d96b61" },
              }}
            >
              Voltar
            </Button>
              <div >{selectedPdf.name}</div>
          </Box>

          <iframe
            src={selectedPdf.url}
            width="100%"
            height="100%"
            style={{ border: "none", borderRadius: "8px" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default PdfListViewer;
