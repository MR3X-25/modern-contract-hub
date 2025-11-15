declare module 'react-barcode' {
  import { ComponentType } from 'react';
  
  export interface BarcodeProps {
    value: string;
    width?: number;
    height?: number;
    format?: string;
    displayValue?: boolean;
    fontSize?: number;
    background?: string;
    lineColor?: string;
  }
  
  const Barcode: ComponentType<BarcodeProps>;
  export default Barcode;
}
