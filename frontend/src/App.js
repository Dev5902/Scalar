import Header from './components/navBar';
import CustomizedTables from './components/table';
import './App.css';
import {useState,useEffect } from 'react';
import axios from "axios";
// import Main from './components/main';
import {Routes,Route, BrowserRouter} from "react-router-dom";
import View from './components/view';
function App() {
  const [loading,setLoading] = useState(1)
  const [assignedStudents, setAssignedStudents] = useState([])
  // const [unassignedStudents, setUnassignedStudents] = useState([])
  // const [allStudents,setAllStudents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/`);
        setAssignedStudents(response.data);
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(0);
    }

    setLoading(0)
};

fetchData();
}, []);
  return (
    <div className="App">
      <Header></Header>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div>
          {
              loading ? <div>We will be back</div>:
              <CustomizedTables students={assignedStudents} setStudents={setAssignedStudents}></CustomizedTables>
          }
          </div>
        }/>
        <Route path="view" element={
          <View loading={loading} setLoading={setLoading}></View>
        }/>
      </Routes>
      </BrowserRouter>
      
      
    </div>
  )
};

export default App;
