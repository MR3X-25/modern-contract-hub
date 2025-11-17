import CryptoJS from 'crypto-js';

export const generateToken = (): string => {
  const currentYear = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 15).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();
  return `MR3X-CTR-${currentYear}-${random}${timestamp}`;
};

export const validateInspectionToken = (token: string): boolean => {
  const currentYear = new Date().getFullYear();
  const pattern = new RegExp(`^MR3X-VST-${currentYear}-[A-Z0-9]+$`);
  return pattern.test(token);
};

export const generateHash = (data: string, ip: string): string => {
  const combinedData = `${data}${ip}${Date.now()}`;
  return CryptoJS.SHA256(combinedData).toString(CryptoJS.enc.Hex);
};

export const getClientIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    // Fallback IP if service fails
    return '0.0.0.0';
  }
};

export const generateContractMetadata = async (contractData: string) => {
  const ip = await getClientIP();
  const token = generateToken();
  const hash = generateHash(contractData, ip);
  
  return {
    token,
    hash,
    ip,
    timestamp: new Date().toISOString(),
  };
};
