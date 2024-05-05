import wallpaper from '../images/welcome_bc.jpg';
import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
//import WelcomeImg from './welcome.jpg'; // Import your welcome image here

function GridExample() {
  return (
    <div style={{ 
      backgroundImage: `url(${wallpaper})`, 
      backgroundSize: 'cover', 
      backgroundRepeat: 'repeat-y',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
         
        }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <Typography variant="h6" 
      style={{ fontWeight: 'bold', 
      textDecoration: 'none',
       color: 'white', 
       textAlign: 'center', 
       marginBottom: '40px',
       marginTop: '40px',
       width: '60%',
       backgroundColor: 'rgba(0, 0, 0, 0.7)',
       //backgroundColor: '#1976d2'
        }}>
        Vitajte v našej e-learningovej aplikácii zameranej na Automotive Ethernet! 
        Sme veľmi radi, že ste sa rozhodli objavovať svet automobilového Ethernetu s nami. 
      
        Ethernet v automobilovom kontexte nie je len o kábloch a pripojeniach, 
        ale otvára dvere pre pokročilé technológie a funkcie, ktoré menia spôsob, 
        ako sa vozidlá navrhujú, vyrábajú a používajú. Naša aplikácia vám poskytne 
        vzdelanie o Automotive Ethernete. Po prihlásení budete mať prístup k praktickým cvičeniam, ktoré vám pomôžu získať hlbšie
          porozumenie tejto v oblasti. Sme tu, aby sme vám pomohli rozšíriť vaše vedomosti, zručnosti
           a sebavedomie v tejto kľúčovej oblasti automobilového priemyslu.
      </Typography>
      
    </div>
    </div>
  );
}

export default GridExample;
