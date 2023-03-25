import { Delete, FavoriteBorder, Favorite, Edit, Add } from "@mui/icons-material";
import {
    Card,
    CardActions,
    CardContent,
    Container,
    Divider,
    Fab,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Task from "../types/task";
import User from "../types/user";

const MockTasks: Array<Task> = [
    {
        id: "1",
        description: "Recado 1",
        detail: "Teste teste teste teste",
        favorite: false,
    },
    {
        id: "2",
        description: "Recado 2",
        detail: "Teste teste teste teste",
        favorite: true,
    },
    {
        id: "3",
        description: "Recado 3",
        detail: "Teste teste teste teste",
        favorite: false,
    },
    {
        id: "4",
        description: "Recado 4",
        detail: "Teste teste teste teste",
        favorite: false,
    },
    {
        id: "5",
        description: "Recado 5",
        detail: "Teste teste teste teste",
        favorite: false,
    },
];

const Notes: React.FC = () => {
    const [userLogged, setUserLogged] = useState<User>({
        email: "",
        password: "",
        tasks: MockTasks,
    });
    const navigate = useNavigate();
    const dadoStorage =
        localStorage.getItem("usuarioLogado") || sessionStorage.getItem("usuarioLogado");

    useEffect(() => {
        if (!dadoStorage) {
            navigate("/");
        } else {
            const dataParsed = JSON.parse(dadoStorage);
            setUserLogged((prev) => ({
                email: dataParsed.email,
                password: dataParsed.password,
                tasks: prev.tasks,
            }));
        }
    }, []);

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <ResponsiveAppBar userLoggedEmail={userLogged.email} />
                </Grid>
                <Grid item xs={12}>
                    <Container sx={{ marginTop: "20px" }}>
                        <Typography variant="h4"> Recados</Typography>
                        <Divider />

                        <Grid container spacing={3} marginTop={2}>
                            {userLogged.tasks.map((item) => (
                                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                                    <Card elevation={5}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.description}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.detail}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <IconButton color="warning">
                                                <Delete />
                                            </IconButton>
                                            <IconButton color="success">
                                                <Edit />
                                            </IconButton>
                                            <IconButton color={item.favorite ? "error" : "inherit"}>
                                                {item.favorite ? <Favorite /> : <FavoriteBorder />}
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
            <Fab
                color="primary"
                aria-label="add"
                size="medium"
                sx={{ position: "fixed", right: "30px", bottom: "30px" }}
            >
                <Add />
            </Fab>
        </>
    );
};

export default Notes;
