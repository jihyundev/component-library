import { ButtonProps } from './Button.d';
import { Style } from 'src/components/Button/Button.styles';

export const Button = ({
  color = 'primary',
  size = 'medium',
  variant = 'contained',
  label,
  ...props
}: ButtonProps) => {
  return (
    <Style.Button
      type="button"
      color={color}
      size={size}
      variant={variant}
      {...props}
    >
      {label}
    </Style.Button>
  );
};
