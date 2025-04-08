import React, { useEffect, useMemo, useState } from "react";
import { Box, Tabs, Tab, Button, Menu, MenuItem } from "@mui/material";
import { Drug } from "../../types/drug";
import style from "./style.module.scss";
import { useIcon, useSupportedIcons } from "../../hooks/useIcon";

type IconsSelectionProps = {
  drug?: Drug;
  updateSelectedDrug: (uuid: string, updates: Partial<Drug>) => void;
};

// Lista de cores disponíveis
const colorOptions = [
  { label: "Branco", value: "#FFFFFF" },
  { label: "Azul", value: "#007BFF" },
  { label: "Vermelho", value: "#DC3545" },
  { label: "Amarelo", value: "#FFC107" },
  { label: "Verde", value: "#28A745" },
  { label: "Laranja", value: "#FD7E14" },
  { label: "Rosa", value: "#E83E8C" },
  { label: "Roxo/Lilás", value: "#6F42C1" },
  { label: "Preto/Cinza", value: "#343A40" },
];

function formatCategoryName(category: string) {
  return category.replace(/^\d+\s*/, "");
}

const IconsSelection: React.FC<IconsSelectionProps> = ({
  drug,
  updateSelectedDrug,
}) => {
  const { data: supportedIcons } = useSupportedIcons();
  const categories = Object.keys(supportedIcons || {});
  const [selectedTab, setSelectedTab] = useState(0);
  const [primaryColor, setPrimaryColor] = useState<string>("#FFFFFF");
  const [secondaryColor, setSecondaryColor] = useState<string>("#FF0000");

  const [primaryAnchorEl, setPrimaryAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [secondaryAnchorEl, setSecondaryAnchorEl] =
    useState<null | HTMLElement>(null);

  const formattedCategories = useMemo(() => {
    return categories.map(formatCategoryName);
  }, [categories]);

  const addNewIcon = (icon: string) => {
    if (!drug) return;

    const currentIcons = drug.icons || [];
    const updatedIcons = [...currentIcons, icon];
    updateSelectedDrug(drug.uuid!, { icons: updatedIcons });
    drug.icons = updatedIcons;
  };

  return (
    <Box
      sx={{
        height: "400px",
        width: "900px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: "30px",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "10px",
          display: "flex",
          gap: "10px",
        }}
      >
        <label htmlFor="primary-color-select">Cor Primária:</label>
        <Button
          component="span"
          onClick={(e) => setPrimaryAnchorEl(e.currentTarget)}
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: primaryColor,
            padding: 0,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "4px",
            marginRight: "10px",
            border: "1px solid #000",
            cursor: "pointer",
          }}
        />
        <Menu
          anchorEl={primaryAnchorEl}
          open={Boolean(primaryAnchorEl)}
          onClose={() => setPrimaryAnchorEl(null)}
        >
          {colorOptions.map((color) => (
            <MenuItem
              key={color.value}
              onClick={() => {
                setPrimaryColor(color.value);
                setPrimaryAnchorEl(null);
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: color.value,
                  display: "inline-block",
                  marginRight: 1,
                  border: "1px solid #000",
                }}
              />
              {color.label}
            </MenuItem>
          ))}
        </Menu>
        <label htmlFor="secondary-color-select">Cor Secundária:</label>
        <Button
          component="span"
          onClick={(e) => setSecondaryAnchorEl(e.currentTarget)}
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: secondaryColor,
            padding: 0,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "4px",
            marginRight: "10px",
            border: "1px solid #000",
            cursor: "pointer",
          }}
        />
        <Menu
          anchorEl={secondaryAnchorEl}
          open={Boolean(secondaryAnchorEl)}
          onClose={() => setSecondaryAnchorEl(null)}
        >
          {colorOptions.map((color) => (
            <MenuItem
              key={color.value}
              onClick={() => {
                setSecondaryColor(color.value);
                setSecondaryAnchorEl(null);
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: color.value,
                  display: "inline-block",
                  marginRight: 1,
                  border: "1px solid #000",
                }}
              />
              {color.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Tabs
        value={selectedTab}
        onChange={(_event, newValue) => setSelectedTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {formattedCategories.map((category, index) => (
          <Tab
            key={index}
            label={category}
            sx={{ textTransform: "capitalize" }}
          />
        ))}
      </Tabs>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.7rem",
          padding: "1rem",
          overflow: "auto",
          height: "fit-content",
        }}
      >
        {supportedIcons &&
          supportedIcons[categories[selectedTab]].map((icon, idx) => {
            if (icon.endsWith(".svg")) {
              return (
                <div key={idx} style={{ height: "3rem" }}>
                  <SVGIconRenderer
                    addNewIcon={addNewIcon}
                    icon={icon}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                  />
                </div>
              );
            } else {
              return (
                <img
                  key={idx}
                  src={icon}
                  alt={`Icon ${idx}`}
                  className={style.iconImage}
                  onClick={() => addNewIcon(icon)}
                />
              );
            }
          })}
      </Box>
    </Box>
  );
};

const SVGIconRenderer: React.FC<{
  icon: string;
  primaryColor: string;
  secondaryColor: string;
  addNewIcon: (svg: string) => void;
}> = ({ icon, primaryColor, secondaryColor, addNewIcon }) => {
  const { data: svgContent, isLoading } = useIcon(icon);
  const [processedSvg, setProcessedSvg] = useState<string | null>(null);

  useEffect(() => {
    if (svgContent) {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");

      svgDoc.querySelectorAll(".primary").forEach((el) => {
        (el as HTMLElement).style.fill = primaryColor;
      });

      svgDoc.querySelectorAll(".secondary").forEach((el) => {
        (el as HTMLElement).style.fill = secondaryColor;
      });

      const updatedSvgString = new XMLSerializer().serializeToString(svgDoc);
      setProcessedSvg(updatedSvgString);
    }
  }, [svgContent, primaryColor, secondaryColor]);

  if (isLoading) return <div>...</div>;

  return processedSvg ? (
    <div
      dangerouslySetInnerHTML={{ __html: processedSvg }}
      className={style.iconImage}
      onClick={() => addNewIcon(processedSvg)}
    />
  ) : (
    <div>...</div>
  );
};

export default IconsSelection;
