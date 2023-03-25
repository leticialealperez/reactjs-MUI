import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import User from "../types/user";

interface FormProps {
    mode: "signin" | "signup";
    textButton: string;
}

// TAREFA
// 1 - Criar uma nova página de Recados - <h1>Recados</h1>
// 2 - Criar a lógica de logar um usuario na aplicação
// 3 - Se o campo de "Permanecer conectado" tiver true -> salvar o usuarioLogado no localStorage
// caso contrario, salvar os dados do usuario Logado no sessionStorage
// 4 - A página de Recados só poderá ser acessada se existir usuario Logado ou no localStorage ou no sessionStorage
// caso contrario, redirecionar para a página de Login

const Form: React.FC<FormProps> = ({ mode, textButton }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorRepassword, setErrorRepassword] = useState(false);
    const [users, setUsers] = useState<User[]>(
        JSON.parse(localStorage.getItem("listaUsuarios") || "[]"),
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (mode === "signup") {
            // método string - endsWith() - boolean
            const emailValid =
                (email.endsWith(".com") || email.endsWith(".com.br")) && email.includes("@");

            if (email.length > 0) {
                setErrorEmail(!emailValid);
            }

            const passwordValid = password.length >= 6;
            if (password.length > 0) {
                setErrorPassword(!passwordValid);
            }

            const repasswordValid = password === repassword;

            if (repassword.length > 0) {
                setErrorRepassword(!repasswordValid);
            }

            setDisabled(!(emailValid && passwordValid && repasswordValid));
        }
    }, [email, password, repassword, mode]);

    useEffect(() => {
        localStorage.setItem("listaUsuarios", JSON.stringify(users));
    }, [users]);

    function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();

        if (mode === "signin") {
            const userFound = users.find(
                (usuario) => usuario.email === email && usuario.password === password,
            );

            if (!userFound) {
                alert("E-mail ou senha inválidos!");
                return;
            }

            if (remember) {
                localStorage.setItem("usuarioLogado", JSON.stringify(userFound));
            } else {
                sessionStorage.setItem("usuarioLogado", JSON.stringify(userFound));
            }

            // navega para pagina de /notes
            navigate("/notes");
        } else {
            const newUser = {
                email,
                password,
                tasks: [],
            };

            // o que eu preciso considerar para cadastrar um novo usuário?

            // 1 - Precisa validar alguma coisa?
            const retorno = users.some((value) => value.email === newUser.email);

            if (retorno) {
                alert("Esse e-mail já está cadastrado por outro usuário");
                return;
            }

            // ... segue a lógica de cadastro
            setUsers([newUser, ...users]);
        }
    }

    return (
        <Box component="form" marginTop={1} onSubmit={(ev) => handleSubmit(ev)}>
            <TextField
                error={errorEmail}
                helperText={errorEmail ? "E-mail inválido" : ""}
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                margin="normal"
                variant="outlined"
                type="email"
                required
                id="email"
                label="E-mail"
                fullWidth
            />
            <TextField
                error={errorPassword}
                helperText={errorPassword ? "Senha deve conter ao menos 6 caracteres" : ""}
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                margin="normal"
                variant="outlined"
                type="password"
                required
                id="password"
                label="Senha"
                fullWidth
            />

            {mode === "signup" ? (
                <TextField
                    error={errorRepassword}
                    helperText={errorRepassword ? "As senhas não coincidem" : ""}
                    value={repassword}
                    onChange={(ev) => setRepassword(ev.target.value)}
                    margin="normal"
                    variant="outlined"
                    type="password"
                    required
                    id="repassword"
                    label="Repetir Senha"
                    fullWidth
                />
            ) : (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={remember}
                            onChange={(ev) => setRemember(ev.target.checked)}
                        />
                    }
                    label="Permanecer conectado"
                />
            )}

            <Button
                disabled={disabled}
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
            >
                {textButton}
            </Button>
            <Grid container>
                {mode === "signin" && (
                    <Grid item xs={4}>
                        <Typography variant="body2">
                            <Link style={{ color: "inherit" }} to="/">
                                Esqueceu sua senha?
                            </Link>
                        </Typography>
                    </Grid>
                )}
                <Grid item xs={8} textAlign="end">
                    {mode === "signin" ? (
                        <Typography variant="body2">
                            <Link style={{ color: "inherit" }} to="/signup">
                                Não tem uma conta? Cadastre-se
                            </Link>
                        </Typography>
                    ) : (
                        <Typography variant="body2">
                            <Link style={{ color: "inherit" }} to="/">
                                Já possui conta? Vá para Login
                            </Link>
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Form;
