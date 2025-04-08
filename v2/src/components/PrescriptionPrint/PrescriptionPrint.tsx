/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePrescriptionStore } from "../../store/prescription";
import DrugItem from "../DrugItem";
import style from "./style.module.scss";
import { Reorder } from "framer-motion";
import PrescriptionHeader from "../PrescriptionHeader";
import PrescriptionFooter from "../PrescriptionFooter";
import PrescriptionLogo from "../PrescriptionLogo";
import SpecialPrescriptionHeader from "../SpecialPrescriptionHeader";
import SpecialPrescriptionFooter from "../SpecialPrescriptionFooter";
import { useEffect } from "react";

const PrescriptionPrint: React.FC = () => {
  const {
    selectedDrugs,
    setSelectedDrugs,
    specialPrescription,
    duplicatePrescription,
    patientName,
  } = usePrescriptionStore();
  useEffect(() => {
    const originalTitle = document.title;

    const handleBeforePrint = () => {
      console.log("before print", patientName);
      if (patientName) {
        document.title = patientName;
      }
      if (duplicatePrescription) {
        const style = document.createElement("style");
        style.innerHTML = `
            @page {
              size: A4 landscape; 
            }
          `;
        style.id = "print-style";
        document.head.appendChild(style);
      }
    };

    const handleAfterPrint = () => {
      const style = document.getElementById("print-style");
      document.title = originalTitle;
      if (style) style.remove();
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
      handleAfterPrint();
    };
  }, [duplicatePrescription, patientName]);
  return (
    <div
      className={`${style.prescriptionPrintContainer} ${
        duplicatePrescription ? style.duplicated : ""
      }`}
    >
      {[...Array(duplicatePrescription ? 2 : 1)].map((_, index) => (
        <div key={index} className={style.prescriptionPrint}>
          <PrescriptionLogo />
          {specialPrescription ? (
            <SpecialPrescriptionHeader />
          ) : (
            <PrescriptionHeader />
          )}
          <Reorder.Group
            axis="y"
            values={selectedDrugs}
            onReorder={setSelectedDrugs}
            className={style.prescriptionBody}
            as="div"
          >
            {selectedDrugs.map((item, index) => {
              return <DrugItem key={item.uuid} drug={item} index={index + 1} />;
            })}
          </Reorder.Group>
          {specialPrescription ? (
            <SpecialPrescriptionFooter />
          ) : (
            <PrescriptionFooter />
          )}
        </div>
      ))}
    </div>
  );
};

export default PrescriptionPrint;
