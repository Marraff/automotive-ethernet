import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@mui/material/styles';
import Navbar from '../components/Navigationbar.js';

const DashboardLayoutRoot = experimentalStyled('div')(() => ({
	position: 'relative',
	backgroundColor: 'white',
	backgroundSize: '100%',
	backgroundPositionY: '-50px',
	backgroundRepeat: 'repeat-y',
	backgroundAttachment: 'local',
	height: '100%',
	overflowY: 'auto',
	zIndex: 1
}));

const DashboardLayout = () => {
	return (
		<>
			<Navbar />
			<DashboardLayoutRoot>
				<Outlet />
			</DashboardLayoutRoot>
		</>
	);
};

export default DashboardLayout;