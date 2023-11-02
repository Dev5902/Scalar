const express = require('express')
const pg = require('pg');
const app = express();
const db = require('./postgress-config');
const port = 5000
const cors = require("cors");
const loggedIn = {
    id:'1',
    Name:'Dr. Singh'
};

app.use(express.json())

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}));

app.post('/editGrades', (req, res)=>{
    const { roll_no, field1, field2, field3, field4, field5 } = req.body;
    db.pool.query(
        'UPDATE students SET field1 = $1, field2 = $2, field3 = $3, field4 = $4, field5 = $5 WHERE roll_no = $6',[field1,field2,field3,field4,field5,roll_no],
        (err,result)=>{
            if(err){
                throw err;
            }
    })
    res.status(200).json({"message":"Grades edited successfully"})
    // res.redirect("/");
})



const getNumStudents = async (id) => {
    let totalStudents;
    let promise = new Promise((res, rej) => {
        try {
            db.pool.query(
                'SELECT COUNT(*) FROM members WHERE id = $1',[id], async (err,result)=>{
                    totalStudents = result.rows[0].count
                    res(totalStudents)
                }
            )
        } catch (err) {
            console.log(err)
            rej(3)
        }
    })
    return promise
}

app.post('/finalSubmit', async (req,res)=>{
    // 'UPDATE students SET finalized=1 where roll_no=$1'
    // 'DELETE FROM members WHERE id=$1',[id]
    let students = req.body.students;
    let id = req.body.id;
    for(let i = 0; i<students.length; i++){
        db.pool.query('UPDATE students SET finalized=true WHERE roll_no=$1',[students[i].roll_no]);
    }
    try{
        db.pool.query('DELETE FROM members WHERE id=$1',[id]);
    }catch(err){
        console.log(err);
    }
    res.status(200).json({"message":"Compiled marks submitted"})
})

app.post('/removeStudent', async (req, res)=>{
    const {roll_no,id} = req.body;
    let totalStudents = await getNumStudents(id);
    // console.log(req.body)
    if(parseInt(totalStudents)===3){
        console.log("User made a bad request");
        return res.status(200).json({"message":"The following Action Could Not be performed"});
    }
    try{
        db.pool.query('DELETE From members WHERE roll_no=$1',[roll_no]);
    }catch(err){
        console.log(err)
    }
    
    res.status(200).json({"message":"Removed student"});
})

app.post('/addStudents', async (req,res)=>{
    const id = req.body.id;
    const totalStudents = req.body.students;
    const len = totalStudents.length
    let alreadyPresent = await getNumStudents(id);
    if(parseInt(alreadyPresent)+len>4){
        return res.status(200).json({"message":"The following Action cant be performed select less students"});
    } else if(parseInt(alreadyPresent)+len<3){
        return res.status(200).json({"message":"The following Action cant be performed select less students"});
    }
    // console.log(req.body)
    // res.status(200).json({"message":"working right"});
    for(let i = 0; i<len; i++){
        db.pool.query(
            'INSERT INTO members("id",roll_no) VALUES ($1,$2)',[id,totalStudents[i]]
        )
    }
    res.status(200).json({"message":"Insertion Sucessful"});
})

app.get('/',(req,res)=>{
    let id = 1;
    db.pool.query(
        'SELECT students."roll_no", students."Name", field1, field2, field3, field4, field5 FROM students, members where members.id = 1 AND students.roll_no=members.roll_no',(err,result)=>{
            if(err){
                throw err;
            }
            // console.log(result.rows);
            res.status(200).json(result.rows);
        });
    
    
})

app.get('/studentsNotEvaluated',(req,res)=>{
    db.pool.query('SELECT students.roll_no FROM students WHERE students.finalized = false AND students.roll_no NOT IN (SELECT members.roll_no FROM members)',(err,result)=>{
        if(err){
            throw err;
        }
        return res.status(200).json(result.rows);
    });
})

app.get('/view', (req,res)=>{
    db.pool.query('Select * from students',(err,result)=>{
        if(err) throw err;
        return res.status(200).json(result.rows);
    })
})

app.listen(port,()=>{
    console.log(`app up and running on port ${port}`)
})