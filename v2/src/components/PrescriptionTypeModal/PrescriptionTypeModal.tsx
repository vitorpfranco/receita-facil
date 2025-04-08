

import { Box } from "@mui/material";
import LogoColored from "../../assets/logo_colored.svg";
import PrescriptionTypeSelect from "../PrescriptionTypeSelect";
import { usePrescriptionStore } from "../../store/prescription";

const PrescriptionTypeModal: React.FC = () => {
    const {
        prescriptionTypeValue,
        setPrescriptionTypeValue,
        showPrescriptionTypeModal,
        setShowPrescriptionTypeModal,
    } = usePrescriptionStore();

return (
  <>
    {(!prescriptionTypeValue || showPrescriptionTypeModal) && (
      <Box
        sx={{
          width: "100vw",
          minWidth: "1350px",
          height: "100vh",
          minHeight: "700px",
          position: "fixed",
          backgroundColor: "rgba(151, 179, 183, 0.7)",
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10rem",
        }}
      >
        <img src={LogoColored} width={378} />
        <Box
          sx={{
            width: "3px",
            height: "800px",
            background: "rgba(15, 96, 106, 1)",
          }}
        ></Box>
        <PrescriptionTypeSelect
          prescriptionTypeValue={prescriptionTypeValue}
          setPrescriptionTypeValue={setPrescriptionTypeValue}
          setShowPrescriptionTypeModal={setShowPrescriptionTypeModal}
        />
      </Box>
    )}
  </>
);
}

export default PrescriptionTypeModal;

