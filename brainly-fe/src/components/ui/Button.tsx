

interface ButtonProps {
    variant : "Primary" | "Secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: any;
    endIcon?: any;
    onclick: () =>  void;
}

export const Button = (props: ButtonProps) => {

}