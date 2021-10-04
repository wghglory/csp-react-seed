// DEV only
export const __PCDL_MODE__ = '__PCDL_MODE__';

export let PCDL_MODE: string | null = '';
if (!PCDL_MODE) {
  PCDL_MODE = localStorage.getItem(__PCDL_MODE__);
}

// PCDL runs in 3 integration environment: CSP, Standalone, CDS. The header needs to know it.
export const isCspMode =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_INTEGRATION_MODE === 'CSP'
    : PCDL_MODE
    ? PCDL_MODE === 'CSP'
    : process.env.REACT_APP_INTEGRATION_MODE === 'CSP';
export const isStdMode =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_INTEGRATION_MODE === 'STD'
    : PCDL_MODE
    ? PCDL_MODE === 'STD'
    : process.env.REACT_APP_INTEGRATION_MODE === 'STD';
export const isCdsMode =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_INTEGRATION_MODE === 'CDS'
    : PCDL_MODE
    ? PCDL_MODE === 'CDS'
    : process.env.REACT_APP_INTEGRATION_MODE === 'CDS';
