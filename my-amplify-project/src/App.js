// Import necessary modules and components
import './App.css';
import { EmployeeInfo } from './ui-components';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { createTodo } from './graphql/mutations';
import awsExports from "./aws-exports";
import React, { useState } from 'react';

// Initializing Amplify with aws-exports configuration
Amplify.configure(awsExports);

// Set initial form state
const initialState = { name: '', email: '', phone: '', address: '', dob: '', job_title: '', department_name: '', department_id: '' }
export async function add(todo) {
  const apiData = await API.graphql(graphqlOperation(createTodo, { input: todo }))
  return apiData;
}

// Define main App component
const App = () => {
  // Set form state and list of employee details as states using hooks
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);


  // Define function to add a new employee record to the list and the backend
  async function addTodo() {
    try {
      // Check if any fields are empty before submitting
      const emptyFields = Object.keys(formState).filter(key => formState[key] === '');
      if (emptyFields.length > 0) {
        alert('Please fill out all fields');
        return;
      }
      // Create new object with current form state and update list
      const todo = { ...formState }
      const newTodo = add(todo)
      setTodos([...todos, newTodo])
      // Reset form state to initial state
      setFormState(initialState)

      // Reload page and display success message
      window.location.reload(false);
      alert('Submitted Successfully!')
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  // Render EmployeeInfo component with onSubmit function to update form state and add new record
  return (
    <div>
      <h1>Employee Information</h1>
      <EmployeeInfo className="EmployeeInfo" onSubmit={fields => {
        // Check if phone number is exactly 10 digits before submitting
        if (fields.phone.length !== 10) {
          alert('Phone number should be exactly 10 digits long');
          return;
        }
        // Update form state with new employee information and add new record
        formState['name'] = fields['name'];
        formState['email'] = fields['email'];
        formState['phone'] = fields['phone'];
        formState['address'] = fields['address'];
        formState['dob'] = fields['dob'];
        formState['job_title'] = fields['job_title'];
        formState['department_name'] = fields['department_name'];
        formState['department_id'] = fields['department_id'];
        addTodo();
      }} />
    </div>
  )
}

// Export main App component
export default App;