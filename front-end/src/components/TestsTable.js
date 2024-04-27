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

function QuizForm() {
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState([{ question: '', answers: [{ answer: '', isCorrect: false }] }]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', answers: [{ answer: '', isCorrect: false }] }]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

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
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Create Quiz</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Quiz</DialogTitle>
        <DialogContent>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <TextField
                label={`Question ${questionIndex + 1}`}
                value={question.question}
                onChange={(event) => handleQuestionChange(questionIndex, event)}
                fullWidth
                margin="normal"
              />
              {question.answers.map((answer, answerIndex) => (
                <div key={answerIndex}>
                  <TextField
                    label={`Answer ${answerIndex + 1}`}
                    value={answer.answer}
                    onChange={(event) => handleAnswerChange(questionIndex, answerIndex, event)}
                    fullWidth
                    margin="normal"
                  />
                  <IconButton onClick={() => handleRemoveAnswer(questionIndex, answerIndex)}>
                    <RemoveCircleIcon />
                  </IconButton>
                </div>
              ))}
              <IconButton onClick={() => handleAddAnswer(questionIndex)}>
                <AddCircleIcon />
              </IconButton>
            </div>
          ))}
          <IconButton onClick={handleAddQuestion}>
            <AddCircleIcon />
          </IconButton>
          {questions.length > 1 && (
            <IconButton onClick={() => handleRemoveQuestion(questions.length - 1)}>
              <RemoveCircleIcon />
            </IconButton>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default QuizForm;
