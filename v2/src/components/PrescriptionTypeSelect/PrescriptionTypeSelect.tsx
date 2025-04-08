import {
  prescriptionTypeOptions,
  PrescriptionTypeValues,
} from "../../utils/prescriptionTypeUtils";
import style from "./style.module.scss";
import CloseIcon from "@mui/icons-material/Close";

type PrescriptionTypeSelect = {
  prescriptionTypeValue: string | null;
  setPrescriptionTypeValue: (
    prescriptionTypeValue: PrescriptionTypeValues
  ) => void;
  setShowPrescriptionTypeModal: (show: boolean) => void;
};

const PrescriptionTypeSelect: React.FC<PrescriptionTypeSelect> = ({
  prescriptionTypeValue,
  setPrescriptionTypeValue,
  setShowPrescriptionTypeModal,
}) => {
  const closeSelection = () => {
    if (prescriptionTypeValue === null) {
      setPrescriptionTypeValue("default");
      localStorage.setItem("prescriptionTypeValue", "default");
    }
    setShowPrescriptionTypeModal(false);
  };

  const selectPrescriptionType = (value: PrescriptionTypeValues) => {
    localStorage.setItem("prescriptionTypeValue", value);
    setPrescriptionTypeValue(value);
    setShowPrescriptionTypeModal(false);
  };
  const selectedType = prescriptionTypeOptions?.find(
    (type) => type.value === prescriptionTypeValue
  );
  return (
    <>
      <div className={style.selectTypeContainer}>
        <div className={style.selectedType}>
          {selectedType?.label || "Escolha o seu receituário"}
        </div>
        <div className={style.selectTypeOptions}>
          {prescriptionTypeOptions.map((option) => {
            if (option.value !== prescriptionTypeValue)
              return (
                <div
                  key={option.value}
                  className={style.option}
                  onClick={() => selectPrescriptionType(option.value)}
                >
                  {option.label}
                </div>
              );
          })}
        </div>
      </div>
      <CloseIcon
        className={style.selectTypeCloseIcon}
        onClick={() => closeSelection()}
      ></CloseIcon>
    </>
  );
};

export default PrescriptionTypeSelect;
