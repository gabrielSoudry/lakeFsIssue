import React, { ReactNode, useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material';
import { LicenseInfo } from '@mui/x-license';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import { initializeContext } from '../utils/contexts';

const [MuiCustomThemeProviderContext, useMuiCustomThemeProviderContext] = initializeContext();
// eslint-disable-next-line react-refresh/only-export-components
export { useMuiCustomThemeProviderContext };

export const MuiCustomThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  readonly children: ReactNode;
}) => {
  const licenseKey = import.meta.env.VITE_MUI_LICENSE_KEY || "";
  LicenseInfo.setLicenseKey(licenseKey);

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: ['Montserrat', 'sans-serif'].join(','),
          fontSize: 12,
          fontWeightLight: 400,
          fontWeightRegular: 500,
          fontWeightMedium: 550,
          fontWeightBold: 600,
        }
      }),
    [],
  );
  
  return (
    <MuiCustomThemeProviderContext.Provider value={"fr_FR"}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </MuiCustomThemeProviderContext.Provider>
  );
};
