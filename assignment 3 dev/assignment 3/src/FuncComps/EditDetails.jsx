import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import LockIcon from '@mui/icons-material/Lock';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

export default function EditDetails(props) {
  const [inputUserName, setInputUserName] = useState(props.userToEdit.user_name);
  const [isUserNameError, setIsUserNameError] = useState(false);
  
  const [password, setPassword] = useState(props.userToEdit.password);

  const [isPasswordError, setIsPasswordError] = useState(false);

  //const [cpassword, setCPassword] = useState('');
  const [isCPassword, setIsCPasswordError] = useState(false);

  const [firstName, setFirstName] = useState(props.userToEdit.first_name);

  const [isFirstName, setIsFirstNameError] = useState(false);

  const [lastName, setLastName] = useState(props.userToEdit.last_name);
  const [isLastName, setIsLastNameError] = useState(false);

  const [email, setEmail] = useState('');

  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isDateOfBirthError, setIsDateOfBirthError] = useState(false);

  const [city, setCity] = useState(props.userToEdit.city);
  const [isCityError, setIsCityError] = useState(false);
  const cities = ['תל אביב', 'הוד השרון', 'כפר סבא', 'הרצליה', 'רמת השרון', 'רמת גן', 'גבעתיים'];

  const [street, setStreet] = useState('');
  const [isStreetError, setisStreetError] = useState(false);

  const [number, setNumber] = useState('');

  const [userimg, setUserImg] = useState(null); 

  useEffect(() => {
    setFirstName(props.userToEdit.first_name);
    setLastName(props.userToEdit.last_name);
    setPassword(props.userToEdit.password);
    setNumber(props.userToEdit.number)
    setStreet(props.userToEdit.street)
    setInputUserName(props.userToEdit.user_name)
    setDateOfBirth(props.userToEdit.date_of_birth)
    setCity(props.userToEdit.city)
    setEmail(props.userToEdit.email)
    setUserImg(props.userToEdit.picture)
  }, [props.userToEdit.firstName, props.userToEdit.lastName, props.userToEdit.password, props.userToEdit.number,
 props.userToEdit.street, props.userToEdit.user_name, props.userToEdit.date_of_birth, props.userToEdit.city, props.userToEdit.email, props.userToEdit.picture]);

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

  function btnsubmit() {
    console.log(props.userToEdit.number)
    console.log(lastName)
    console.log(email)
    console.log(dateOfBirth)

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
      editUser();
      props.SetShowEdit(false);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'Please fill in all required fields',
      });
    }
  }

  function editUser() {
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
    previousUsers.forEach((element, index) => {
        if (props.userToEdit.email === element.email) {
            previousUsers.splice(index, 1, user);
            //localStorage.clear();
            let userString = JSON.stringify(previousUsers);
            localStorage.setItem('users', userString);
            props.SetUser(user);
            Swal.fire({
                title: 'success',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    });
  }

  if (props.showEdit){
    return (
        //<div style={{ float: 'left', width: '100px'}} >
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
        <div style={{padding: '20px'}}><br /></div>
        <div>
            <table>
                <tr>
                    <td>
                    <TextField
                    required
                    id="outlined-required"
                    label="User name"
                    type='text'
                    defaultValue={props.userToEdit.user_name}
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
                    defaultValue={props.userToEdit.first_name}
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
                    defaultValue={props.userToEdit.last_name}
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
                    defaultValue={props.userToEdit.password}
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
                    defaultValue={props.userToEdit.password}
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
                    defaultValue={props.userToEdit.date_of_birth}
                    onChange={handleDateOfBirthChange}
                    InputLabelProps={{
                        shrink: true,
                        }}
                        error={isDateOfBirthError}
                    />
                    </td>
                    <td>
                    <TextField
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    defaultValue= {props.userToEdit.email}
                    InputLabelProps={{
                        shrink: true,
                        }}
                        disabled 
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
                    defaultValue={props.userToEdit.street}
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
                    defaultValue={props.userToEdit.number}
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
            <br /><Button onClick={btnsubmit} variant="outlined">Update</Button>
        </div>
        </Box>
    )
    }
    else{
        return ''
    }
}