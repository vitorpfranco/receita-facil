import React from "react";
import PdfListViewer from "../components/PdfListViewer";


const pdfFiles = [
  {
    name: "CADERNETA DA GESTANTE - SUS",
    url: "https://storage.googleapis.com/receita-facil-knowledge-scores/CADERNETA%20DA%20GESTANTE%20-%20SUS.pdf",
  },
  {
    name: "GUIA DE AUTOCUIDADO COM OS PÉS PARA PACIENTES DIABÉTICOS",
    url: "https://storage.googleapis.com/receita-facil-knowledge-scores/GUIA%20DE%20AUTOCUIDADO%20COM%20OS%20P%C3%89S%20PARA%20PACIENTES%20DIAB%C3%89TICOS.pdf",
  },
  {
    name: "INSTRUÇÕES PARA TRATAMENTO DE FASCITE PLANTAR",
    url: "https://storage.googleapis.com/receita-facil-knowledge-scores/INSTRU%C3%87%C3%95ES%20PARA%20TRATAMENTO%20DE%20FASCITE%20PLANTAR.pdf",
  },
  {
    name: "MATERIAIS DE AVALIAÇÃO GERIÁTRICA",
    url: "https://storage.googleapis.com/receita-facil-knowledge-scores/MATERIAIS%20DE%20AVALIAC%CC%A7A%CC%83O%20GERIATRICA.pdf",
  },
  {
    name: "MEDIÇÃO RESIDENCIAL DA PRESSÃO ARTERIAL",
    url: "https://storage.googleapis.com/receita-facil-knowledge-scores/MEDI%C3%87%C3%83O%20RESIDENCIAL%20DA%20PRESS%C3%83O%20ARTERIAL.pdf",
  },
  {
    name: "MRPA NA GESTAÇÃO",
    url: "https://storage.googleapis.com/receita-facil-knowledge-scores/MRPA%20NA%20GESTAC%CC%A7A%CC%83O.pdf",
  },
  {
    name: "MRPA NO PUERPÉRIO",
    url: "https://storage.googleapis.com/receita-facil-knowledge-scores/MRPA%20NO%20PUERPE%CC%81RIO.pdf",
  },
  {
    name: "MS - HANSENÍASE TABELA DE AVALIAÇÃO NEUROLÓGICA",
    url: "https://storage.googleapis.com/receita-facil-knowledge-scores/MS%20-%20HANSENI%CC%81ASE%20TABELA%20DE%20AVALIA%C3%87%C3%83O%20NEUROL%C3%93GICA.pdf",
  },
  {
    name: "TABELA HGT ORIENTAÇÕES GLICOSIMETRO",
    url: "https://storage.googleapis.com/receita-facil-knowledge-scores/TABELA%20HGT%20ORIENTA%C3%87%C3%95ES%20GLICOSIMETRO.pdf",
  },
  {
    name: "TABELA HGT",
    url: "https://storage.googleapis.com/receita-facil-knowledge-scores/TABELA%20HGT.pdf",
  },
  {
    name: "TABELA PERFIL GLICÊMICO GESTANTE",
    url: "https://storage.googleapis.com/receita-facil-knowledge-scores/TABELA%20PERFIL%20GLIC%C3%8AMICO%20GESTANTE.pdf",
  },
  {
    name: "UFRGS - ESCORE INTERNACIONAL DE SINTOMAS PROSTÁTICOS",
    url: "https://storage.googleapis.com/receita-facil-knowledge-scores/UFRGS%20-%20ESCORE%20INTERNACIONAL%20DE%20SINTOMAS%20PROST%C3%81TICOS.pdf",
  },
  {
    name: "UNIVASF - DIÁRIO DE CEFALÉIAS",
    url: "https://storage.googleapis.com/receita-facil-knowledge-scores/UNIVASF%20-%20DI%C3%81RIO%20DE%20CEFAL%C3%89IAS.pdf",
  },
];


const Resources: React.FC = () => {
  return <PdfListViewer pdfList={pdfFiles} />;
};

export default Resources;


