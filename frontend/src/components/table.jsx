import {useState} from 'react';
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
import FullScreenDialog from './modal';
import { Button } from '@mui/material';
import AddStudent from './AddStudent';

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


export default function CustomizedTables({ students, setStudents }) {
    const [openAdd, setOpenAdd] = useState(false)

    const handleCloseAdd = () => {
        
        setOpenAdd(false)
    }
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/`);
            setStudents(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleRemove = (e, roll_no, id) => {
        e.preventDefault()
        console.log(roll_no)
        if (students.length > 3) {
            axios.post('http://localhost:5000/removeStudent', {
                "roll_no": roll_no,
                "id": id
            }).then((res) => {
                fetchData();
            })
        } else return;
    }
    const handleFinalSubmit =()=>   {

        let studentsLength = students.length;
        for(let i  =0 ; i<studentsLength; i++){
            if(students[i].field1==null || students[i].field2===null || students[i].field3==null || students[i].field4==null || students[i].field5==null){
                return;
            }
        }
        axios.post("http://localhost:5000/finalSubmit",{
            "students":students,
            "id":1
        }).then((res)=>{
            fetchData();
        })
    }
    return (<div>
        {
            (students.length > 0) ?

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
                                <StyledTableCell align="right">EDIT</StyledTableCell>
                                <StyledTableCell align="right">REMOVE</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <StyledTableRow key={student.roll_no}>
                                    <StyledTableCell component="th" scope="row">
                                        {student.roll_no}
                                    </StyledTableCell>
                                    <StyledTableCell >{student.Name}</StyledTableCell>
                                    <StyledTableCell align="right">{student.field1}</StyledTableCell>
                                    <StyledTableCell align="right">{student.field2}</StyledTableCell>
                                    <StyledTableCell align="right">{student.field3}</StyledTableCell>
                                    <StyledTableCell align='right'>{student.field4}</StyledTableCell>
                                    <StyledTableCell align='right'>{student.field5}</StyledTableCell>
                                    <StyledTableCell align='right'>
                                        <div className='flex gap-2 w-fit float-right mr-0'>
                                            <i class="fa-regular fa-pen-to-square" />
                                            <FullScreenDialog student={student} fetchData={fetchData}></FullScreenDialog>
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell align='right'>
                                        <div className='flex gap-2 w-fit float-right mr-0' >
                                            <i class="fa-solid fa-user-minus"></i>
                                            <span className='-mt-px' onClick={e => handleRemove(e, student.roll_no, 1)}>Remove</span>

                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> :
                <div>
                    <Typography> Add New Stundents to render their marks </Typography>
                </div>
        }
        <div className='flex gap-4 m-4'>
            <Button variant="outlined" onClick={()=> setOpenAdd(true)}>Add Student</Button>
            <Button variant="contained" onClick={handleFinalSubmit}>Final Submit</Button>
        </div>
        {openAdd && <AddStudent handleClose={handleCloseAdd} open={openAdd} fetcher = {fetchData} studentSize={students.length}/>}
    </div>
    );
}
