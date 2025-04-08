import style from "./style.module.scss";
import { usePrescriptionStore } from "../../store/prescription";
import { Box } from "@mui/material";

const SpecialPrescriptionHeader: React.FC = () => {
  const { issuer, setIssuer, setPatientName, patientName, adress, setAdress } =
    usePrescriptionStore();

  return (
    <header className={style.header}>
      <h2>RECEITUÁRIO DE CONTROLE ESPECIAL</h2>
      <div className={style.issuerIdentificationContainer}>
        <div className={style.issuerInstructions}>
          <div>1ª via - Farmácia</div>
          <div>2ª via - Usuário</div>
        </div>
        <p className={style.issuerTitle}>IDENTIFICAÇÃO DO EMITENTE</p>
        <div className={style.issuerForm}>
          <div className={`${style.formField} ${style.healthUnit}`}>
            <span>Nome Completo:</span>
            <input
              className="hideOnPrint"
              value={issuer?.name}
              onChange={(e) => setIssuer({ name: e.target.value })}
            />
            <div className="showOnPrint"> {issuer?.name}</div>
          </div>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <div className={style.formField} style={{ flex: 1 }}>
              <span>CRM:</span>
              <input
                className="hideOnPrint"
                value={issuer?.crm}
                onChange={(e) => setIssuer({ crm: e.target.value })}
              />
              <div className="showOnPrint"> {issuer?.crm}</div>
            </div>
            <Box
              sx={{
                display: "flex",
                gap: "0.5rem",
                width: "90px",
                alignItems: "center",
              }}
            >
              <span>UF:</span>
              <input
                className="hideOnPrint"
                value={issuer?.uf}
                onChange={(e) => setIssuer({ uf: e.target.value })}
                style={{ width: "50px" }}
              />
              <div className="showOnPrint"> {issuer?.uf}</div>
            </Box>
          </Box>
          <div className={style.formField} style={{ flex: 1 }}>
            <span>Endereço:</span>
            <input
              className="hideOnPrint"
              value={issuer?.address}
              onChange={(e) => setIssuer({ address: e.target.value })}
            />
            <div className="showOnPrint"> {issuer?.address}</div>
          </div>
          <div className={style.formField} style={{ flex: 1 }}>
            <span>CNPJ:</span>
            <input
              className="hideOnPrint"
              value={issuer?.cnpj}
              onChange={(e) => setIssuer({ cnpj: e.target.value })}
            />
            <div className="showOnPrint"> {issuer?.cnpj}</div>
          </div>
          <div className={style.formField} style={{ flex: 1 }}>
            <span>Telefone:</span>
            <input
              className="hideOnPrint"
              value={issuer?.phone}
              onChange={(e) => setIssuer({ phone: e.target.value })}
            />
            <div className="showOnPrint"> {issuer?.phone}</div>
          </div>
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.formField}>
          <span>USUÁRIO:</span>
          <input
            className="hideOnPrint"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
          <div className="showOnPrint"> {patientName}</div>
        </div>
        <div className={style.formField}>
          <span>ENDEREÇO:</span>
          <input
            className="hideOnPrint"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
          />
          <div className="showOnPrint"> {adress}</div>
        </div>
      </div>
    </header>
  );
};

export default SpecialPrescriptionHeader;
