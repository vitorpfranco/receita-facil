import React, {  } from "react";
import PdfListViewer from "../components/PdfListViewer";
import { PDFViewer } from "../components/PdfListViewer/PdfListViewer";

const pdfFiles: PDFViewer[] = [
  {
    name: "ASPECTOS DERMATOLÓGICOS DA PELE NEGRA",
    url: "https://storage.googleapis.com/receita-facil-knowledge-bibliografia/ASPECTOS%20DERMATOLOGICOS%20DA%20PELE%20NEGRA.pdf",
  },
  {
    name: "ATLAS DERMATOLÓGICO PELE NEGRA E PARDA - INGLÊS",
    url: "https://storage.googleapis.com/receita-facil-knowledge-bibliografia/ATLAS%20DERMATOLOGICO%20PELE%20NEGRA%20E%20PARDA%20-%20INGLES.pdf",
  },
  {
    name: "DIREITOS HUMANOS, SAÚDE MENTAL E RACISMO",
    url: "https://storage.googleapis.com/receita-facil-knowledge-bibliografia/DIREITOS%20HUMANOS,%20SAUDE%20MENTAL%20E%20RACISMO.pdf",
  },
  {
    name: "EPILEPSIA - GUIA PRÁTICO",
    url: "https://storage.googleapis.com/receita-facil-knowledge-bibliografia/EPILEPSIA%20-%20GUIA%20PR%C3%81TICO.pdf",
  },
  {
    name: "MANUAL DE GESTAÇÃO DE ALTO RISCO 2020",
    url: "https://storage.googleapis.com/receita-facil-knowledge-bibliografia/MANUAL%20DE%20GESTA%C3%87%C3%83O%20DE%20ALTO%20RISCO%202020.pdf",
  },
];
const Library: React.FC = () => {

  return (
    <PdfListViewer pdfList={pdfFiles}/>
  );
};
export default Library;
