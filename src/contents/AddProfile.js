import React from "react";
import { Button, Alert } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import Box from '@mui/material/Box';
import { Container, CssBaseline, TextField, Typography, Grid } from "@mui/material";
import { useHistory } from 'react-router-dom'


const AddProfile = () => {
    const { logOut,updateUserInfo } = useAuth();
    const [error, setError] = React.useState("");
    const history = useHistory()
    const handleLogout = async () => {
        await logOut();
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('name') === "" || data.get('address') === "" || data.get('age').toString() === "" || data.get('hobbies') === "") {
            setError("Enter all fields")
            return console.log(error)
        }
        if (data.get('age')<=0) {
            setError("Enter proper age")
            return console.log(error)
        }
        setError("")
        try {
            updateUserInfo(data.get('name'), data.get('address'), data.get('age').toString(),data.get('hobbies'))
            history.push("/")
        } catch (err) {
            setError(err)
        }
    }

    return (
        <div>
            <Container component="main" maxWidth="l">
                <CssBaseline />
                <Box
                    sx={{
                        bgcolor:"skyblue",
                        marginTop: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justify: "center",
                        boxShadow: 2,
                        padding: 2,
                    }}
                >
                    <Typography component="h1" variant="h5">
                           Update Your Profile
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
    
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} >
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address "
                                    name="address"
                                    autoComplete="address"
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    required
                                    fullWidth
                                    name="age"
                                    label="Age"
                                    type="number"
                                    id="age"
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    required
                                    fullWidth
                                    name="hobbies"
                                    label="Hobbies"
                                    type="hobbies"
                                    id="hobbies"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, ml: 39 }}
                            onSubmit={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{ mt: 2, mb: 1,ml:-22 }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </Container>
        </div>);
}
export default AddProfile;