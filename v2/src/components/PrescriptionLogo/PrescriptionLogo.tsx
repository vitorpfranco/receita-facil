import style from "./style.module.scss";
import { usePrescriptionStore } from "../../store/prescription";
import { prescriptionTypeOptions } from "../../utils/prescriptionTypeUtils";

const PrescriptionLogo: React.FC = () => {
  const {
    prescriptionTypeValue
  } = usePrescriptionStore();


  const prescriptionType = prescriptionTypeOptions.find((option) => option.value === prescriptionTypeValue);
return prescriptionType && prescriptionType.imageUrl ? (
  <div className={style.prescriptionLogo}>
    <img src={`/prescriptions/${prescriptionType.imageUrl}`} alt={prescriptionType.label} />
  </div>
) : null;

};

export default PrescriptionLogo;
