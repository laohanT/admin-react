import { Button } from "antd";
import React from "react";
import withDoubleClick from "../HOCButton";

interface ButtonProps {
    onClick: () => void;
    label: string;
}

const CustomButton: React.FC<ButtonProps> = ({ onClick, label }) => {
    return <Button onClick={onClick}>{label}</Button>
}


export default withDoubleClick(CustomButton)