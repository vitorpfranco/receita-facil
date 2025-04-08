import { usePrescriptionStore } from "../../store/prescription";
import style from "./style.module.scss";

const PrescriptionFooter: React.FC = () => {
  const today = new Date().toLocaleDateString("pt-BR");
  const {hideDate} = usePrescriptionStore();
  return (
    <footer className={style.footer}>
      {hideDate ? (
        <div>
          <div>
            Data:  <b>_______________</b>
          </div>
          <div>
            Este receituário só é válido com datação, assinatura e identificação
            do médico responsável
          </div>
        </div>
      ) : (
        <div>Data: {today} </div>
      )}
      <div className={style.signature}>(ASSINATURA E CARIMBO)</div>
    </footer>
  );
};

export default PrescriptionFooter;
