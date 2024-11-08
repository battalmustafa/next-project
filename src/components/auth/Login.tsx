import { FormEvent, useEffect, useState } from "react"
import { Box, Button, Container, Link, Paper, TextField, Typography, IconButton } from "@mui/material"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { Status } from "@/types/status"
import { useFormik } from "formik"
import { toFormikValidate } from "zod-formik-adapter"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"

import SubmitButton from "../common/SubmitButton"
import { useUser } from "@/lib/hooks/useUser"
import { fetcher } from "@/lib/fetcher"
import { UserModelSchemaType, UserRegistrationSchema, UserRegistrationSchemaType } from "@/schema/UserSchema"

const initialValues = {
  name: "",
  email: "",
  password: "",
}

const Login = () => {
  const [status, setStatus] = useState<Status>("idle")
  const [showPassword, setShowPassword] = useState(false)

  const { data, mutate } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (data?.payload) {
      router.replace("/overview")
    }
  }, [data?.payload, router])

  const loginUser = async (data: Omit<UserRegistrationSchemaType, "name">) => {
    setStatus("loading")
    const responseData = await fetcher<UserModelSchemaType, Omit<UserRegistrationSchemaType, "name">>(
      "/api/auth",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: data,
      }
    )

    if (responseData.error) {
      toast.error(responseData.error)
      setStatus("error")
      formik.resetForm()
    } else {
      mutate({ payload: responseData.payload }, false)
      setStatus("success")
    }
  }

  const formik = useFormik({
    initialValues,
    validate: toFormikValidate(UserRegistrationSchema.omit({ name: true })),
    onSubmit: (formValues) => {
      loginUser(formValues)
    },
  })

  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
        marginTop: 20,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={20}
          sx={{
            padding: 5,
          }}
        >
          <NextLink href="/" passHref>
            <Button startIcon={<ArrowBackIcon />}>Home</Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-rows-2 place-items-center">
              <span className="w-12 h-12 rounded-full flex justify-center bg-mainBlue"></span>
              <span className="flex justify-center py-4 text-textsecondary">B2Metric</span>
            </div>

            <Box sx={{ display: "grid", justifyContent: "center", my: 3 }}>
              <Typography variant="h4" color="textPrimary">
                Log In to B2Metric
              </Typography>
              <small className="text-textsecondary flex justify-center">
                Enter your email and password below
              </small>
            </Box>

            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              variant="outlined"
              placeholder=""
              helperText={(formik.touched.email && formik.errors.email) || " "}
              error={Boolean(formik.touched.email && formik.errors.email)}
            />
            <Box sx={{ position: "relative" }}>
              <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  ),
                }}
              />
            </Box>
            <Box sx={{ py: 2 }}>
              <SubmitButton
                text="Log In"
                isLoading={status === "loading" || status === "success"}
                isDisabled={!formik.isValid || status === "loading" || status === "success"}
              />
            </Box>
          </form>

          <div className="flex justify-center gap-2">
            <span>Don&apos;t have an account?</span>
            <NextLink href="/register">
              <span className="text-mainBlue font-medium text-sm">Sign Up</span>
            </NextLink>
          </div>
        </Paper>
      </Container>
    </Box>
  )
}

export default Login
