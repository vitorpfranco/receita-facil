import { Select, MenuItem, FormControl } from "@mui/material";
import { Drug } from "../../types/drug";
import { routeOptions } from "../../utils/routeUtil";

type RouteSelectorProps = {
  drug: Drug;
  updateSelectedDrug: (uuid: string, updates: Partial<Drug>) => void;
};

const RouteSelector: React.FC<RouteSelectorProps> = ({
  drug,
  updateSelectedDrug,
}) => {

  const currentRoute = routeOptions.includes(drug.route || "")
    ? drug.route
    : "";

  return (
    <>
      {currentRoute && <div className="showOnPrint">{currentRoute}</div>}

      <FormControl
        className="hideOnPrint"
        sx={{ m: 1, minWidth: 120, width: "fit-content", margin: "0" }}
      >
        <Select
          value={currentRoute}
          onChange={(event) =>
            updateSelectedDrug(drug.uuid!, { route: event.target.value })
          }
          displayEmpty
          inputProps={{ "aria-label": "Rota de administração" }}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // Remove a borda padrão do MUI
            },
            "& .MuiOutlinedInput-root": {
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove borda no hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove borda ao focar
              },
              boxShadow: "none", // Remove qualquer sombra ao focar
            },
            "& .MuiSelect-select": {
              padding: "6px 12px", // Ajusta o padding se necessário
            },
          }}
        >
          <MenuItem value="">
            <em>Via de uso</em>
          </MenuItem>
          {routeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default RouteSelector;
