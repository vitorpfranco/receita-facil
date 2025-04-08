import style from "./style.module.scss";
import { usePrescriptionStore } from "../../store/prescription";

const PrescriptionHeader: React.FC = () => {
  const {
    healthUnit,
    setHealthUnit,
    patientName,
    setPatientName,
    recordNumber,
    setRecordNumber,
  } = usePrescriptionStore();

  return (
    <header className={style.header}>
      <h2>RECEITUÁRIO</h2>
      <div className={`${style.formField} ${style.healthUnit}`}>
        <span>ESTABELECIMENTO DE SAÚDE:</span>
        <input
          className="hideOnPrint"
          value={healthUnit}
          onChange={(e) => setHealthUnit(e.target.value)}
        />
        <div className="showOnPrint"> {healthUnit}</div>
      </div>
      <div className={style.gridContainer}>
        <div className={style.formField}>
          <span>NOME:</span>
          <input
            className="hideOnPrint"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
          <div className="showOnPrint"> {patientName}</div>
        </div>
        <div className={style.formField}>
          <span>REGISTRO Nº:</span>
          <input
            className="hideOnPrint"
            value={recordNumber}
            onChange={(e) => setRecordNumber(e.target.value)}
          />
          <div className="showOnPrint"> {recordNumber}</div>
        </div>
      </div>
    </header>
  );
};

export default PrescriptionHeader;
