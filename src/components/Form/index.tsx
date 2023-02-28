import { Stack, Button, Typography, } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userValidation from '../../helpers/validation';
import { localLogIn } from '../../store/modules/loggedLocalSlice';
import { addUser } from '../../store/modules/userSlice';
import { RootState } from '../../store/store';
import { NewUser, User } from '../../types/users';
import InputDefault, { Name } from '../InputDefault';

interface Mode {
    mode: 'login' | 'signup';
}

const Form = ({ mode } : Mode) => {

    const navigate = useNavigate();
   
    const [input, setInput] = useState({
        name: '', 
        email: '', 
        password: '', 
        confirmPassword: '',
    });

    const users = useSelector((state:RootState) =>state.users.users);
    const dispatch = useDispatch();

    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);

    const pegarDados = (value: string, key: Name) =>{
        switch(key) {
            case 'name':
                setInput({...input, name : value});
                break;
            case 'email':
                setInput({...input, email : value});
                break;
            case 'password':
                setInput({...input, password : value});
                break;
            case 'confirmPassword':
                setInput({...input, confirmPassword : value});
                break;
            default:
        }
    };

    // TROCA DE PÁGINA (login/cadastro)
    const changePage = () => {
        if(mode === 'login'){
            navigate('/signup');
        }else{
            navigate('/');
        }
    }

    // VALIDAÇÕES
    useEffect(() =>{
        if(input.name.length < 3){
            setErrorName(true);
        }else{
            setErrorName(false);
        }

        if(!input.email.match(/\S+@\S+\.\S+/)){
            setErrorEmail(true);
        }else{
            setErrorEmail(false);
        }

        if(mode === 'signup'){        
            if(!input.password || input.password.length < 6 || !input.confirmPassword || input.password !== input.confirmPassword){
                setErrorPassword(true);
                setErrorConfirmPassword(true);
            }else{
                setErrorPassword(false);
                setErrorConfirmPassword(false);
            }};       
    }, [input, mode]);

    // REGISTRO
    const handleSignup = () => {
        const newUser : NewUser = {
            name: input.name,
            email: input.email,
            password: input.password,
        };

        dispatch(addUser(newUser));

        alert("Usuário cadastrado com sucesso! Realize seu login...");

        navigate("/");
    }

    // LOGIN
    const handleLogin = () => {

        const authentication : string | boolean = userValidation(input.email, input.password, users);

        if (authentication === true) {
            let logInUser : User | undefined = users.find((user : User) => user.email === input.email);

            if(logInUser === undefined)return;

            dispatch(localLogIn(logInUser.id));

            window.open('/tasks', '_self');
        }
        else {
            alert("Usuário não encontrado. Tente novamente.");
        };

    }

    const nextInput = (e: any, nameT?: string) => {
        const { key } = e;
        if (key === 'Enter') {
            if (nameT) {
                const newInput = document.querySelector(`#${input.name}`);
                //@ts-ignore
                if (newInput) newInput.focus();
            }else{
                if(errorName && !errorEmail && !errorPassword && !errorConfirmPassword ){
                    handleSignup();
                }
            }
        }
    }
    return (
        <>
            <Stack spacing={2}>
                {mode === 'login' && (                    
                    <>
                        <InputDefault
                            name='email'
                            label="Digite seu e-mail" 
                            type="email"
                            value={input.email}
                            color={errorEmail ? 'error' : 'success'}
                            handleChange={pegarDados}
                        />
                        <InputDefault
                            name='password'
                            label="Senha" 
                            type="password"
                            value={input.password}
                            color={errorPassword ? 'error' : 'success'}
                            handleChange={pegarDados}
                        />
                        <Button variant="contained" color="success" onClick={(() => { handleLogin() })}>Acessar</Button>
                        <Typography variant='caption'>
                            Não tem conta?{' '}
                            <Typography variant='caption' onClick={()=>changePage()}>
                                Registre-se
                            </Typography>
                        </Typography>
                    </>
                )}
 
                {mode === 'signup' && (
                    <>
                        <InputDefault
                            name='name'
                            label="Digite seu nome" 
                            type="text"
                            value={input.name}
                            color={errorName ? 'error' : 'success'}
                            handleChange={pegarDados}
                            onKeyDown={(e)=>nextInput(e, "email")}                          
                        />
                        <InputDefault
                            name='email'
                            label="Digite seu e-mail" 
                            type="email"
                            value={input.email}
                            color={errorEmail ? 'error' : 'success'}
                            handleChange={pegarDados}
                            onKeyDown={(e)=>nextInput(e, "password")}
                        />
                        <InputDefault
                            name='password'
                            label="Senha" 
                            type="password"
                            value={input.password}
                            color={errorPassword ? 'error' : 'success'}
                            handleChange={pegarDados}
                            onKeyDown={(e)=>nextInput(e, "confirmPassword")}
                        />
                        <InputDefault
                            name='confirmPassword'
                            label="Confirme a senha" 
                            type="password"
                            value={input.confirmPassword}
                            color={errorConfirmPassword ? 'error' : 'success'}
                            handleChange={pegarDados}
                            onKeyDown={(e)=>nextInput(e)}
                        />
                        <Button 
                            variant="contained" 
                            color="primary"
                            disabled={errorEmail || errorPassword}
                            onClick={handleSignup}
                        >
                            Cadastrar
                        </Button>
                        <Typography variant='caption'>
                            Já tem cadastro?{' '}
                            <Typography variant='caption' onClick={()=>changePage()}>
                                Faça o login
                            </Typography>
                        </Typography>
                    </>
                )}
                
            </Stack>


        </>
    );
};
export default Form;