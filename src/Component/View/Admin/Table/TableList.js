import React, { useEffect, useState } from "react";
import { FaChair } from "react-icons/fa";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./Table.css";

const TableList = () => {
  const [tables, setTables] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    // Fetch table data from the API
    axios
      .get("http://localhost:8080/api/tables")
      .then((response) => {
        setTables(response.data);
      })
      .catch((error) => console.error("Error fetching tables:", error));
  }, []);

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8080/api/tables", data)
      .then((response) => {
        if (response.data.tableId) {
          // Successfully created table, add it to the list
          setTables([...tables, response.data]);
          reset(); // Reset the form after submission
          setShowForm(false); // Hide the form after submission
        } else {
          alert("Table with this name already exists!");
        }
      })
      .catch((error) => console.error("Error creating table:", error));
  };

  return (
    <div className="body">
      <div className="container my-5">
        <div className="row">
          {tables.map((table) => (
            <div className="col-md-3 mb-4" key={table.tableId}>
              <div className="card table-card">
                <div className="card-body text-center">
                  <FaChair className="table-icon" />
                  <h5 className="card-title mt-2">{`Table ${table.tableName}`}</h5>
                  <p>Capacity: {table.capacity}</p>
                  <p>Status: {table.isAvailable ? "Available" : "Occupied"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button to toggle form visibility */}
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add Table"}
        </button>

        {/* Conditionally render the form */}
        {showForm && (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <div className="form-group">
              <label htmlFor="tableName">Table Name</label>
              <input
                type="text"
                className="form-control"
                id="tableName"
                {...register("tableName", { required: true })}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="capacity">Capacity</label>
              <input
                type="number"
                className="form-control"
                id="capacity"
                {...register("capacity", { required: true })}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Add Table
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TableList;
