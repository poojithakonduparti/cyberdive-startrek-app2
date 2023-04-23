import './App.css';
import { EmployeeInfo } from './ui-components';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { createTodo } from './graphql/mutations';
import awsExports from "./aws-exports";
import React, { useState } from 'react';
Amplify.configure(awsExports);

const initialState = { profile_picture:'', name: '', email: '', phone: '', address: '', dob: '', job_title: '', department_name: '', department_id: '' }

const App = () => {
    const [formState, setFormState] = useState(initialState);
    const [todos, setTodos] = useState([]);
    
    async function addTodo() {
        try {
          const todo = { ...formState }
          setTodos([...todos, todo])
          setFormState(initialState)
          console.log(todo)
          await API.graphql(graphqlOperation(createTodo, {input: todo}))
          window.location.reload(false);
        } catch (err) {
          console.log('error creating todo:', err)
        }
      }

    // const handleSelect = () => {

    //}
    
    return (
      <div>
  {/* <input type='file' accept="image/png, image/gif, image/jpeg"/> */}
  <h1>Employe Information</h1>
  <EmployeeInfo className="EmployeeInfo" onSubmit={fields => { 

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

export default App;