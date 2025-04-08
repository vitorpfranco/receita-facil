import { useState } from "react";
import { usePrescriptionStore } from "../../store/prescription";
import DrugItem from "../DrugItem";
import style from "./style.module.scss";
import { Reorder } from "framer-motion";
import { Popover } from "@mui/material";
import IconsSelection from "../IconsSelection";
import { Drug } from "../../types/drug";

const PrescriptionBody: React.FC = () => {
  const [anchorIconSelection, setIconSelectionAnchor] =
    useState<HTMLElement | null>(null);
  const [selectedDrug, setSelectedDrug] = useState<Drug | undefined>(undefined);

  const { selectedDrugs, setSelectedDrugs, updateSelectedDrug } =
    usePrescriptionStore();
  const handleOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    drug: Drug
  ) => {
    setIconSelectionAnchor(event.currentTarget);
    setSelectedDrug(drug);
  };
  const handleIconsSelectionClose = () => {
    setIconSelectionAnchor(null);
    setSelectedDrug(undefined);
  };
  return (
    <div className={style.prescriptionBody}>
      <Reorder.Group
        axis="y"
        values={selectedDrugs}
        onReorder={setSelectedDrugs}
      >
        {selectedDrugs.map((item, index) => {
          return (
            <DrugItem
              handleOpen={handleOpen}
              key={item.uuid}
              drug={item}
              index={index + 1}
            />
          );
        })}
      </Reorder.Group>
      <Popover
        open={Boolean(anchorIconSelection)}
        anchorEl={anchorIconSelection}
        onClose={handleIconsSelectionClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{ mt: -8, ml: -2 }}
      >
        <IconsSelection
          updateSelectedDrug={updateSelectedDrug}
          drug={selectedDrug}
        ></IconsSelection>
      </Popover>
    </div>
  );
};

export default PrescriptionBody;
