import React, { useState, useEffect } from "react";
import axios from "axios";
import AddForm from "./AddForm";

function App() {
  const [data, setData] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    designation: "",
    salary: "",
  });

  const handleEdit = (index) => {
    setEditIdx(index);
    setFormData(data[index]);
  };

  const handleDelete = (index) => {
    axios
      .delete(`http://localhost:5000/api/employee/delete/${data[index].id}`)
      .then((response) => {
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const newData = data.map((item, index) =>
      index === editIdx ? formData : item
    );
    setData(newData);
    axios
      .put(`http://localhost:5000/api/employee/update/${data[editIdx].id}`, formData)
      .then((response) => {
        console.log(response);
        setEditIdx(-1);
        setFormData({ name: "", age: "", designation: "", salary: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    console.log("Fetching data from API");
    axios
      .get("http://localhost:5000/api/employee")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                {editIdx === index ? (
                  <>
                    <td>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <button onClick={handleSave}>Save</button>
                      <button onClick={() => setEditIdx(-1)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.designation}</td>
                    <td>{item.salary}</td>
                    <td>
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => handleDelete(index)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddForm />
    </>
  );
}
export default App;
