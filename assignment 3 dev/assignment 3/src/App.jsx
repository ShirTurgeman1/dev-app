import { useState } from 'react';
import './App.css';
import Login from './FuncComps/Login';
import Register from './FuncComps/Register';
import Profile from './FuncComps/Profile';
import EditDetails from './FuncComps/EditDetails';
import SystemAdmin from './FuncComps/SystemAdmin';

function App() {
  const [user, SetUser] = useState('');
  const [showEdit, SetShowEdit] = useState(false);
  const [userToEdit, SetuserToEdit] = useState('');
  const [updateAdminTable, SetupdateAdminTable] = useState(false);
  
  return (
    <>
    <Register />
    <Login SetUser={SetUser} SetUserToEdit={SetuserToEdit} userToEdit={userToEdit}/>
    <Profile user={user} SetUser={SetUser} SetShowEdit={SetShowEdit} />
    <EditDetails userToEdit={userToEdit} SetUser={SetuserToEdit} showEdit={showEdit} SetShowEdit={SetShowEdit} />
    <SystemAdmin user={user} updateAdminTable={updateAdminTable} SetupdateAdminTable={SetupdateAdminTable} SetShowEdit={SetShowEdit} SetUserToEdit={SetuserToEdit}/>
    </>
  )
}

export default App
