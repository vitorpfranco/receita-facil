import { Box } from "@mui/material";
import { usePrescriptionStore } from "../../store/prescription";
import style from "./style.module.scss";

const SpecialPrescriptionFooter: React.FC = () => {
  const today = new Date().toLocaleDateString("pt-BR");
  const { hideDate } = usePrescriptionStore();
  return (
    <footer className={style.footer}>
      {hideDate ? (
        <Box
          sx={{
            flex: 1,
            marginLeft: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          <div>
            Data: <b>_______________</b>
          </div>
          <div>
            Este receituário só é válido com datação, assinatura e identificação
            do médico responsável
          </div>
        </Box>
      ) : (
        <Box sx={{ flex: 1, marginLeft: "auto" }}>Data: {today} </Box>
      )}
      <div className={style.tradeInfo}>
        <div>
          <div className={style.tradeTitle}>
            INFORMAÇÃO DO USUÁRIO PARA QUEM O MEDICAMENTO FOI DISPENSADO
          </div>
          <div className={style.tradeField}>
            Nome:
            <span className={style.borderBottomLine}></span>
          </div>
          <div className={style.tradeField}>
            Identidade:
            <span className={style.borderBottomLine}></span>
          </div>
          <div className={style.tradeField}>
            Endereço:
            <span className={style.borderBottomLine}></span>
          </div>

          <div className={style.tradeField}>
            Telefone:
            <span className={style.borderBottomLine}></span>
          </div>
        </div>
        <div>
          <div className={style.tradeTitle}>
            IDENTIFICAÇÃO DO PROFISSIONAL DISPENSADOR
          </div>
          <div className={style.tradeField}>
            Nome:
            <span className={style.borderBottomLine}></span>
          </div>
          <div className={style.tradeField}>
            Unidade dispensadora:
            <span className={style.borderBottomLine}></span>
          </div>
          <div className={style.tradeField}>
            Assinatura:
            <span className={style.borderBottomLine}></span>
          </div>
          <div className={style.tradeField}>
            Data:
            <span className={style.borderBottomLine}></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SpecialPrescriptionFooter;
