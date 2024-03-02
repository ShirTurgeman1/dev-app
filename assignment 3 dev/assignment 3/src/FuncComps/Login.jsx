import { useState } from 'react';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import LockIcon from '@mui/icons-material/Lock';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

export default function Login(props) {

  const [inputUserName, setInputUserName] = useState('');
  const [isUserNameError, setIsUserNameError] = useState(false);
  
  const [password, setPassword] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);

    // check user name
  const handleUserNameChange = (event) => {
    let value = event.target.value;
    if (/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(value) && value.length <= 60) {
      setInputUserName(value);
      setIsUserNameError(false); // success, error false
    } else {
      setIsUserNameError(true); // error, error true -> input red
    }
  };

  // check password
  const handlePasswordChange = (event) => {
    let value = event.target.value;
    // בודקים שהסיסמה תואמת את התנאים: בין 7 ל-12 תווים, תו מיוחד, אות גדולה, ומספר
    if (value.length >= 7 && value.length <= 12 && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value)) {
      setPassword(value);
      setIsPasswordError(false); // success, error false
    } else {
      setIsPasswordError(true); // error, error true -> input red
    }
  };

    function btnlogin() {
        Login();
    }

    function Login() {
        let previousUsersString = localStorage.getItem('users');
         // נגדיר מערך עבור המשתמשים הקודמים
        let previousUsers = [];
        // אם הלוקאל סטורג לא ריק תהפוך את הסטרינג של כל המשתמשים לג'ייסון ותכניס למערך
        if (previousUsersString) {
            previousUsers = JSON.parse(previousUsersString);
            let sessionUser = previousUsers.find(u => inputUserName === u.user_name && password === u.password);
            if (sessionUser) {
                sessionStorage.setItem('currentUser', JSON.stringify(sessionUser));
                props.SetUser(sessionUser);
                props.SetUserToEdit(sessionUser);
                Swal.fire({
                  title: 'success',
                  text: 'user: ' + sessionUser.user_name,
                  icon: 'success',
                  confirmButtonText: 'OK'
                });
            } else {
              Swal.fire({
              title: 'error',
              text: 'Username or password incorrect',
              icon: 'error',
              confirmButtonText: 'OK'
            });
                }
        } else {
          Swal.fire({
            title: 'error',
            text: 'No users found',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
    }

    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '30ch', height: '80px' },
          display: 'flex',
          flexDirection: 'column',
          float: 'left',  // הצמדת הטופס לצד שמאל
          marginRight: '20px',  // מרווח מימין לתכנית הראשית
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{padding: '20px'}}><PersonSearchIcon style={{ color: '#1976d2' }}/><br />
        <h4>Log in</h4></div>
        <div>
          <table>
              <tr>
                  <td>
                   <TextField
                     required
                     id="outlined-required"
                     label="User name"
                     type='text'
                     value={inputUserName}
                     onChange={handleUserNameChange}
                     InputLabelProps={{
                        shrink: true,
                      }}
                     error={isUserNameError}
                     InputProps={{
                      startAdornment: (
                        <PersonPinIcon style={{ color: 'gray' }}/>
                      ),
                    }}
                  />
                  </td>
                  <td>
                   <TextField
                   required
                   id="outlined-password-input"
                   label="Password"
                   type="password"
                   autoComplete="current-password"
                   onChange={handlePasswordChange}
                   InputLabelProps={{
                      shrink: true,
                    }}
                    error={isPasswordError}
                    InputProps={{
                      startAdornment: (
                        <LockIcon style={{ color: 'gray' }}/>
                      ),
                    }}
                />
                  </td>
              </tr>
          </table>
          <br /><Button onClick={btnlogin} variant="outlined">Sign in</Button>
        </div>
      </Box>
    )
  }