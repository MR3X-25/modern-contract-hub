declare module 'qrcode.react' {
  import { ComponentType } from 'react';
  
  export interface QRCodeSVGProps {
    value: string;
    size?: number;
    level?: 'L' | 'M' | 'Q' | 'H';
    includeMargin?: boolean;
    bgColor?: string;
    fgColor?: string;
  }
  
  export const QRCodeSVG: ComponentType<QRCodeSVGProps>;
}
