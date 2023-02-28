import {
	AppBar,
	Box,
	Button,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material';
import React from 'react';

const Navbar: React.FC = () => {
	return (
		<React.Fragment>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static" color="secondary">
					<Toolbar>
						{/**cresce o elemento */}
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							News
						</Typography>
						<Button variant="contained" color="primary">
							Login
						</Button>
					</Toolbar>
				</AppBar>
			</Box>
		</React.Fragment>
	);
};

export default Navbar;
