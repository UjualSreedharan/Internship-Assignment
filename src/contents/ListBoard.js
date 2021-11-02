import React from "react";
import { Typography, List, ListItem,  ListItemText, Divider, Button, Link } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

const DashBoard = () => {
    const { getUserInfo, userInfo, currentUser } = useAuth();
    React.useEffect(() => {
        getUserInfo()
    }, [])
    return (
        <>
            <Link href="/usercustomization" underline="none">
                <List sx={{ width: '100%', bgcolor: '#FEFCE8' }}>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={userInfo.full_name ? userInfo.full_name : currentUser.displayName}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {userInfo.email ? userInfo.email : currentUser.email}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List>
                <Button variant="contained" >
                   Update Profile
                </Button>
            </Link>
        </>);

}

export default DashBoard;