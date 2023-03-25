import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import routes from "../routes/routes";

interface ResponsiveAppBarProps {
    userLoggedEmail: string;
}

function ResponsiveAppBar({ userLoggedEmail }: ResponsiveAppBarProps) {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleCloseNavMenu = (url: string) => {
        console.log("Clicou no link", url);
        setAnchorElNav(null);
        // navigate(url);
    };

    const handleLogoutUser = () => {
        // console.log("Clicou em sair");
        // .. faz aqui a logica antecedente ao removeItem

        sessionStorage.removeItem("usuarioLogado");
        localStorage.removeItem("usuarioLogado");

        navigate("/");
    };

    return (
        <AppBar position="static" color="secondary">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "underline",
                        }}
                    >
                        {userLoggedEmail}
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={(event) => setAnchorElNav(event.currentTarget)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={() => setAnchorElNav(null)}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {routes.map((page) => (
                                <MenuItem
                                    key={page.url}
                                    onClick={() => handleCloseNavMenu(page.url)}
                                >
                                    <Typography textAlign="center">{page.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* como estará sendo mostrado numa tela pequena */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        {userLoggedEmail}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {routes.map((page) => (
                            <Button
                                key={page.url}
                                onClick={() => handleCloseNavMenu(page.url)}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={(event) => setAnchorElUser(event.currentTarget)}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt={userLoggedEmail.toUpperCase()}
                                    src="/static/images/avatar/2.jpg"
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={() => setAnchorElUser(null)}
                        >
                            <MenuItem onClick={handleLogoutUser}>
                                <Typography textAlign="center">Sair</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
