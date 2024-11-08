import React, { useCallback } from "react";
import { styled } from "@mui/material/styles";
import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography, Menu, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useUser } from "@/lib/hooks/useUser";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { fetcher } from "@/lib/fetcher";
import { Avatar } from "@mui/material";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#F7F8FC",
  boxShadow: "none",
}));

export const DashboardNavbar = () => {
  const { data, mutate } = useUser();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const onSignOut = useCallback(async () => {
    try {
      const response = await fetcher("/api/auth", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        data: null,
      });

      if (response.error) {
        toast.error(response.error);
        return;
      }

      toast.success("You have been signed out");
      mutate({ payload: null });
      router.replace("/");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  }, [mutate, router]);

  const { pathname } = useRouter();

  const headerTitle =
  pathname.split("/")[1]?.charAt(0).toUpperCase() + pathname.split("/")[1]?.slice(1).toLowerCase() || "Dashboard"; 
   return (
    <div>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 270,
          },
          width: {
            lg: "calc(100% - 270px)",
          },
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          <Box sx={{ flexGrow: 1 }}>
            {/* Display header title */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                color: "text.primary",
              }}
            >
              {headerTitle}
            </Typography>
          </Box>

          {data?.payload && (
            <Box sx={{ display: 'flex', alignItems: 'center', minHeight: '64px', padding: '0 16px' }}>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.primary',
                  marginRight: 2,
                  fontWeight: 500,
                  display: 'block'
                }}
              >
                {data.payload.name || 'User'}
              </Typography>
              <Avatar
                sx={{
                  cursor: 'pointer',
                  width: 40,
                  height: 40
                }}
              >
                {data.payload.name?.charAt(0)}
              </Avatar>
              <Tooltip title="Sign out">
                <IconButton
                  onClick={onSignOut}
                  sx={{
                    ml: 1,
                    color: 'text.primary'
                  }}
                >
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                  sx: { width: 200 }
                }}
              >
                <MenuItem onClick={onSignOut}>
                  <ExitToAppIcon sx={{ mr: 1 }} />
                  Sign out
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </DashboardNavbarRoot>
    </div>
  );
};

export default DashboardNavbar;
