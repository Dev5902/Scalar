import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import axios from 'axios';
// import FullScreenDialog from './modal';
import { useEffect } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function View({loading,setLoading}) {
    const [students,setStudents] = React.useState([])
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/view`);
            setStudents(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(0);
        }
        setLoading(0)
    };
    
    fetchData();
    }, []);

    const Populator = ({student}) =>{
        if(student.finalized==true){
            return(
                <>
                <StyledTableCell align="right">{student.field1}</StyledTableCell>
                <StyledTableCell align="right">{student.field2}</StyledTableCell>
                <StyledTableCell align="right">{student.field3}</StyledTableCell>
                <StyledTableCell align='right'>{student.field4}</StyledTableCell>
                <StyledTableCell align='right'>{student.field5}</StyledTableCell>
                </>
            )
        } else {
            return(<><StyledTableCell align="right">TBD</StyledTableCell>
            <StyledTableCell align="right">TBD</StyledTableCell>
            <StyledTableCell align="right">TBD</StyledTableCell>
            <StyledTableCell align='right'>TBD</StyledTableCell>
            <StyledTableCell align='right'>TBD</StyledTableCell></>)
        }
    }
    
    
    
  return (<div>
    {   
    (loading)?<div>We will be back</div>:
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Roll Number</StyledTableCell>
                <StyledTableCell >Name</StyledTableCell>
                <StyledTableCell align="right">Ideation</StyledTableCell>
                <StyledTableCell align="right">Research</StyledTableCell>
                <StyledTableCell align="right">Prgramming</StyledTableCell>
                <StyledTableCell align="right">Presentation</StyledTableCell>
                <StyledTableCell align="right">Viva</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {students.map((student)=>(
                <StyledTableRow key={student.roll_no}>
                <StyledTableCell component="th" scope="row">
                {student.roll_no}
                </StyledTableCell>
                <StyledTableCell >{student.Name}</StyledTableCell>
                <Populator student={student}></Populator>
                
            </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
}
</div>
  );
}
