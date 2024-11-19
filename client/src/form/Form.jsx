import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.scss";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]); // To store the fetched data from the backend

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("file", file);
    

    try {
      await axios.post("http://localhost:8800/uploadForm", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("User created successfully!");
      fetchUsers(); // Fetch users after submitting
    } catch (error) {
      console.error("Error creating user:", error.response.data);
      alert("Failed to create user.");
    }
  };

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8800/getForm");
      setUsers(response.data); // Store the data in the state
      console.log('response', response.data)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.formTableContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name:</label>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input
            className={styles.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password:</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Photo:</label>
          <input
            className={styles.input}
            type="file"
            onChange={handleFileChange}
            required
          />
        </div>
        <button className={styles.button} type="submit">Submit</button>
      </form>

      {/* Displaying the user data in a table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
  {users.length === 0 ? (
    <tr>
      <td colSpan="4">No users available</td>
    </tr>
  ) : (
    users.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
        <td>
          {user.photo && (
            <img
              src={`http://localhost:8800/images/${user.photo}`}
              alt="user"
              className={styles.image}
            />
          )}
        </td>
      </tr>
    ))
  )}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default Form;
