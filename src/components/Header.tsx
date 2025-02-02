import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import AxolotlGif from "../assets/waving-axolotl-transparent.gif";
import GitHubLogo from "../assets/Octicons-mark-github.svg";
export const Header = () => (
  <AppBar position="static" color="default" elevation={2}>
    <Toolbar>      
      <Box display="flex" alignItems="center" gap={1} mr={2}>
          <img src={GitHubLogo} alt="GitHub Logo" width={40} height={40} />
           <img src={AxolotlGif} alt="Waving Axolotl" width={50} />
      </Box>
      <Box>
        <Typography variant="h5" fontWeight="bold">
          lakeFS GitHub Issues Viewer
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Expand issues to view their description.
        </Typography>
      </Box>
    </Toolbar>
  </AppBar>
);
