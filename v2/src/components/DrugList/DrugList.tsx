import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import style from "./style.module.scss";
import { Drug } from "../../types/drug";
import { usePrescriptionStore } from "../../store/prescription";

import Cardiovascular from "../../assets/icons/Cardiovascular.svg?react";
import Curativo from "../../assets/icons/Curativo.svg?react";

import Coloproctologia from "../../assets/icons/Colocprotologia.svg?react";

import Endocrinologia from "../../assets/icons/Endocrinologia.svg?react";
import Dermatologia from "../../assets/icons/Dermatologia.svg?react";
import FarmaciaPopular from "../../assets/icons/FarmaciaPopular.svg?react";
import Gastroenterologia from "../../assets/icons/Gastroenterologia.svg?react";
import NuncaNegligenciar from "../../assets/icons/NuncaNegligenciar.svg?react";
import Oftalmologia from "../../assets/icons/Oftalmologia.svg?react";
import Ortopedia from "../../assets/icons/Ortopedia.svg?react";
import Otorrinolaringologia from "../../assets/icons/Otorrinolaringologia.svg?react";
import Pediatria from "../../assets/icons/Pediatria.svg?react";
import Pneumologia from "../../assets/icons/Pneumologia.svg?react";
import Reumatologia from "../../assets/icons/Reumatologia.svg?react";
import SaudeBucal from "../../assets/icons/SaudeBucal.svg?react";
import SaudeHomem from "../../assets/icons/SaudeHomem.svg?react";
import SaudeMulher from "../../assets/icons/SaudeMulher.svg?react";
import SaudeMental from "../../assets/icons/SaudeMental.svg?react";
import Sintomaticos from "../../assets/icons/Sintomaticos.svg?react";
import SintomaticosInjetaveis from "../../assets/icons/SintomaticosInjetaveis.svg?react";
import AntibioticosEmAPS from "../../assets/icons/AntibioticosEmAPS.svg?react";

import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import MedicationIcon from "@mui/icons-material/Medication";
import { useDrugs } from "../../hooks/useDrugsQuery";

type DrugListProps = {
  searchDrug?: string;
};

const categoryIcons: Record<string, JSX.Element> = {
  "ANTIBIÓTICOS EM APS": <AntibioticosEmAPS />,
  CARDIOVASCULAR: <Cardiovascular />,
  COLOPROCTOLOGIA: <Coloproctologia />,
  CURATIVOS: <Curativo />,
  ENDOCRINOLOGIA: <Endocrinologia />,
  DERMATOLOGIA: <Dermatologia />,
  "FARMÁCIA POPULAR": <FarmaciaPopular />,
  GASTROENTEROLOGIA: <Gastroenterologia />,
  "NUNCA NEGLIGENCIAR": <NuncaNegligenciar />,
  OFTALMOLOGIA: <Oftalmologia />,
  ORTOPEDIA: <Ortopedia />,
  OTORRINOLARINGOLOGIA: <Otorrinolaringologia />,
  PEDIATRIA: <Pediatria />,
  PNEUMOLOGIA: <Pneumologia />,
  REUMATOLOGIA: <Reumatologia />,
  "SAÚDE BUCAL": <SaudeBucal />,
  "SAÚDE DO HOMEM": <SaudeHomem />,
  "SAÚDE DA MULHER": <SaudeMulher />,
  "SAÚDE MENTAL": <SaudeMental />,
  SINTOMÁTICOS: <Sintomaticos />,
  "SINTOMÁTICOS INJETÁVEIS": <SintomaticosInjetaveis />,
  IMAGENS: <InsertPhotoOutlinedIcon sx={{ color: "black" }} />,
  VIDEOS: <SmartDisplayOutlinedIcon sx={{ color: "black" }} />,
  ANTIBIÓTICOS: <MedicationIcon sx={{ color: "black" }}></MedicationIcon>,
};

