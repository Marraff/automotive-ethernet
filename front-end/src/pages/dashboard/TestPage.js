import React, { useState } from 'react';
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import DataTable from 'react-data-table-component';
import { useEffect } from 'react';
import NavBarLoggedIn from '../../components/NavigationbarLoggedIn.js';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import math_wallpaper from '../../images/math_wallpaper2.jpg';

function QuizForm() {

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
      name: 'Otestuj sa',
      cell: row => <Button 
                        type="contained"           
                        variant="contained" 
                        sx={{ mt: 3, mb: 2 }} 
                        onClick={() => handleShowTest(row.id)}>Otestuj sa!
                    </Button>

    }
  ];

  const [open, setOpen] = useState(false);
  const [tests, setTests] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [quiz, setQuiz] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [testName, setTestName] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [points, setPoints] = useState(0);


  const handleShowTest = (id) => {
    // Implement delete functionality here
    function showT(id){
        for (const key in tests) {
            if (tests.hasOwnProperty(key)) {
                const test = tests[key];
                // Check if the ID matches
                if (test.id === id) {
                    //console.log(JSON.parse(test.test)); // Return the test object if found
                    //console.log("bla");
                    const pom = JSON.parse(test.test);
                    //console.log(test.test);
                    setQuiz(pom);
                    setTestName(test.name);
                    
                    
                }
            }
        }
    }
    showT(id);
    handleOpenQuiz();
    
   
  };

  const handleOpenQuiz = () => {
    setShowQuiz(true);
    //console.log(quiz);
  };

  const handleCloseQuiz = () => {
    setShowResults(false);
    setOpen(false);
    setShowQuiz(false);
    setSelectedAnswers([]);
  };

  const handleSubmitQuiz = () => {
    

    if(quiz.length == selectedAnswers.length){
        
        let newPoints = 0;
        for (let i = 0; i < quiz.length; i++) {
          const correctAnswerIndex = quiz[i].answers.findIndex(answer => answer.isCorrect);
          if (correctAnswerIndex !== -1 && selectedAnswers[i] === correctAnswerIndex) {
            newPoints++;
          }
        }
        setPoints(newPoints);
        setShowResults(true);
    
    }
    else{
        // If not all questions are answered, display a message or handle it accordingly
        enqueueSnackbar('Pred odovzdaním musíte vyplniť všetky otázky!', { variant: 'error' });
       
        setShowResults(false);
        
        // You can also show a snackbar or any other UI indication to prompt the user to answer all questions
        return;
      }

    

  };

  const handleRadioChange = (questionIndex, answerIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleAnswerClick = (questionIndex, answerIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  useEffect(() => {

    async function getArticles(){
        try{
            
            const resp = await axios.get('http://localhost:80/api/test.php');
            
            const jsonD = resp.data.split('"tests":')[1]
            const str = jsonD.substring(0, jsonD.length - 1);
            const dataArray = JSON.parse(str);
            setTests(dataArray);
            
            
        }catch(error){
            enqueueSnackbar(`$'error' ${error.message}`, { variant: 'error' });
        }        
    }
    getArticles();
        
}, [])

  return (
    <div >
       

        <NavBarLoggedIn />

        <div style={{ 
      backgroundImage: `url(${math_wallpaper})`, 
      backgroundSize: 'contain', 
      backgroundRepeat: 'repeat-y',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
         
        }}>

        <div className='container mt-5' >
          <DataTable
            columns={columns}
            data={tests}
            pagination
            highlightOnHover
            striped
            dense
          />
        
        </div>
        </div>
        <Dialog open={showQuiz} onClose={handleCloseQuiz} fullWidth maxWidth="md">
            <DialogTitle style={{ textAlign: 'center' }} variant='h5'>{testName}</DialogTitle>


          <DialogContent>
      {quiz.map((question, questionIndex) => (
        <div key={questionIndex} className="question-container">
          <Typography variant="h6" gutterBottom>
            Otázka {questionIndex + 1}:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {question.question}
          </Typography>
          {question.answers.map((answer, answerIndex) => (
            <div key={answerIndex} className="answer-container" style={{ textAlign: 'center' }}>
            
              <Button
                variant={selectedAnswers[questionIndex] === answerIndex ? "contained" : "outlined"}
                sx={{ width: '90%', mt: 1, mb: 1 }}
                startIcon={selectedAnswers[questionIndex] === answerIndex ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                onClick={() => handleAnswerClick(questionIndex, answerIndex)}
              >{answer.answer}</Button>
            </div>
          ))}
        </div>
      ))}
    {showResults && (
      <div>
        <Typography variant="h6" gutterBottom style={{ textAlign: 'center', marginBottom: '16px' }}>
          Tvoje Skóre: {points} z {quiz.length}
        </Typography>
        <Typography variant="body1" gutterBottom style={{ textAlign: 'center', marginBottom: '16px' }}>
          Správne odpovede:
        </Typography>
        <Grid container justifyContent="center" spacing={2}>
          {quiz.map((question, questionIndex) => (
            <Grid item xs={12} key={questionIndex}>
              <Paper
                elevation={3}
                style={{
                  padding: '16px',
                  backgroundColor:
                    selectedAnswers[questionIndex] === quiz[questionIndex].answers.findIndex(answer => answer.isCorrect)
                    ? 'rgba(0, 200, 83, 0.1)' // Vibrant green background for correct answers
                    : 'rgba(255, 64, 129, 0.1)' // Vibrant red background for wrong answers
              }}
              >
                <Typography variant="body1" gutterBottom>
                  Otázka {questionIndex + 1}: {question.answers.find((answer, index) => index === selectedAnswers[questionIndex]).answer}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    )}
    </DialogContent>

            <DialogActions>
              <Button onClick={handleCloseQuiz} color="error">
                zruš
              </Button>
              <Button onClick={handleSubmitQuiz} color="primary" variant="contained">
                odovzdaj
              </Button>
            </DialogActions>
        </Dialog>

      
       
    </div>
    
);
}
export default QuizForm;
