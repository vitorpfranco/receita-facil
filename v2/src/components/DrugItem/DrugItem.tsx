import React, { useEffect, useRef, useState } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import style from "./style.module.scss";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { Drug } from "../../types/drug";
import { usePrescriptionStore } from "../../store/prescription";
import InstructionForDoctors from "../InstructionForDoctors";
import RouteSelector from "../RouteSelector";
import DrugIcons from "../DrugIcons";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import { Box, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

type DrugItemProps = {
  drug: Drug;
  index: number;
  handleOpen?: (event: React.MouseEvent<HTMLButtonElement>, drug: Drug) => void;
};

const DrugItem: React.FC<DrugItemProps> = ({ drug, index, handleOpen }) => {
  const controls = useDragControls();
  const y = useMotionValue(0);
  const { removeSelectedDrug, updateSelectedDrug } = usePrescriptionStore();

  const [editableText, setEditableText] = useState(drug.instructions || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  const removeImage = () => {
    updateSelectedDrug(drug.uuid!, { image_url: undefined });
  };

  const isImageOrVideo = drug?.is_image || drug?.is_link;
  useEffect(() => {
    const handleBeforePrint = () => {
      setEditableText(drug.instructions || "");
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
    };
  }, [drug.instructions]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableText(e.target.value);
    updateSelectedDrug(drug.uuid!, { instructions: e.target.value });
  };

  useEffect(() => {
    if (spanRef.current && textareaRef.current) {
      const textWidth = spanRef.current.offsetWidth;

      textareaRef.current.style.width = `${textWidth + 30}px`;
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [editableText]);
  return (
    <>
      <Reorder.Item
        style={{ y }}
        value={drug}
        dragControls={controls}
        dragListener={false}
        layout="position"
      >
        <div className={style.drugItem}>
          {!isImageOrVideo && (
            <RouteSelector
              drug={drug}
              updateSelectedDrug={updateSelectedDrug}
            />
          )}
          <div className={style.drugInfoContainer}>
            <div className={style.drugInfo}>
              {!isImageOrVideo && (
                <>
                  <span>{index})</span>
                  <span ref={spanRef} className={style.drugTextPrint}>
                    {editableText || " "}
                  </span>
                  <div className={`${style.drugTextWrapper} hideOnPrint`}>
                    <textarea
                      ref={textareaRef}
                      className={style.drugText}
                      value={editableText}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}{" "}
              {drug.is_image && (
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <img
                    width={"80%"}
                    height={"auto"}
                    src={`https://storage.googleapis.com/receita-facil-prescribed-images/${drug.instructions}`}
                    alt=""
                  />
                </Box>
              )}
              {drug.is_link && (
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <span>{drug.name}</span>
                  <img
                    width={"20%"}
                    height={"auto"}
                    src={`https://image-charts.com/chart?chs=80x80&cht=qr&chl=${drug.instructions}`}
                    alt=""
                  />
                </Box>
              )}
              {drug.icons && !isImageOrVideo && (
                <DrugIcons
                  drug={drug}
                  updateSelectedDrug={updateSelectedDrug}
                ></DrugIcons>
              )}
              <>
                <DragIndicatorIcon
                  onPointerDown={(e) => controls.start(e)}
                  className={`${style.drugDrag} hideOnPrint`}
                />
                <div className={`${style.drugActions} hideOnPrint`}>
                  {!isImageOrVideo && (
                    <IconButton onClick={(event) => handleOpen!(event, drug)}>
                      <AddReactionOutlinedIcon />
                    </IconButton>
                  )}
                  <IconButton onClick={() => removeSelectedDrug(drug)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </>
            </div>
            {drug.image_url && (
              <div className={style.drugImage}>
                <HighlightOffIcon
                  className={`${style.removeImageIcon} hideOnPrint`}
                  onClick={() => removeImage()}
                />
                <img src={drug.image_url} />
              </div>
            )}
          </div>
          {drug.instructions_for_doctors && (
            <InstructionForDoctors
              instruction={drug.instructions_for_doctors}
              drugUuid={drug.uuid!}
            />
          )}
        </div>
      </Reorder.Item>
    </>
  );
};

export default DrugItem;
