import React from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { Box, Button } from "@mui/material"

interface IProps {
  href: string
  icon: any
  title: string
}

const NavItem = ({ href, icon, title }: IProps) => {
  const router = useRouter()

  // Check if the current route matches the href to determine if it's active
  const active = href ? router.pathname.includes(href) : false

  return (
    <div
    
    >
      <NextLink style={{ textDecoration: "none" }} href={href} passHref>
        <Button
          startIcon={icon}
          disableRipple
          sx={{
            fontSize: 17,
            color: "#DDE2FF",
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            // Conditionally apply styles when active
            backgroundColor: active ? "#3e4049" : "transparent", // Active background color
            borderLeft: active ? "8px solid white" : "none", // Active left border
            "&:hover": {
              backgroundColor: active ? "#3e4049" : "none", // Maintain the active bg color on hover
              color: "#ffffff",
            },
          }}
        >
          <Box sx={{ flexGrow: 1, marginLeft: 1 }}>{title}</Box>
        </Button>
      </NextLink>
    </div>
  )
}

export default NavItem
