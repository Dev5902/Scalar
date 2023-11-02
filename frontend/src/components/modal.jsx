import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import ListItemText from '@mui/material/ListItemText';
// import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { useState } from 'react';
import { TextField } from '@mui/material';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({student,fetchData}) {
    const [data,setData] = useState({})
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (e) => {
        e.preventDefault();
        setOpen(true);
      };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({...data,[name]:value}))
    }
  const handleSubmit =(e)=>{
        e.preventDefault()
        if(data.field1==null || data.field2==null || data.field3==null||data.field4==null || data.field5==null) {
            console.log("Still Null");
            return;
        }
        if(data.field1 < 0 || data.field1 >10 || data.field2<0 || data.field2>10 || data.field3<0 || data.field3>10 || data.field4<0 || data.field4>10 || data.field5<0 || data.field5>10){
            // karte hai
        } else {
            axios.post('http://localhost:5000/editGrades',{
                "roll_no":student.roll_no,
                "field1":parseInt(data.field1),
                "field2":parseInt(data.field2),
                "field3":parseInt(data.field3),
                "field4":parseInt(data.field4),
                "field5":parseInt(data.field5)
            }).then(
                fetchData(),
                handleClose()
            )
        }
  }

  return (
    <React.Fragment>
        <span className='-mt-px' onClick={e=>handleClickOpen(e)}>Edit</span>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon/>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {student.roll_no}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              Submit
            </Button>
          </Toolbar>
        </AppBar>
        <List>
        <TextField
            autoFocus
            margin="dense"
            name="field1"
            label="Ideation"
            fullWidth
            variant="standard"
            // value = {student.field1}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="field2"
            label="Research"
            fullWidth
            variant="standard"
            // default = {student.field2}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="field3"
            label="Programming"
            fullWidth
            variant="standard"
            // default = {student.field3}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="field4"
            label="Presentation"
            fullWidth
            variant="standard"
            // default = {student.field4}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="field5"
            label="Viva"
            fullWidth
            variant="standard"
            // default = {student.field5}
            onChange={handleChange}
          />
        </List>
      </Dialog>
    </React.Fragment>
  );
}