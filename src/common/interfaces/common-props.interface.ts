
import { CSSProperties, ReactNode } from 'react';

export default interface CommonProps {
  id?: any;
  className?: string;
  children?: ReactNode;
  onChange?: any;
  value?: any;
  onClick?: any;
  innerRef?: any;
  disabled?: boolean;
  style?: CSSProperties;
  cypressRef?: string;
  tabIndex?: number;
}
