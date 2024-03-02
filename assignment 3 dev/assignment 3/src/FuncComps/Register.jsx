import { useState, useRef} from 'react';
import Swal from 'sweetalert2';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import LockIcon from '@mui/icons-material/Lock';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

export default function Register() {
  const [inputUserName, setInputUserName] = useState('');
  const [isUserNameError, setIsUserNameError] = useState(false);
  
  const [password, setPassword] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);

  //const [cpassword, setCPassword] = useState('');
  const [isCPassword, setIsCPasswordError] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [isFirstName, setIsFirstNameError] = useState(false);

  const [lastName, setLastName] = useState('');
  const [isLastName, setIsLastNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [isEmailError, setisEmailError] = useState(false);

  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isDateOfBirthError, setIsDateOfBirthError] = useState(false);

  const [city, setCity] = useState('');
  const [isCityError, setIsCityError] = useState(false);
  const cities = ['תל אביב', 'הוד השרון', 'כפר סבא', 'הרצליה', 'רמת השרון', 'רמת גן', 'גבעתיים'];

  const [street, setStreet] = useState('');
  const [isStreetError, setisStreetError] = useState(false);

  const [number, setNumber] = useState('');

  const [userimg, setUserImg] = useState(null); 



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

  // save image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.onloadend = (f) => {
      setUserImg(f.target.result);
    }
    reader.readAsDataURL(file);
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

  // check confirmed password
  const handleCPasswordChange = (event) => {
    let value = event.target.value;
    // check cpassword == password
    if (value == password) {
      setIsCPasswordError(false); // success, error false
    } else {
      setIsCPasswordError(true); // error, error true -> input red
    }
  };

  // check first name
  const handleFirstNameChange = (event) => {
    let value = event.target.value;
    // english and hebrew only
    if (/^[\u0590-\u05FFa-zA-Z\s]*$/.test(value)) {
      setFirstName(value);
      setIsFirstNameError(false); // success, error false
    } else {
      setIsFirstNameError(true); // error, error true -> input red
    }
  };

  // check last name
  const handleLastNameChange = (event) => {
    let value = event.target.value;
    // english and hebrew only
    if (/^[\u0590-\u05FFa-zA-Z\s]*$/.test(value)) {
      setLastName(value);
      setIsLastNameError(false); // success, error false
    } else {
      setIsLastNameError(true); // error, error true -> input red
    }
  };

  // check email
  const handleEmailChange = (event) => {
    let value = event.target.value;
    if (/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+@([a-zA-Z0-9]+\.)+[a-zA-Z]{2,4}$/.test(value)) {
      setEmail(value);
      setisEmailError(false); // success, error false
    } else {
      setEmail(value);
      setisEmailError(true); // error, error true -> input red
    }
  };

  // check date of birth
  const handleDateOfBirthChange = (event) => {
    let value = event.target.value;
    // Split the date string to get year, month, and day
    let [year, month, day] = value.split('-');
    
    // Check if the year is in 2-digit format (e.g., 97) and convert it to 4-digit format (e.g., 1997)
    if (year.length === 2) {
        year = '19' + year; // Assuming all dates will be from the 20th century
    }
    
    // Recreate the date string with the corrected year
    value = `${year}-${month}-${day}`;
    
    // Calculate age based on the input date of birth
    let birthDate = new Date(value);
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();
    
    // check before birthday or after
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    // Check if age is valid
    if (age < 18 || age >= 120) {
      setDateOfBirth(value);
      setIsDateOfBirthError(true);
    } else {
      setDateOfBirth(value);
      setIsDateOfBirthError(false);
    }
};


  // check city
  const handleCityChange = (event, value) => {
    if (value && cities.includes(value)) {
      setCity(value); // עדכון העיר שנבחרה
      setIsCityError(false);
    } else {
      setCity(''); // איפוס העיר שנבחרה
      setIsCityError(true);
    }
  };

  // check street
  const handleStreetChange = (event) => {
    let value = event.target.value;
    if (/^[\u0590-\u05FF\s]*$/.test(value)) {
      setStreet(value);
      setisStreetError(false); // success, error false
    } else {
      setisStreetError(true); // error, error true -> input red
    }
  };

  const handleNumberChange = (event) => {
    let value = event.target.value;
    setNumber(value);
  }

  //localStorage.clear();
  const formRef = useRef(null);

  function btnsubmit() {
    if (
      userimg &&
      inputUserName &&
      password &&
      firstName &&
      lastName &&
      email &&
      dateOfBirth &&
      city &&
      street &&
      number
    ) {
      registerUser();
      cleanForm();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'Please fill in all required fields',
      });
      
    }
  }

  function cleanForm() {
    setInputUserName('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setEmail('');
    console.log(email);
    setDateOfBirth('');
    setCity('');
    setStreet('');
    setNumber('');
    setUserImg(null);
    if (formRef.current) {
      formRef.current.reset(); // Reset the form
    }
  }
  function registerUser() {
    // המשתמשים הקודמים ששמרנו בלוקאל סטורג הם סטרינג
  let previousUsersString = localStorage.getItem('users');
  // נגדיר מערך עבור המשתמשים הקודמים
  let previousUsers = [];
  // אם הלוקאל סטורג לא ריק תהפוך את הסטרינג של כל המשתמשים לג'ייסון ותכניס למערך
  if (previousUsersString) {
    previousUsers = JSON.parse(previousUsersString);
  }
    let user = ({
      user_name: inputUserName,
      picture: userimg,
      first_name: firstName,
      last_name: lastName,
      password: password,
      date_of_birth: dateOfBirth,
      email: email,
      city: city,
      street: street,
      number: number
    })
    if (previousUsers.find(u => inputUserName === u.user_name || email === u.email)) {
      Swal.fire({
        title: 'error',
        text: 'This user is already exists. Try another user name or email.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } else {
      previousUsers.push(user);
      // נהפוך את הג'ייסון לסטרינג
     let userString = JSON.stringify(previousUsers);
     // עדכון הלוקאל סטורג
     localStorage.setItem('users', userString);
     Swal.fire({
      title: 'success',
      icon: 'success',
      confirmButtonText: 'OK'
    });

    }
  }


  return (
    //<div style={{ float: 'left', width: '100px'}} >
    <Box
      component="form"
      ref={formRef}
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
      <div style={{padding: '20px'}}><PersonAddIcon style={{ color: '#1976d2' }}/><br />
      <h4>Registration</h4></div>
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
                   id="outlined-file"
                   label="Picture"
                   type="file"
                   inputProps={{
                   accept: 'image/jpeg, image/jpg',
                    }}
                    onChange={handleImageChange}
                   InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <ImageSearchIcon style={{ color: 'gray' }}/>
                      ),
                    }}
                />
                </td>
            </tr>
            <tr>
                <td>
                 <TextField
                   required
                   id="outlined-required"
                   label="First name"
                   onChange={handleFirstNameChange}
                   InputLabelProps={{
                      shrink: true,
                    }}
                   error={isFirstName}
                />
                </td>
                <td>
                 <TextField
                   required
                   id="outlined-required"
                   label="Last name"
                   onChange={handleLastNameChange}
                   InputLabelProps={{
                      shrink: true,
                    }}
                    error={isLastName}
                />
                </td>
            </tr>
            <tr>
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
                    helperText="7-12 letters uppercases marks numbers"
                    InputProps={{
                      startAdornment: (
                        <LockIcon style={{ color: 'gray' }}/>
                      ),
                    }}
                />
                </td>
                <td>
                <TextField
                   required
                   id="outlined-password-input"
                   label="Confirm password"
                   type="password"
                   autoComplete="current-password"
                   onChange={handleCPasswordChange}
                   InputLabelProps={{
                      shrink: true,
                    }}
                    error={isCPassword}
                    InputProps={{
                      startAdornment: (
                        <LockIcon style={{ color: 'gray' }}/>
                      ),
                    }}
                />
                </td>
            </tr>
            <tr>
                <td>
                 <TextField
                   required
                   id="outlined-date-input"
                   label="Date of birth"
                   type="date"
                   onChange={handleDateOfBirthChange}
                   InputLabelProps={{
                      shrink: true,
                    }}
                    error={isDateOfBirthError}
                />
                </td>
                <td>
                <TextField
                   required
                   id="outlined-email-input"
                   label="Email"
                   type="email"
                   onChange={handleEmailChange}
                   InputLabelProps={{
                      shrink: true,
                    }}
                    error={isEmailError}
                    placeholder='xxxxx@xxx.com'
                />
                </td>
            </tr>
            <tr>
                <td>
                <Autocomplete
                   id="city-autocomplete"
                   options={cities}
                   value={city}
                   onChange={handleCityChange}
                   renderInput={(params) => (
                     <TextField
                       {...params}
                       required
                       id="outlined-required"
                       label="City"
                       InputLabelProps={{
                         shrink: true,
                       }}
                       error={isCityError}
                     />
                   )}
                 />
                </td>
                <td>
                <TextField
                   required
                   id="outlined-required"
                   label="Street"
                   onChange={handleStreetChange}
                   InputLabelProps={{
                      shrink: true,
                    }}
                    error={isStreetError}
                    helperText="Hebrew only"
                />
                </td>
            </tr>
            <tr>
                <td>
                <TextField
                   required
                   id="outlined-number"
                   label="Number"
                   type="number"
                   onChange={handleNumberChange}
                   InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: 0
                    }}
                />
                </td>
                <td></td>
            </tr>
        </table>
        <br /><Button onClick={btnsubmit} variant="outlined">Sign up</Button>
      </div>
    </Box>
  )
}