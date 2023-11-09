import { TextField } from "@mui/material";
type Props = {
  name: string;
  label: string;
  type: string;
};
const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="dense"
      id="outlined-basic"
      label={props.label}
      type={props.type}
      variant="outlined"
      name={props.name}
      InputProps={{
        style: {
          color: "white",
          width: "400px",
          borderRadius: "15px",
          fontSize: "20",
        },
      }}
      InputLabelProps={{
        style: { color: "white" },
      }}
    />
  );
};

export default CustomizedInput;
