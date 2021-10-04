export type Theme = 'light' | 'dark';
export type CspTheme = Capitalize<Theme>;

export const defaultTheme = (localStorage.getItem('cds-theme') === 'dark' ? 'dark' : 'light') as Theme;
