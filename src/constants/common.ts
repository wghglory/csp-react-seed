// PCDL runs in 3 integration environment: CSP, Standalone, CDS. The header needs to know it.
export const isCspEnv = process.env.REACT_APP_INTEGRATION_ENVIRONMENT === 'CSP';
export const isStdEnv = process.env.REACT_APP_INTEGRATION_ENVIRONMENT === 'STD';
export const isCdsEnv = process.env.REACT_APP_INTEGRATION_ENVIRONMENT === 'CDS';
