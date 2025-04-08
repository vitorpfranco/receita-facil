import React from "react";
import PrescriptionHeader from "../components/PrescriptionHeader";
import PrescriptionBody from "../components/PrescriptionBody";
import PrescriptionFooter from "../components/PrescriptionFooter";
import style from "./prescription.module.scss";
import PrescriptionControls from "../components/PrescriptionControls";
import PrescriptionLogo from "../components/PrescriptionLogo";
import { usePrescriptionStore } from "../store/prescription";
import SpecialPrescriptionHeader from "../components/SpecialPrescriptionHeader";
import SpecialPrescriptionFooter from "../components/SpecialPrescriptionFooter";

const Prescription: React.FC = () => {
  const { specialPrescription } = usePrescriptionStore();

  return (
    <>
      <div className={`${style.prescription} hideOnPrint`}>
        <PrescriptionControls />
        <PrescriptionLogo />
        {specialPrescription ? (
          <SpecialPrescriptionHeader />
        ) : (
          <PrescriptionHeader />
        )}

        <PrescriptionBody />
        {specialPrescription ? (
          <SpecialPrescriptionFooter />
        ) : (
          <PrescriptionFooter />
        )}
      </div>
    </>
  );
};

export default Prescription;
