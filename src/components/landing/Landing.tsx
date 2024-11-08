import React from "react"
import Navbar from "./Navbar"
import Scroll from "react-scroll"
import Link from "next/link"
import { Box, Container } from "@mui/material"

const Landing = () => {
  const Element = Scroll.Element
  return (
    <>
      <Navbar />
      <Container sx={{ paddingTop: 20 }}>
        <Box
          sx={{
            textAlign: "center",
            mb: 5,
          }}
        >
       
        </Box>
      </Container>
     
    </>
  )
}

export default Landing
