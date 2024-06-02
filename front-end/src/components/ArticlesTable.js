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
import { useSnackbar } from 'notistack';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import wallpaper from '../images/math_custom-low.png';



function ArticlesTable() {

    const columns = [
        {
            name: 'Názov',
            selector: row=>row.name,
            sortable: true
        },
        {
            name: 'Autor',
            selector: row=>row.author,
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
    const [articles, setArticles] = React.useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [file, setFile] = React.useState(null);
    const [photo, setPhoto] = React.useState();

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

    const handleFile = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handlephoto = (event) => {
        const selectedPhoto = event.target.files[0];
        setPhoto(selectedPhoto);
    };

    const handleDelete = (id) => {
        // Implement delete functionality here
       
        async function delArticle(id){
            try{
                
                const resp = await axios.delete('http://localhost:80/api/article.php', { data: {id}});

                const respNew = await axios.get('http://localhost:80/api/article.php');
                
                const jsonD = respNew.data.split('"articles":')[1];
                const str = jsonD.substring(0, jsonD.length - 1);
                const dataArray = JSON.parse(str);
                setArticles(dataArray);

                enqueueSnackbar("Článok zmazaný", { variant: 'success' });
                
            }catch(error){
                enqueueSnackbar(`$'error' ${error.message}`, { variant: 'error' });
               
            }        
        }
        delArticle(id);
    };

    const handleAdd = (data) => {
        // Implement delete functionality here
        //console.log(`Adding data: ${data}`);
        async function addArticle(data){
            try{
                //console.log(data);

                const formData = new FormData();
                formData.append('pdfFile', file);
                formData.append('photo', photo);

                const resp = await axios.post('http://localhost:80/api/article.php', formData);
                
                const newData = await axios.get('http://localhost:80/api/article.php');
                //console.log(newData);
                if (resp.status == 200){
                    
                    const jsonD = newData.data.split('"articles":')[1]
                    const str = jsonD.substring(0, jsonD.length - 1);
                    const dataArray = JSON.parse(str);
                    setArticles(dataArray);
                    enqueueSnackbar("Nový článok úspešne pridaný", { variant: 'success' });
                }
                else{
                    enqueueSnackbar("vložiť sa dajú iba .pdf .jpg/.jpeg súbory!", { variant: 'error' });
             
                }
                
            }catch(error){
                setStatus(`$'error' ${error.message}`);
                enqueueSnackbar(`$'error' ${error.message}`, { variant: 'error' });
            }        
        }
        addArticle(data);
    };

    const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
        setFile();
        setPhoto();
	};

    const handleSubmit = (event) => {
        event.preventDefault();
        // Check if both files are attached
        if (file && photo) {
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          // Add logic to handle form submission with both files
          console.log(formJson);
          handleClose();
        } else {
          // Alert user if both files are not attached
          enqueueSnackbar('Please attach both files before submitting.', { variant: 'error' });
          
        }
      };

    useEffect(() => {

        async function getArticles(){
            try{
                
                const resp = await axios.get('http://localhost:80/api/article.php');
                
                //console.log(resp);
                const jsonD = resp.data.split('"articles":')[1]
                const str = jsonD.substring(0, jsonD.length - 1);
                const dataArray = JSON.parse(str);
                setArticles(dataArray);
                
                
            }catch(error){
                //setStatus(`$'error' ${error.message}`);
                enqueueSnackbar(`$'error' ${error.message}`, { variant: 'error' });
            }        
        }
        getArticles();
        		
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
            <h1>Články</h1>
        </div>
            <Button
                type="submit"  
                variant="contained" 
                sx={{ mt: 3, mb: 2 }} 
                onClick={() => handleClick()}>Pridaj Článok
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
                    
                    //console.log(newVideo);
                    handleAdd({article: file/*, photo: photo*/});
                    handleClose();

                },
                }}
            >
                <DialogTitle>Pridaj článok</DialogTitle>
                
                    <Button
                        component="label"
                        sx={{ mt: 3, mb: 2, width: 'auto' }}
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        >
                        Nahraj článok
                    <VisuallyHiddenInput type="file"  onChange={handleFile}/>
                    </Button>
                    {file && <div>{file.name}</div>} {/* Display file name if attached */}

                    <Button
                        component="label"
                        sx={{ mt: 3, mb: 2, }}
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        >
                        Nahraj titulný obrázok
                    <VisuallyHiddenInput type="file"  onChange={handlephoto}/>
                    </Button>
                    {photo && <div>{photo.name}</div>} {/* Display file name if attached */}

                   
                    <DialogActions>
                    <Button onClick={handleClose}>Zruš</Button>
                    <Button type="submit" disabled={!file || !photo}>Pridaj</Button>
                </DialogActions>
            </Dialog>
        </div>
        <DataTable
            columns={columns}
            data={articles}
            pagination
            highlightOnHover
            striped
            dense
        />
      </div>
     
    </div>
  );
}

export default ArticlesTable;
