import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import React from 'react'; 
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/material/Button';
import { useSnackbar } from 'notistack';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import baseURL from '../lib/URL';
import wallpaper from '../images/math_custom-low.png';

function VideosTable() {

    const columns = [
        {
            name: 'Názov',
            selector: row=>row.name,
            sortable: true
        },
        {
            name: 'YouTube ID',
            selector: row=>row.ytb_id,
            sortable: true
        },
        {
          name: 'Zmaž',
          cell: row => <Button 
                            type="contained" 
                            variant="contained" 
                            sx={{ mt: 3, mb: 2 }} 
                            onClick={() => handleDelete(row.id)}>Zmaž
                        </Button>
    
        }
    ];

    const [open, setOpen] = React.useState(false);
	const [status, setStatus] = React.useState([]);
    const [videos, setVideos] = React.useState([]);
    const [newVideo, setNewVideo] = React.useState({});
    const { enqueueSnackbar } = useSnackbar();


    const handleDelete = (id) => {
        // Implement delete functionality here
       
        async function delVideo(id){
            try{
                console.log(id);
                //const resp = await axios.delete('http://localhost:80/api/video.php', { data: {id}});
                const resp = await axios.delete(`${baseURL}/api/video.php`, { data: {id}});

                const updatedData = videos.filter(item => item.id !== id);
                setVideos(updatedData);

                enqueueSnackbar("Video zmazané", { variant: 'success' });
                
            }catch(error){
                enqueueSnackbar(`$'error' ${error.message}`, { variant: 'error' });
               
            }        
        }
        delVideo(id);
    };

    const handleAdd = (data) => {
        // Implement delete functionality here
        console.log(`Adding data: ${data}`);
        async function addVideo(data){
            try{
                console.log(data);
                //const resp = await axios.post('http://localhost:80/api/video.php', data);
                const resp = await axios.post(`${baseURL}/api/video.php`, data);
                //const newData = await axios.get('http://localhost:80/api/video.php');
                const newData = await axios.get(`${baseURL}/api/video.php`);

                const jsonD = newData.data.split('"videos":')[1]
                const str = jsonD.substring(0, jsonD.length - 1);
                const dataArray = JSON.parse(str);
                setVideos(dataArray);

                enqueueSnackbar("Nové video úspešne pridané", { variant: 'success' });

            }catch(error){
                setStatus(`$'error' ${error.message}`);
                enqueueSnackbar(`$'error' ${error.message}`, { variant: 'error' });
            }        
        }
        addVideo(data);
    };

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

        async function getVideos(){
            try{
                
                //const resp = await axios.get('http://localhost:80/api/video.php');
                const resp = await axios.get(`${baseURL}/api/video.php`);

                const jsonD = resp.data.split('"videos":')[1]
                const str = jsonD.substring(0, jsonD.length - 1);
                const dataArray = JSON.parse(str);
                setVideos(dataArray);
                
                
            }catch(error){
                setStatus(`$'error' ${error.message}`);
                handleClick();
            }        
        }
        getVideos();
        		
	}, [])
    
   return (
    
    <div style={{ 
        backgroundImage: `url(${wallpaper})`, 
        backgroundSize: 'cover', 
        backgroundRepeat: 'repeat-y',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
           
          }}>
      
      <div className='container mt-5'>
        <div>
        <div style={{ backgroundColor: 'white', padding: '10px' }}>
            <h1>Videá</h1>
        </div>
            <Button
                type="submit"  
                variant="contained" 
                sx={{ mt: 3, mb: 2 }} 
                onClick={() => handleClick()}>Pridaj video
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    //const email = formJson.name;
                    setNewVideo({name: formJson.name, ytb_id: formJson.ytb_id});
                    //console.log(newVideo);
                    handleAdd({name: formJson.name, ytb_id: formJson.ytb_id});
                    handleClose();

                },
                }}
            >
                <DialogTitle>Pridaj Video</DialogTitle>
                <DialogContent>
                
                    
                    <TextField
                       autoFocus
                       required
                       margin="dense"
                       id="name"
                       name="name"
                       label="Názov videa"
                       
                       fullWidth
                       variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="id"
                        name="ytb_id"
                        label="YouTude ID"
                        fullWidth
                        variant="standard"
                    />

                    <h10>
                            * YouTube ID je 11 miestny reťazec, ktorý nájdete v url adrese videa za znakom "=" 
                            napríklad: watch?v=5akdtwtmjZM
                        
                    </h10>
                
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>zruš</Button>
                    <Button type="submit" >Pridaj</Button>
                </DialogActions>
            </Dialog>
        </div>
        <DataTable
            columns={columns}
            data={videos}
            pagination
            highlightOnHover
            striped
            dense
        />
      </div>
     
    </div>
  );
}

export default VideosTable;
