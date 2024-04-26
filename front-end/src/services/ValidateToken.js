import AppService from '../services/AppService';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

const  ValidateToken = (token) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [status, setStatus] = React.useState('');
    const [open, setOpen] = React.useState(false);
  
    const handleClick = () => {
      setOpen(true);
      };

      //useEffect(() => {
        console.log(token);

        const fetchData = async () => {
            try {
                const resp = await axios.post('http://localhost:80/api/validate.php', token);
                
                if (!resp) {
                    navigate('/');
                } else {
                    AppService.setToken(location.state.token);
                }
            } catch (error) {
                setStatus(`$'error' ${error.message}`);
                handleClick();
            }
        };

        const timeoutId = setTimeout(fetchData, 1000);

        return () => clearTimeout(timeoutId);
    //}, [token, navigate, location.state]);
  
      //useEffect(() => {
  /*
          console.log(token)
          setTimeout(()=>{

              if(token){
  
                  //async function validate(){
                      try{
                          const resp = await axios.post('http://localhost:80/api/validate.php', token);
                          
                          if (!resp){
                              navigate('/');
                          }
                          else{
                              AppService.setToken(location.state.token);
                          }
                      }catch(error){
                          setStatus(`$'error' ${error.message}`);
                          handleClick();
  
                      }        
                  }
                  
             // }
             // validate();
          },1000)
          
      //}, [location.state]);
      */
  
}
export default ValidateToken;