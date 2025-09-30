import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Box>
      <AppBar position="static" color="primary" sx={{ mb: 3 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            Blog Wizard
          </Typography>
          <Box>
            <Button component={Link} href="/" color="inherit">
              List Blog
            </Button>
            <Button component={Link} href="/wizard" color="inherit">
              Add Blog
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box maxWidth="lg" mx="auto" p={3}>
        {children}
      </Box>
    </Box>
  );
}
