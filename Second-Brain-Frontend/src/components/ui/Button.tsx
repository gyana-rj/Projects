import type { ReactElement } from "react";

interface ButtonProps{
    variant : "primary" | "secondary";
    size : "sm" | "md" | "lg";
    text : string;
    startIcon? : ReactElement;
    endIcon? : ReactElement;
    onClick? : () => void;
    fullWidth? : boolean;
    loading? : boolean
}

const variantStyles = {
    "primary" : "bg-purple-600 text-white",
    "secondary" : "bg-purple-200 text-purple-600"
}

const sizeStyles = {
    "sm" : "py-1 px-2 rounded-sm",
    "md" : "py-2 px-4 rounded-md",
    "lg" : "py-4 px-6 rounded-lg"
}

const defaultStyles = "rounded-md flex justify-center items-center font-normal";

export function Button(props : ButtonProps){
    return <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} ${props.fullWidth ? " w-full" : ""} flex justify-center items-center ${props.loading ? "opacity-45" : ""}`} disabled= {props.loading}>
        {props.startIcon ? <div className="pr-2 py-1">{props.startIcon}</div> : null}
        {props.text}
    </button>
}   

