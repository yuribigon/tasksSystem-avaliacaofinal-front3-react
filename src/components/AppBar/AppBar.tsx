import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { localLogOut } from '../../store/modules/loggedLocalSlice';
import { useDispatch } from 'react-redux';

export default function ButtonAppBar() {
  const dispatch = useDispatch();

  // LOGOUT
  const handleLogout = () => {
    dispatch(localLogOut());
    window.open('/', '_self');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary">
					<Toolbar>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Controle de Tarefas
						</Typography>
						<Button variant="contained" color="warning" onClick={()=>handleLogout()}>
							SAIR
						</Button>
					</Toolbar>
				</AppBar>
    </Box>
  );
}