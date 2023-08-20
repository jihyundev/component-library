import styled from '@emotion/styled';
import { Color, COLORS } from 'src/styles/colors';
import { ButtonColor, ButtonSize, ButtonVariant } from './Button.d';

const ButtonColorMap: Record<ButtonColor, Color> = {
  primary: COLORS['primary-main'],
  secondary: COLORS['secondary-main'],
  success: COLORS['success-main'],
  error: COLORS['error-main'],
  info: COLORS['info-main'],
  warning: COLORS['warning-main'],
  inherit: COLORS['grey-300'],
};

const ButtonFontSizeMap: Record<ButtonSize, string> = {
  small: '12px',
  medium: '14px',
  large: '16px',
};

const ButtonPaddingMap: Record<ButtonSize, string> = {
  small: '10px 16px',
  medium: '11px 20px',
  large: '12px 24px',
};

const Button = styled.button<{
  color: ButtonColor;
  size: ButtonSize;
  variant: ButtonVariant;
}>`
  font-weight: 500;
  letter-spacing: 0.4px;
  line-height: 1;
  border: 0;
  border-radius: 4px;
  box-shadow: ${(props) =>
    props.variant === 'outlined'
      ? 'none'
      : '0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)'};
  border: ${(props) =>
    props.variant === 'outlined'
      ? `1px solid ${ButtonColorMap[props.color]}`
      : 'none'};
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.variant === 'outlined'
      ? ButtonColorMap[props.color]
      : COLORS['primary-contrast']};
  background-color: ${(props) =>
    props.variant === 'outlined'
      ? COLORS['primary-contrast']
      : ButtonColorMap[props.color]};
  font-size: ${(props) => ButtonFontSizeMap[props.size]};
  padding: ${(props) => ButtonPaddingMap[props.size]}};
`;

export const Style = {
  Button,
};
