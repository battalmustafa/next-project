import React from "react";
import { Button, CircularProgress } from "@mui/material";

interface IProps {
  isLoading: boolean;
  text: string;
  isDisabled?: boolean;
  fullWidth?: boolean;
  size?: "large" | "small" | "medium" | undefined;
  customStyle?: React.CSSProperties;
  color?: "primary" | "inherit" | "secondary" | "success" | "error" | "info" | "warning" | undefined;
  customOnClick?: () => void;
}

const SubmitButton = ({
  isLoading,
  text,
  isDisabled = false,
  fullWidth = true,
  size = "large",
  customStyle = {},
  color = "primary",
  customOnClick,
}: IProps) => {
  const buttonStyle = {
    backgroundColor: "#3751FF",
    color: "#FFFFFF",
    ...customStyle,
  };

  return (
    <Button
      style={buttonStyle}
      color={color}
      disabled={isDisabled || isLoading}
      fullWidth={fullWidth}
      size={size}
      type="submit"
      variant="contained"
      onClick={customOnClick}
    >
      {isLoading ? (
        <>
          Loading...
          <CircularProgress style={{ marginLeft: 5 }} size={16} role="status" aria-hidden="true" />
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default SubmitButton;
