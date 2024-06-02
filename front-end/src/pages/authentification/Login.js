import React, { useEffect } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useNavigate, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { HashLoader } from 'react-spinners';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useAuth from '../../hooks/useAuth';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Navbar from '../../components/Navigationbar';
import axios from 'axios';
import AppService from '../../services/AppService';
import wallpaper from '../../images/math_custom-low.png';


const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
	const navigate = useNavigate();
	const { login, loading } = useAuth();
	const location = useLocation();
	const { enqueueSnackbar } = useSnackbar();
	const [open, setOpen] = React.useState(false);
	const [status, setStatus] = React.useState('');

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const validationSchema = Yup.object({
		email: Yup.string().email("nesprávny formát").required("povinné pole"),
		password: Yup.string().min(6, "nesprávne heslo").required("povinné pole")
	});

	useEffect(() => {

		if (window.localStorage.accessToken){
			setTimeout(()=>{
				
				  const axiosInstance = axios.create({
					baseURL: "http://localhost:80/api",
					timeout: 3000,
					headers: {Authorization: `bearer ${window.localStorage.accessToken}`}
				  })
  
					async function validateToken(){
						try{
							
							const resp = await axiosInstance.post('/validate.php');
							
							if (!resp){
								navigate('/Login');
							}
							else{
								navigate('/DashBoardLoggedIn', { state: { registered: true, token: window.localStorage.accessToken } });
							}
							
						}catch(error){
							setStatus(`$'error' ${error.message}`);
							handleClick();
						}        
					}
					validateToken();
				
			},1000)
		}

		if (location.state?.registered) {
			location.state = null;
			enqueueSnackbar("registrácia úspešná", { variant: 'success' });
		}
	}, [location.state,navigate,setStatus,handleClick]);

	const onSubmit = async (values, { resetForm }) => {

		try {

			//await login(values.email, values.password);
			const resp = await axios.post('http://localhost:80/api/login.php', values);
			const errorMessage = resp.data.split('\n')[2];

			if (resp.status == 201){
				setStatus(`${"error"} ${errorMessage}`);
				handleClick();
			}
			
			if (resp.status == 200){

				const token = resp.data.split('"')[5];
				//console.log(resp.data.split('"')[9]);

				if(resp.data.split('"')[9]){
					AppService.setToken(token);
					AppService.setUser(resp.data.split('"')[9]);
					navigate('/Admin', { state: { registered: true, token: token } });

				}
				else{
					//console.log(resp.data);
					AppService.setToken(token);
					navigate('/DashBoardLoggedIn', { state: { registered: true, token: token } });

				}
				
			}

		} catch (error) {
			setStatus(`$'error' ${error.message}`);
			handleClick();
		}
		resetForm();
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: validationSchema,
		onSubmit: onSubmit
	});

	return (
		<>

			<Navbar />
			<div style={{ 
     backgroundImage: `url(${wallpaper})`, 
     backgroundSize: 'cover', 
     backgroundRepeat: 'no-repeat',
     backgroundPosition: 'center',
     height: '100vh',
     display: 'flex',
     flexDirection: 'column',
         
        }}>
			{loading ? (
				<>
					<HashLoader color="#1d67d5" size={100} style={{ position: 'absolute', top: '40%', left: '50%' }} />
				</>
			) : (
				<Container
					component="main"
					maxWidth="xs"
					sx={{
						mt: '7rem',
						backgroundColor: 'rgba(255, 255, 255, 0.8)',
						borderRadius: '2rem'
					}}>
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							padding: '2rem',
							flexDirection: 'column',
							alignItems: 'center'
						}}>
						<Typography component="h1" variant="h4" sx={{ fontFamily: 'Braah One, sans-serif' }}>
							Prihlásenie
						</Typography>
						<Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="email"
								name="email"
								autoComplete="off"
								value={formik.values.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.email && !!formik.errors.email}
								helperText={formik.touched.email && formik.errors.email}
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="heslo"
								type="password"
								id="password"
								autoComplete="off"
								value={formik.values.password}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.password && !!formik.errors.password}
								helperText={formik.touched.password && formik.errors.password}
							/>
							<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
								prihlás sa
							</Button>
							<Grid container>
								<Grid item>
									<Link href="#" variant="body2" onClick={() => navigate('/register')}>
										nemáte účet?
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Container>
			)}
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
					{status}
				</Alert>
			</Snackbar>
			</div>
		</>

	);
};

export default Login;