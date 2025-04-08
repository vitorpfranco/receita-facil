
import { FormControlLabel, Switch } from "@mui/material";
import React from "react";

type ControlledSwitchProps = {
  active: boolean;
  setActive: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
};

const ControlledSwitch: React.FC<ControlledSwitchProps> = ({
  active,
  setActive,
  label,
  disabled,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={active}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
          disabled={disabled}
        />
      }
      label={label}
    />
  );
};

export default ControlledSwitch;
