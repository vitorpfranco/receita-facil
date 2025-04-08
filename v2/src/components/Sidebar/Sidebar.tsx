import React, { useRef, useState } from "react";
import logoColored from "../../assets/logo_colored.svg";
import style from "./style.module.scss";
import DrugList from "../DrugList";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Button } from "@mui/material";
import { usePrescriptionStore } from "../../store/prescription";

const Sidebar: React.FC = () => {
  const [searchDrug, setSearchDrug] = useState("");
  const { addCumtomDrug }= usePrescriptionStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus(); 
    }
  };

  return (
    <div className={`${style.sidebar} hideOnPrint`}>
      <img
        src={logoColored}
        alt="Logo"
        style={{ width: "11rem", height: "auto" }}
        className={`${style.logo}`}
      />
      <Button
        component="label"
        variant="contained"
        tabIndex={-1}
        startIcon={<AddCircleOutlineOutlinedIcon />}
        sx={{
          borderRadius: "12px",
          marginBottom: "1rem",
          paddingLeft: "1.5rem",
          width: "100%",
          fontSize: "1rem",
          "&::after": {
            content: '""',
            display: "block",
            width: "100%",
            height: "1px",
            backgroundColor: "#707070",
            position: "absolute",
            bottom: "-1rem",
            left: "0",
          },
        }}
        onClick={addCumtomDrug}
      >
        Adicionar Medicamento
      </Button>
      <div className={style.searchDrugContainer}>
        <input
          ref={inputRef}
          className={style.searchDrugInput}
          value={searchDrug || ""}
          placeholder="Pesquisar Medicamento"
          onChange={(e) => setSearchDrug(e.target.value)}
        ></input>
        <SearchIcon onClick={focusInput} className={style.searchDrugIcon} />
      </div>
      <DrugList searchDrug={searchDrug}></DrugList>
    </div>
  );
};

export default Sidebar;
