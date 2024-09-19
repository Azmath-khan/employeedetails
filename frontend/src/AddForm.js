import axios from "axios";
import React from "react";

const AddForm = () => {
    const [name, setName] = React.useState("");
    const [age, setAge] = React.useState("");
    const [designation, setDesignation] = React.useState("");
    const [salary, setSalary] = React.useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "name":
                setName(value);
                break;
            case "age":
                setAge(value);
                break;
            case "designation":
                setDesignation(value);
                break;
            case "salary":
                setSalary(value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(name, age, designation, salary);
        axios.post("http://localhost:5000/api/employee/new/", {
            name,
            age,
            designation,
            salary
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleReset = () => {
        setName("");
        setAge("");
        setDesignation("");
        setSalary("");
    }

  return (
    <>
      <form>
        <input type="text" placeholder="Name" name="name" value={name} onChange={handleChange}/>
        <input type="number" placeholder="Age" name="age" value={age} onChange={handleChange}/>
        <input type="text" placeholder="Designation" name="designation" value={designation} onChange={handleChange}/>
        <input type="number" placeholder="Salary" name="salary" value={salary} onChange={handleChange}/>
        <div>
          <button onClick={handleSubmit}>Add</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </form>
    </>
  );
};

export default AddForm;