function capitalizeWords(sentence: string) {
  return sentence
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const DrugList: React.FC<DrugListProps> = ({ searchDrug = "" }) => {
  const { data: drugs = [], isLoading } = useDrugs();

  const { addSelectedDrug } = usePrescriptionStore();

  const filteredDrugs = useMemo(() => {
    if (!searchDrug) return drugs;
    return drugs.filter((drug) => {
      if (!drug.name) return false;
      return drug.name.toLowerCase().includes(searchDrug.toLowerCase() || "");
    });
  }, [searchDrug, drugs]);
  const categoriesMap = useMemo(() => {
    const map = new Map<string, Map<string | null, Drug[]>>();

    drugs.forEach((drug) => {
      if (!drug.categories_v2) return;
      drug.categories_v2.forEach(({ top_level_group, subgroup }) => {
        const topLevelUperCase = top_level_group.toUpperCase();
        const subgroupUperCase = subgroup?.toUpperCase();

        if (topLevelUperCase === "*DELETAR*") return;
        if (searchDrug && !subgroupUperCase?.includes(searchDrug.toUpperCase()))
          return;

        if (!map.has(topLevelUperCase)) {
          map.set(topLevelUperCase, new Map());
        }

        const subcategoryMap = map.get(topLevelUperCase)!;

        if (!subcategoryMap.has(subgroupUperCase || null)) {
          subcategoryMap.set(subgroupUperCase || null, []);
        }
        subcategoryMap.get(subgroupUperCase || null)!.push(drug);
      });
    });

    return map;
  }, [drugs, searchDrug]);

  // drugs.forEach((drug) => {
  //   if (!drug.categories_v2) return;
  //   drug.categories_v2.forEach(({ top_level_group, subgroup }) => {
  //     const topLevelUperCase = top_level_group.toUpperCase();
  //     const subgroupUperCase = subgroup?.toUpperCase();
  //     if (topLevelUperCase === "*DELETAR*") return;
  //     if (searchDrug && !subgroupUperCase?.includes(searchDrug.toUpperCase()))
  //       return;

  //     if (!categoriesMap.has(topLevelUperCase)) {
  //       categoriesMap.set(topLevelUperCase, new Map());
  //     }
  //     const subcategoryMap = categoriesMap.get(topLevelUperCase)!;
  //     if (!subcategoryMap.has(subgroupUperCase || null)) {
  //       subcategoryMap.set(subgroupUperCase || null, []);
  //     }
  //     subcategoryMap.get(subgroupUperCase || null)!.push(drug);
  //   });
  // });

  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubcategory, setOpenSubcategory] = useState<string | null>(null);

  const handleToggleCategory = (category: string) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  const handleToggleSubcategory = (subcategory: string) => {
    setOpenSubcategory((prev) => (prev === subcategory ? null : subcategory));
  };
  if (isLoading) {
    return <div>Carregando...</div>;
  }
  if (searchDrug && filteredDrugs.length === 0 && categoriesMap.size === 0) {
    return <div>Nenhum medicamento encontrado</div>;
  }

  if (searchDrug) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {filteredDrugs.map((drugItem) => (
          <Box
            sx={{
              cursor: "pointer",
              padding: "10px 0rem 10px 4px",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
            }}
            key={drugItem.id}
            onClick={() => {
              addSelectedDrug(drugItem);
            }}
          >
            <Box
              component={"p"}
              sx={{ fontSize: "0.7rem", color: "#376FDE", fontWeight: "bold" }}
            >
              {drugItem.categories_v2
                ?.map((category) => category.top_level_group)
                .join(" | ")}
            </Box>
            <p>{drugItem.name}</p>
          </Box>
        ))}
        {categoriesMap.size > 0 && (
          <Divider sx={{ marginTop: "4px", marginBottom: "4px" }}></Divider>
        )}
        {[...categoriesMap.keys()].map((category) => {
          const subcategoriesMap = categoriesMap.get(category)!;

          return (
            <React.Fragment key={category}>
              {[...subcategoriesMap.keys()].map((subcategory) => {
                const drugsList = subcategoriesMap.get(subcategory)!;
                if (drugsList.length === 0) return null;

                return (
                  <React.Fragment
                    key={`${category}-${subcategory || "without-subgroup"}`}
                  >
                    <ListItemButton
                      style={{
                        backgroundColor:
                          openSubcategory === subcategory
                            ? "rgba(0,0,0,0.04)"
                            : "transparent",
                        borderRadius: "0.5rem",
                        padding: "8px 0px 8px 4px",
                      }}
                      onClick={() => handleToggleSubcategory(subcategory!)}
                    >
                      <ListItemText
                        primary={
                          <>
                            <Box
                              component={"p"}
                              sx={{
                                fontSize: "0.7rem",
                                color: "#376FDE",
                                fontWeight: "bold",
                              }}
                            >
                              {capitalizeWords(category)}
                            </Box>
                            <p>{capitalizeWords(subcategory!)}</p>
                          </>
                        }
                      />

                      {openSubcategory === subcategory ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItemButton>

                    <Collapse
                      in={openSubcategory === subcategory}
                      timeout="auto"
                      unmountOnExit
                      className={style.collapsedContainer}
                    >
                      <List component="div">
                        {drugsList.map((drugItem) => (
                          <ListItemButton
                            key={drugItem.id}
                            sx={{ pl: "35px" }}
                            onClick={() => {
                              addSelectedDrug(drugItem);
                            }}
                          >
                            <ListItemText primary={drugItem.name} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}
      </Box>
    );
  }

  const pinnedCategories = [
    "IMAGENS",
    "VIDEOS",
    "CARDIOVASCULAR",
    "ENDOCRINOLOGIA",
  ];

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
    >
      {[...categoriesMap.keys()]
        .sort((a, b) => {
          const indexA = pinnedCategories.indexOf(a);
          const indexB = pinnedCategories.indexOf(b);
          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
          }
          if (indexA !== -1) return -1;
          if (indexB !== -1) return 1;

          if (a === "ANTIBIÓTICOS") return 1;
          if (b === "ANTIBIÓTICOS") return -1;

          return a.localeCompare(b);
        })
        .map((category) => {
          const subcategoriesMap = categoriesMap.get(category)!;

          return (
            <React.Fragment key={category}>
              <ListItemButton
                style={{
                  backgroundColor:
                    openCategory === category ? "#0000000D" : "transparent",
                  borderRadius: "0.5rem",
                  padding: "8px 0px 8px 4px",
                }}
                onClick={() => handleToggleCategory(category)}
              >
                <div className={style.categoryIcon}>
                  {categoryIcons[category] || <FavoriteIcon />}
                </div>

                <ListItemText primary={capitalizeWords(category)} />
                {openCategory === category ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse
                className={style.collapsedContainer}
                in={openCategory === category}
                timeout="auto"
                unmountOnExit
              >
                <List component="div">
                  {[...subcategoriesMap.keys()].map((subcategory) => {
                    const drugsList = subcategoriesMap.get(subcategory)!;

                    return (
                      <React.Fragment
                        key={`${category}-${subcategory || "without-subgroup"}`}
                      >
                        {subcategory ? (
                          <>
                            <ListItemButton
                              sx={{ pl: 4 }}
                              onClick={() =>
                                handleToggleSubcategory(subcategory!)
                              }
                            >
                              <ListItemText
                                primary={capitalizeWords(subcategory!)}
                              />
                              {openSubcategory === subcategory ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </ListItemButton>

                            <Collapse
                              in={openSubcategory === subcategory}
                              timeout="auto"
                              unmountOnExit
                            >
                              <List component="div">
                                {drugsList.map((drugItem) => (
                                  <ListItemButton
                                    key={drugItem.id}
                                    sx={{ pl: "3rem" }}
                                    onClick={() => {
                                      addSelectedDrug(drugItem);
                                    }}
                                  >
                                    <ListItemText primary={drugItem.name} />
                                  </ListItemButton>
                                ))}
                              </List>
                            </Collapse>
                          </>
                        ) : (
                          drugsList.map((drugItem) => (
                            <ListItemButton
                              key={drugItem.id}
                              sx={{ pl: 4 }}
                              onClick={() => addSelectedDrug(drugItem)}
                            >
                              <ListItemText primary={drugItem.name} />
                            </ListItemButton>
                          ))
                        )}
                      </React.Fragment>
                    );
                  })}
                </List>
              </Collapse>
            </React.Fragment>
          );
        })}
    </List>
  );
};

export default DrugList;
