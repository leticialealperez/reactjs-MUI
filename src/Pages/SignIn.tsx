import { LockOpenOutlined } from "@mui/icons-material";
import {
    Grid,
    Box,
    Avatar,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Link,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import React from "react";

const SignIn: React.FC = () => {
    return (
        <Grid container height="100vh">
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: "url(https://source.unsplash.com/random)",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repete",
                }}
            />
            <Grid item xs={12} sm={8} md={5}>
                <Box
                    component="section"
                    marginY={8}
                    marginX={4}
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                >
                    <Avatar sx={{ bgcolor: pink[500] }}>
                        <LockOpenOutlined />
                    </Avatar>
                    <Typography variant="h4">Sign In</Typography>

                    <Box component="form" marginTop={1}>
                        <TextField
                            margin="normal"
                            variant="outlined"
                            type="email"
                            id="email"
                            label="E-mail"
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            variant="outlined"
                            type="password"
                            id="password"
                            label="Password"
                            fullWidth
                        />
                        <FormControlLabel control={<Checkbox />} label="Remember me" />

                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs={4}>
                                <Link href="/" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item xs={8} textAlign="end">
                                <Link href="/" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    <Typography variant="body2" color="text.secondary" marginTop={5}>
                        Copyright &copy;{" "}
                        <Link
                            color="inherit"
                            href="www.growdev.com.br"
                            target="_blank"
                            variant="body2"
                        >
                            Your Website
                        </Link>{" "}
                        2023.
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default SignIn;
