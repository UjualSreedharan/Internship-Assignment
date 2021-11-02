import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom'

function Copyright(props) {
  return (
    <Typography variant="body2" color="blue" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/UjualSreedharan">
        All Rights Reserved To Ujual
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {
  const [error, setError] = React.useState("")
  const { signInWithEmail, authError } = useAuth();
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get('email') === "" || data.get('password') === "" || data.get('confirm_password') === "" ) {
      setError("Enter all fields")
      return console.log(error)
    }
    if (data.get('password') !== data.get('confirm_password')) {
      setError("Passwords do not match")
      return console.log(error)
    }
    if (data.get("password").length < 6) {
      setError("Passwords length should be over 6 characters")
      return console.log(error)
    }

    setError("")

    try {
      signInWithEmail(data.get('email'), data.get('password'))
      if (authError === "") { history.push("/") }
      history.push("/signup")
    } catch (err) {
      setError(err)
    }
  };


  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            bgcolor:"skyblue",
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 3,
            padding: 5,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'transparent.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {authError && <Alert severity="error">{authError}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container align="center">
              <Grid item >
                <Link href="/signin" variant="elevation1" style={{ color: "red" }}>
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </div>
  );
}