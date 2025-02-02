import './App.css';
import {useState} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';    
import Swal from 'sweetalert2';
import 'animate.css';



function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState();
  const [id, setId] = useState(0);

  const [edit, setEdit] = useState(false);

  const [employees, setEmployees] = useState([]);
// add employee //  
  const add = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      role: role,
      experience: experience
    })
    .then(_res => {
      getEmployees();
      cancel();
      Swal.fire({
        title: "Employee <strong>"+name+"</strong> registered successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 2500,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
    })
    .catch(function(error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Please check your internet connection!":JSON.parse((error)).message
      });
    });
  };
 // update employee // 
  const update = () => {
    Axios.put('http://localhost:3001/update', {
      id: id,
      name: name,
      age: age,
      country: country,
      role: role,
      experience: experience
    })
    .then(_res => {
      getEmployees();
      Swal.fire({
        title: "Employee <strong>"+name+"</strong> updated successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 2500,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
    })
    .catch(function(error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Please check your internet connection!":JSON.parse((error)).message
      });
    });
  };

  // delete employee //
  const deleteEmployee = (val) => {

    Swal.fire({
      title: "Delete",
      html: `Are you sure you want to delete <strong>${val.name}</strong> ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
      
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getEmployees();
          cancel();
          Swal.fire({
            title: "Deleted!",
            text: `${val.name} deleted successfully`,
            icon: "success",
            timer: 2500,
            showConfirmButton: false,
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          }); 
        })
        .catch(function(error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Employee could not be deleted!",
            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Please check your internet connection!":JSON.parse((error)).message
          });
        });
      }
    });
  };

  const cancel = () => {
    setName("");
    setAge("");
    setCountry("");
    setRole("");
    setExperience("");
    setId("");
    setEdit(false);
  }

  const editEmployee = ( val )=>{
    setEdit(true);


    setName(val.name);
    setAge(val.age);
    setCountry(val.country);
    setRole(val.role);
    setExperience(val.experience);
    setId(val.id);
  }

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployees(response.data);
    })
  };

  getEmployees();


  return (
    <div className="container">     
        <div className="card text-center">
          <div className="card-header">
          Employee Management
          </div>
        <div className="card-body">
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Name</span>
            <input type="text" 
              onChange={(event)=>{
                setName(event.target.value); 
              }}
            className="form-control" value={name} placeholder="Your Name" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Your Age</span>
            <input type="number" 
              onChange={(event)=>{
                setAge(event.target.value); 
              }}
            className="form-control" value={age} placeholder="Your Age" aria-label="Age" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Country</span>
            <input type="text" 
              onChange={(event)=>{
                setCountry(event.target.value); 
              }}
            className="form-control"  value={country} placeholder="Your Country" aria-label="Country" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Your Role</span>
            <input type="text" 
              onChange={(event)=>{
                setRole(event.target.value); 
              }}
            className="form-control" value={role} placeholder="Your Role" aria-label="Roles" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Experience</span>
            <input type="number" 
              onChange={(event)=>{
                setExperience(event.target.value); 
              }}
            className="form-control" value={experience} placeholder="In years" aria-label="experience" aria-describedby="basic-addon1" />
          </div>        
        </div>
        <div className="card-footer text-muted">
          {
            edit? 
            <div>
            <button className="btn btn-warning m-2" onClick={update}>Update</button> 
            <button className="btn btn-info m-2" onClick={cancel}>Cancel</button>
            </div>
            :<button className="btn btn-success" onClick={add}>Add</button>
          }
        
        </div>
    </div>

    <table className="table table-hover ">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Age</th>
        <th scope="col">Country</th>
        <th scope="col">Role</th>
        <th scope="col">Experience</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      {
          employees.map((val, _key) => {
            return <tr key={val.id}>
              <th>{val.id}</th>
              <td>{val.name}</td>
              <td>{val.age}</td>
              <td>{val.country}</td>
              <td>{val.role}</td>
              <td>{val.experience}</td>
              <td>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button"
                  onClick={() =>{ 
                    editEmployee(val);
                  }}
                className="btn btn-info">Edit</button>
                <button type="button" className="btn btn-danger" onClick={() =>{ deleteEmployee(val) }}>delete</button>
              </div>
              </td>
            </tr>
            
             
            
          })
        }
        
        
      </tbody>
    </table>
    </div>
  );
}

export default App;
