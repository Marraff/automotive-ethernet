import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import useAuth from '../../hooks/useAuth';
import Navbar from '../../components/Navigationbar';
import AuthService from '../../services/AppService';
import axios from 'axios';
import { useEffect } from 'react';
import AppService from '../../services/AppService';
import { useSnackbar } from 'notistack';
import CryptoJS from 'crypto-js';

import wallpaper from '../../images/background_main.jpg';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
	const navigate = useNavigate();
	const { register, loading } = useAuth();
	const [open, setOpen] = React.useState(false);
	const [status, setStatus] = React.useState('');
	const { enqueueSnackbar } = useSnackbar();

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};


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
								navigate('/Register');
							}

							const user = AppService.getUser();
							
							if(user){
								navigate('/Admin', { state: { registered: true, token: window.localStorage.accessToken } });
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

		
	}, [navigate,setStatus,handleClick]);


	
	const validationSchema = Yup.object({
		email: Yup.string().email("nesprávny formát").required("povinné pole"),
		password: Yup.string().min(6, "nesprávne heslo").required("povinné pole"),
		name: Yup.string().required("povinné pole"),
		surname: Yup.string().required("povinné pole")
	});

	const onSubmit = async (values, { resetForm }) => {
		
		
		try {
			
			const resp = await axios.post('http://localhost:80/api/register.php',values);
			const errorMessage = resp.data.split('\n')[2];
			
			if (errorMessage != ""){
				setStatus(`${"error"} ${errorMessage}`);
				handleClick();
			}
			//await register(values);
			if (errorMessage == ""){
				resetForm();
				navigate('/login', { state: { registered: true } });
			}
			} catch (error) {

			setStatus(`${"error"} ${error.message}`);
			//console.log('responseData');
			
			handleClick();
		}
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			name: '',
			surname: ''
		},
		validationSchema: validationSchema,
		onSubmit: onSubmit
	});

	return (
		<>
		<div style={{ 
     backgroundImage: `url(${wallpaper})`, 
     backgroundSize: 'cover', 
     backgroundRepeat: 'no-repeat',
     backgroundPosition: 'center',
     height: '100vh',
     display: 'flex',
     flexDirection: 'column',
         
        }}>
			<Navbar />
			{loading ? (
				<>
					<HashLoader color="#1d67d5" size={100} style={{ position: 'absolute', top: '40%', left: '50%' }} />
				</>
			) : (
				<Container
					component="main"
					maxWidth="xs"
					sx={{
						mt: '3%',
						backgroundColor: 'rgba(255, 255, 255, 0.8)',
						borderRadius: '2rem'
					}}>
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							padding: '2rem',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center'
						}}>
						<Typography component="h1" variant="h4" sx={{ fontFamily: 'Braah One, sans-serif' }}>
							Registrácia
						</Typography>
						<Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<TextField
										error={formik.touched.email && !!formik.errors.email}
										required
										fullWidth
										id="email"
										label={formik.touched.email && formik.errors.email ? formik.errors.email : "email"}
										name="email"
										value={formik.values.email}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										autoComplete="off"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										error={formik.touched.password && !!formik.errors.password}
										required
										fullWidth
										name="password"
										label={formik.touched.password && formik.errors.password ? formik.errors.password : "heslo"}
										type="password"
										id="password"
										value={formik.values.password}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										autoComplete="off"
									/>
								</Grid>
				
								<Grid item xs={12}>
									<TextField
										error={formik.touched.name && !!formik.errors.name}
										required
										fullWidth
										name="name"
										label={formik.touched.name && formik.errors.name ? formik.errors.name : "meno"}
										type="text"
										id="name"
										value={formik.values.name}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										autoComplete="off"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										error={formik.touched.surname && !!formik.errors.surname}
										required
										fullWidth
										name="surname"
										label={formik.touched.surname && formik.errors.surname ? formik.errors.surname : "priezvisko"}
										type="text"
										id="surname"
										value={formik.values.surname}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										autoComplete="off"
									/>
								</Grid>
							</Grid>
							<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
								Registrácia
							</Button>
							<Grid container justifyContent="flex-start">
								<Grid item>
									<Link href="#" variant="body2" onClick={() => navigate('/login')}>
										Už máte konto?
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

export default Register;