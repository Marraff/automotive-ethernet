import React, { useState } from 'react';
import Button from '@mui/material/Button';
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
      name: 'Zmaž',
      cell: row => <Button 
                        type="contained"           
                        variant="contained" 
                        sx={{ mt: 3, mb: 2 }} 
                        onClick={() => handleDelete(row.id)}>Zmaž
                    </Button>

    }
];

  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState([{ question: '', answers: [{ answer: '', isCorrect: false }] }]);
  const [tests, setTests] = useState([]);
  const [name, setName] = useState('');
  const { enqueueSnackbar } = useSnackbar();


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    // Implement delete functionality here
   
    async function delArticle(id){
        try{
            
            const resp = await axios.delete('http://localhost:80/api/test.php', { data: {id}});

            const respNew = await axios.get('http://localhost:80/api/test.php');
            
            const jsonD = respNew.data.split('"tests":')[1];
            const str = jsonD.substring(0, jsonD.length - 1);
            const dataArray = JSON.parse(str);
            setTests(dataArray);

            enqueueSnackbar("Test zmazaný", { variant: 'success' });
            
        }catch(error){
            enqueueSnackbar(`$'error' ${error.message}`, { variant: 'error' });
           
        }        
    }
    delArticle(id);
};

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', answers: [{ answer: '', isCorrect: false }] }]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleTestName = (event) =>{
    setName(event.target.value);
  }

  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex].answer = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.forEach((answer, index) => {
      updatedQuestions[questionIndex].answers[index].isCorrect = index === answerIndex;
    });
    setQuestions(updatedQuestions);
  };

  const handleAddAnswer = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.push({ answer: '', isCorrect: false });
    setQuestions(updatedQuestions);
  };

  const handleRemoveAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    // Add your submit logic here
    console.log(questions);

    async function addtest(){
      try{
          //console.log(data);

          const resp = await axios.post('http://localhost:80/api/test.php', { name: name, test: questions});
          console.log(resp);
          const newData = await axios.get('http://localhost:80/api/test.php');
          //console.log(newData);
          if (resp.status == 200){
              
              const jsonD = newData.data.split('"tests":')[1]
              const str = jsonD.substring(0, jsonD.length - 1);
              const dataArray = JSON.parse(str);
              setTests(dataArray);
              enqueueSnackbar("Nový test úspešne pridaný", { variant: 'success' });
          }
          else{
              enqueueSnackbar("test sa nepodarilo uložiť", { variant: 'error' });
       
          }
          
      }catch(error){
          enqueueSnackbar(`$'error' ${error.message}`, { variant: 'error' });
      }        
  }
  addtest();


    handleClose();
  };

  useEffect(() => {

    async function getArticles(){
        try{
            
            const resp = await axios.get('http://localhost:80/api/test.php');
            
            console.log(resp);
            const jsonD = resp.data.split('"tests":')[1]
            const str = jsonD.substring(0, jsonD.length - 1);
            const dataArray = JSON.parse(str);
            setTests(dataArray);
            
            
        }catch(error){
            //setStatus(`$'error' ${error.message}`);
            enqueueSnackbar(`$'error' ${error.message}`, { variant: 'error' });
        }        
    }
    getArticles();
        
}, [])

  return (
    <div>
       <div className='container mt-5'>
      <Button variant="contained" onClick={handleOpen}> Vytvor test</Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Vytvor test</DialogTitle>
        <TextField
                    label={'Názov testu'}
                    onChange={(event) => handleTestName(event)}
                    width = '90%'
                    margin="normal"
                  />
        <DialogContent>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <TextField
                label={`Otázka ${questionIndex + 1}`}
                value={question.question}
                onChange={(event) => handleQuestionChange(questionIndex, event)}
                fullWidth
                margin="normal"
              />
              {question.answers.map((answer, answerIndex) => (
                <div key={answerIndex}>
                  <TextField
                    label={`Odpoveď ${answerIndex + 1}`}
                    value={answer.answer}
                    onChange={(event) => handleAnswerChange(questionIndex, answerIndex, event)}
                    fullWidth
                    margin="normal"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={answer.isCorrect}
                        onChange={() => handleCorrectAnswerChange(questionIndex, answerIndex)}
                        color="primary"
                      />
                    }
                    label="Správna odpoveď"
                  />
                  <Button onClick={() => handleRemoveAnswer(questionIndex, answerIndex)} color="error">
                  <RemoveCircleIcon />
                  <Typography variant="body2"> Zmaž  </Typography>
                    
                  </Button>
                </div>
              ))}
              <Button onClick={() => handleAddAnswer(questionIndex)} color="success">
                <Typography variant="body2">Pridaj odpoveď  </Typography>
                
              </Button>
            </div>
          ))}
           <Button onClick={handleAddQuestion} color="success">
            <Typography variant="body2">Pridaj otázku  </Typography>
            
          </Button>
          {questions.length > 1 && (
           <Button onClick={() => handleRemoveQuestion(questions.length - 1)} color="error">
              <Typography variant="body2"> Zmaž otázku  </Typography>
              
         </Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>zruš</Button>
          <Button onClick={handleSubmit} variant="contained">pridaj</Button>
        </DialogActions>
      </Dialog>

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
  );
}

export default QuizForm;
