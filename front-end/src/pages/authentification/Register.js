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
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/AppBar';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
	const navigate = useNavigate();
	const { register, loading } = useAuth();
	const [open, setOpen] = React.useState(false);
	const [status, setStatus] = React.useState('');

	const handleClick = () => {
		setOpen(true);
	};

	const { t } = useTranslation();

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const validationSchema = Yup.object({
		email: Yup.string().email(t('incorrectFormat')).required(t('requiredField')),
		password: Yup.string().min(6, t('incorrectPassord')).required(t('requiredField')),
		role: Yup.string().required(t('requiredField')),
		aisId: Yup.number().required(t('requiredField')),
		name: Yup.string().required(t('requiredField')),
		surname: Yup.string().required(t('requiredField'))
	});

	const onSubmit = async (values, { resetForm }) => {
		try {
			const tempRoles = [];
			tempRoles.push(values.role);
			await register(values.email, values.password, tempRoles, values.aisId, values.name, values.surname);
			resetForm();
			navigate('/login', { state: { registered: true } });
		} catch (error) {
			setStatus(`${t('error')} ${error.message}`);
			handleClick();
		}
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			role: '',
			aisId: '',
			name: '',
			surname: ''
		},
		validationSchema: validationSchema,
		onSubmit: onSubmit
	});

	return (
		<>
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
							{t('register')}
						</Typography>
						<Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<TextField
										error={formik.touched.email && !!formik.errors.email}
										required
										fullWidth
										id="email"
										label={formik.touched.email && formik.errors.email ? formik.errors.email : t('email')}
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
										label={formik.touched.password && formik.errors.password ? formik.errors.password : t('password')}
										type="password"
										id="password"
										value={formik.values.password}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										autoComplete="off"
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControl fullWidth required error={formik.touched.role && !!formik.errors.role}>
										<InputLabel
											htmlFor="role"
											style={formik.touched.role && formik.errors.role ? { color: 'red' } : {}}>
											{formik.touched.role && formik.errors.role ? formik.errors.role : t('role')}
										</InputLabel>
										<Select
											id="role"
											name="role"
											value={formik.values.role}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value="student">{t('student')}</MenuItem>
											<MenuItem value="teacher">{t('teacher')}</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<TextField
										error={formik.touched.aisId && !!formik.errors.aisId}
										required
										fullWidth
										name="aisId"
										label={formik.touched.aisId && formik.errors.aisId ? formik.errors.aisId : t('aisId')}
										type="number"
										id="aisId"
										value={formik.values.aisId}
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
										label={formik.touched.name && formik.errors.name ? formik.errors.name : t('name')}
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
										label={formik.touched.surname && formik.errors.surname ? formik.errors.surname : t('surname')}
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
								{t('registerBtn')}
							</Button>
							<Grid container justifyContent="flex-start">
								<Grid item>
									<Link href="#" variant="body2" onClick={() => navigate('/login')}>
										{t('alreadyHaveAcc')}
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
		</>
	);
};

export default Register;