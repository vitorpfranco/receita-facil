import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Drug } from "../../types/drug";
import style from "./style.module.scss";

type DrugIconsProps = {
  drug: Drug;
  updateSelectedDrug: (uuid: string, updates: Partial<Drug>) => void;
};

const DrugIcons: React.FC<DrugIconsProps> = ({ drug, updateSelectedDrug }) => {
  const icons = drug?.icons || [];
  const moveIcon = (index: number, direction: "left" | "right") => {
    const updatedIcons = [...icons];
    const newIndex = direction === "left" ? index - 1 : index + 1;

    [updatedIcons[index], updatedIcons[newIndex]] = [
      updatedIcons[newIndex],
      updatedIcons[index],
    ];

    updateSelectedDrug(drug.uuid!, { icons: updatedIcons });
  };

  const removeIcon = (indexToRemove: number) => {
    const updatedIcons = icons.filter((_, index) => index !== indexToRemove);

    updateSelectedDrug(drug.uuid!, { icons: updatedIcons });
  };

  return (
    <div className={style.drugIcons}>
      {icons.map((icon, idx) => {
        const isSvg =
          icon.trim().startsWith("<svg") || icon.trim().startsWith("<?xml");

        return (
          <div key={idx} className={style.drugIcon}>
            {isSvg ? (
              <div
                dangerouslySetInnerHTML={{ __html: icon }}
                className={style.svgIcon}
              />
            ) : (
              <img draggable="false" src={icon} alt={`Icon ${idx}`} />
            )}
            {idx > 0 && (
              <ArrowBackIosIcon
                className={`${style.moveLeft} ${style.moveIcon}`}
                onClick={() => moveIcon(idx, "left")}
              />
            )}
            <HighlightOffIcon
              className={`${style.drugIconDeleteButton} hideOnPrint`}
              onClick={() => removeIcon(idx)}
            />
            {idx < icons.length - 1 && (
              <ArrowForwardIosIcon
                className={`${style.moveRight} ${style.moveIcon}`}
                onClick={() => moveIcon(idx, "right")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DrugIcons;
