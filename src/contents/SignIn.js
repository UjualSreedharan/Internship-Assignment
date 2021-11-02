import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
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

export default function SignIn() {
    const { logInWithEmail, authError } = useAuth();
    const history = useHistory();
    const [error, setError] = React.useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('email') === "" || data.get('password') === "") {
            return setError("Please fill all fields");
        }
        try {
            logInWithEmail(data.get('email'), data.get('password'))
            if (authError === "") { history.push("/") }
            history.push("/signin")
        } catch (err) {
            setError(err)
        }
    };

    return (
        <div>
            <Container component="main" maxWidth="xs" >
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
                        Login
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    {authError && <Alert severity="error">{authError}</Alert>}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>

                        <Grid item xs align="center">
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item sx={{
                            paddingTop: 2
                        }} align="center">
                            <Link href="/signup" variant="elevation1" style={{ color: "red" }}>
                                {"Don't have an account?   Sign Up"}
                            </Link>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </div>
    );
}