import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonAppBar from '../../components/AppBar/AppBar';
import InputDefault, { Name } from '../../components/InputDefault';
import { addTask, deleteTask, editTask } from '../../store/modules/userSlice';
import { RootState } from '../../store/store';
import { DeleteTask, EditTask, NewTask } from '../../types/tasks';
import { User } from '../../types/users';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Dashboard: React.FC = () => {

    const dispatch = useDispatch();
    const { loggedUserID } = useSelector((state: RootState) => state.loggedUser);
    const { users } = useSelector((state: RootState) => state.users);

    const [errorTitle, setErrorTitle] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);

    const [input, setInput] = useState({
        title: '', 
        description: '',
        newTitle: '', 
        newDescription: '',
    });

    const userModel : User = {
        id: "",
        name: "",
        email: "",
        password: "",
        tasks: []
    };

    const [user, setUser] = useState(userModel);

    useEffect(() => {
        const loggedUser : User | undefined = users.find((account : User) => account.id === loggedUserID);
        if(loggedUser === undefined)return;
        setUser(loggedUser);
    }, [loggedUserID, users]);

   

    const pegarDados = (value: string, key: Name) =>{
        switch(key) {
            case 'title':
                setInput({...input, title : value});
                break;
            case 'description':
                setInput({...input, description : value});
                break;
            case 'newTitle':
                setInput({...input, newTitle : value});
            break;
            case 'newDescription':
                setInput({...input, newDescription : value});
            break;
            default:
        }
    };

    // VALIDAÇÕES
    useEffect(() =>{
        if(input.title.length < 3){
            setErrorTitle(true);
        }else{
            setErrorTitle(false);
        }

        if(input.description.length < 1){
            setErrorDescription(true);
        }else{
            setErrorDescription(false);
        }
    }, [input]);

    // ADICIONANDO TAREFAS (TASKS)
    const handleAddTask = () => {
        const newTask : NewTask = {
            userID: user.id,
            title: input.title,
            description: input.description,
        };

        dispatch(addTask(newTask));

        alert("Tarefa adicionada com sucesso.");
    }

    // DELETANDO TAREFAS (TASKS)
    const handleDeleteTask = (userId: string, taskId: string) => {
        const task : DeleteTask = {
            userID : userId,
            taskID : taskId
        }
        dispatch(deleteTask(task));
    }

    // ATUALIZANDO TAREFAS (TASKS)
    const handleUpdateTask = (userId: string, taskId: string) => {
        const changedTask : EditTask = {
            userID : userId,
            taskID : taskId,
            title: input.title,
            description: input.description,
        }
        dispatch(editTask(changedTask));
    }

    return (
        <>
            <ButtonAppBar/>

            <Typography variant='h5' sx={{
            marginTop: 8,
            
            }}>
                Adicionar tarefa
            </Typography>
            
            <Box>
                <InputDefault
                        name='title'
                        label="Tarefa" 
                        type="text"
                        value={input.title}
                        color={errorTitle ? 'error' : 'success'}
                        handleChange={pegarDados}
                        />
                <InputDefault
                        name='description'
                        label="Descrição" 
                        type="text"
                        value={input.description}
                        color={errorDescription ? 'error' : 'success'}
                        handleChange={pegarDados}
                        />
                <Button variant="contained" color="success" onClick={(() => { handleAddTask() })}>Adicionar</Button>
            </Box>

            <Box>
                <Paper>

                    {!user.tasks.length && 
                        <>
                            <Typography variant="subtitle2">Você ainda não tem tarefas...</Typography>
                            <Typography variant="subtitle2">Clique em "adicionar" para criar uma!</Typography>
                        </>
                    }
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Tarefa</TableCell>
                                        <TableCell align="center">Descrição</TableCell>
                                        <TableCell align="center">Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {!!user.tasks.length && user.tasks.map((task) => (
                                    <><TableRow
                                            key={task.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{task.title}</TableCell>
                                            <TableCell align="center">{task.description}</TableCell>
                                            <TableCell align="center">
                                                <Button onClick={(() => { handleUpdateTask(user.id, task.id) })} variant="outlined" size="medium">
                                                    <EditIcon />
                                                </Button>
                                                <Button onClick={(() => { handleDeleteTask(user.id, task.id); })} variant="outlined" size="medium">
                                                    <DeleteIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        
                                    </>                            
                                    ))}
                                    
                                </TableBody>
                            </Table>
                        </TableContainer>
                        
                </Paper>
            </Box>
        </>
    );
};

export default Dashboard;