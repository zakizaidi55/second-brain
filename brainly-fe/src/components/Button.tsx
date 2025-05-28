import { ReactElement } from "react";

type variants = "primary" | "secondary"
interface ButtonProps {
    variant : variants
    size?: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?:() => void;
    fullWidth?:boolean;
    loading?:boolean
}

const variantStyles = {
    "primary" : "bg-purple-600 text-white",
    "secondary" : "bg-purple-200 text-purple-400"
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center "

const sizeStyles = {
    "sm" : "py-1 px-2" ,
    "md" : "py-2 px-4",
    "lg" : "py-4 px-6",
}

export const Button = (props: ButtonProps) => {
    return <button onClick= {props.onClick} className={`${variantStyles[props.variant]} ${props.fullWidth ? "w-full" : ""} ${props.loading ? "opacity-45" : ""} ${defaultStyles} ${props.size ? sizeStyles[props.size] : null}`}>
        {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.text} {props.endIcon}</button>
}