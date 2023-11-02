import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
// import { Alert } from '@mui/material';
// import {AlertTitle} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function AddStudent({handleClose, open, studentSize, fetcher}) {
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
          padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
          padding: theme.spacing(1),
        },
      }));

    const [personName, setPersonName] = React.useState([]);
    const [studentsList, setStudentsList] = useState([])
    // const [alert,setAlert] = useState("")
      useEffect(() => {
        const fetchData = async () => {
            try {
                const response2 = await axios.get('http://localhost:5000/studentsNotEvaluated');
                setStudentsList(response2.data)
                console.log(response2.data)
            } catch (error) {
                console.log(error);
            } 
        }
        fetchData()
      }, [])
      
      const handleSubmit =(event) => {
        let people = personName.length;
        if(studentSize+people>4 || studentSize+people<3){

        } else {
          axios.post('http://localhost:5000/addStudents',{
            "students":personName,
            id:1
          }).then((res)=>{
              fetcher();
              setPersonName([]);
          })
        }
        
        // console.log(personName);
      }

      // const handleAlert = (x) =>{
      //   if(x.length>0){
      //       return(
      //           <Alert severity="info">
      //               <AlertTitle>Cannot perform this task</AlertTitle>
      //           <strong>{x}</strong>
      //           </Alert>
      //       );
      //   } else{
      //       return <></>;
      //   }
      // }
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
      
  return (
    <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Student
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Available Students</InputLabel>
                <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Available Students" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                >
                {studentsList.map((student) => (
                    <MenuItem key={student.roll_no} value={student.roll_no}>
                    <Checkbox checked={personName.indexOf(student.roll_no) > -1} />
                    <ListItemText primary={student.roll_no} />
                    </MenuItem>
                ))}
                </Select>
        </FormControl>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
  )
}
