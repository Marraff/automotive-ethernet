import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import useAuth from '../hooks/useAuth';
import { GridLoader } from 'react-spinners';

const NotFound = () => {
	const { loading } = useAuth();

	return (
		<>
			{loading ? (
				<>
					<GridLoader
						color="#1d67d5"
						size={40}
						style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}
					/>
				</>
			) : (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						minHeight: '100vh'
					}}>
					<Container maxWidth="md">
						<Grid item container spacing={2}>
							<Grid item xs={6} style={{ marginTop: '70px' }}>
								<Typography variant="h6"> Stránka neexistuje </Typography>
							</Grid>
							<Grid item xs={6}>
								<img
									src="https://images.interestingengineering.com/images/DECEMBER/hotdot404.JPG"
									alt=""
									width={500}
									height={250}
								/>
							</Grid>
						</Grid>
					</Container>
				</Box>
			)}
		</>
	);
};

export default NotFound;