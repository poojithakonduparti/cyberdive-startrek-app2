// Import necessary modules and components
import './App.css';
import { EmployeeInfo } from './ui-components';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { createTodo } from './graphql/mutations';
import awsExports from "./aws-exports";
import React, { useState } from 'react';

// Configure Amplify with AWS credentials
Amplify.configure(awsExports);

// Set initial form state
const initialState = {name: '', email: '', phone: '', address: '', dob: '', job_title: '', department_name: '', department_id: '' }

// Define main App component
const App = () => {
    // Set form state and list of todos as states using hooks
    const [formState, setFormState] = useState(initialState);
    const [todos, setTodos] = useState([]);

    // Define function to add a new todo item to the list and the backend
    async function addTodo() {
        try {
            // Check if any fields are empty before submitting
            const emptyFields = Object.keys(formState).filter(key => formState[key] === '');
            if (emptyFields.length > 0) {
                alert('Please fill out all fields');
                return;
            }
            // Create new todo object with current form state and update todos list
            const todo = { ...formState }
            setTodos([...todos, todo])
            // Reset form state to initial state
            setFormState(initialState)
            // Log new todo item and submit to backend using GraphQL mutation
            console.log(todo)
            await API.graphql(graphqlOperation(createTodo, {input: todo}))
            // Reload page and display success message
            window.location.reload(false);
            alert('Submitted Successfully!')
        } catch (err) {
            console.log('error creating todo:', err)
        }
    }
    
    // Render EmployeeInfo component with onSubmit function to update form state and add new todo item
    return (
      <div>
        <h1>Employee Information</h1>
        <EmployeeInfo className="EmployeeInfo" onSubmit={fields => { 
            // Check if phone number is exactly 10 digits before submitting
            if (fields.phone.length !== 10) {
                alert('Phone number should be exactly 10 digits long');
                return;
            }
            // Update form state with new employee information and add new todo item
            formState['name'] = fields['name'];
            formState['email'] = fields['email'];
            formState['phone'] = fields['phone'];
            formState['address'] = fields['address'];
            formState['dob'] = fields['dob'];
            formState['job_title'] = fields['job_title'];
            formState['department_name'] = fields['department_name'];
            formState['department_id'] = fields['department_id'];
            addTodo();
        }}/>
      </div>
    )
}

// Export main App component
export default App;