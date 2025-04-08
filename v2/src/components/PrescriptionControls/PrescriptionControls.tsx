import style from "./style.module.scss";
import { usePrescriptionStore } from "../../store/prescription";
import ControlledSwitch from "../ControlledSwitch";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";

import { Box, Button, Tooltip } from "@mui/material";
import { specialPrescriptionEnabledCities } from "../../utils/prescriptionTypeUtils";

const PrescriptionControls: React.FC = () => {
  const {
    hideDate,
    setHideDate,
    specialPrescription,
    setSpecialPrescription,
    duplicatePrescription,
    setDuplicatePrescription,
    setShowPrescriptionTypeModal,
    resetSelectedDrugs,
    prescriptionTypeValue,
  } = usePrescriptionStore();

  return (
    <div className={`${style.prescriptionControl} hideOnPrint`}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<ChangeCircleOutlinedIcon />}
        sx={{ borderRadius: "18px", marginRight: "auto" }}
        onClick={() => {
          setShowPrescriptionTypeModal(true);
        }}
      >
        Mudar Receituário
      </Button>
      <ControlledSwitch
        active={hideDate}
        setActive={setHideDate}
        label="Ocultar data"
      ></ControlledSwitch>

      <Tooltip
        title={
          specialPrescriptionEnabledCities.includes(prescriptionTypeValue!)
            ? ""
            : "O receituário especial ainda não está habilitado para este município"
        }
        arrow
      >
        <span>
          <ControlledSwitch
            disabled={
              !specialPrescriptionEnabledCities.includes(prescriptionTypeValue!)
            }
            active={specialPrescription}
            setActive={setSpecialPrescription}
            label="Controle Especial"
          />
        </span>
      </Tooltip>
      <ControlledSwitch
        active={duplicatePrescription}
        setActive={setDuplicatePrescription}
        label="Duplicar Pagina"
      ></ControlledSwitch>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        sx={{ borderRadius: "18px" }}
        onClick={() => {
          print();
        }}
      >
        Imprimir
      </Button>
      <Box
        component={"span"}
        sx={{
          marginLeft: 1,
          cursor: "pointer",
          textDecoration: "underline",
          color: "#376FDE",
        }}
        onClick={resetSelectedDrugs}
      >
        limpar receita
      </Box>
    </div>
  );
};

export default PrescriptionControls;
