export interface ButtonProps {

    /**
     * Color theme for button
     */
    color?: ButtonColor;

    /**
     * How large should the button be?
     */
    size?: ButtonSize;

    /**
     * Type of color layout
     */
    variant?: ButtonVariant;

    /**
     * Button contents
     */
    label: string;

    /**
     * Optional click handler
     */
    onClick?: () => void;
}

export type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'inherit';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'contained' | 'outlined';