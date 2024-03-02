import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Profile(props) {
    console.log(props.user);

    function btnlogout() {
      logoutUser();
    }

    function showEditWindow() {
      props.SetShowEdit(true);
    }

    function logoutUser() {
      sessionStorage.clear();
      props.SetUser('');
    }
    console.log("Here is user")
    console.log(props.user.user_name)
    return (
      <div style={{marginTop: '275px'}}>
        {props.user != '' ? (
          <Card 
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch', height: '80px' },
            display: 'flex',
            flexDirection: 'column',
            float: 'left',  // הצמדת הטופס לצד שמאל
            marginRight: '20px',  // מרווח מימין לתכנית הראשית
          }}>
          <CardMedia
            sx={{ height: 140 }}
            image={props.user.picture}
            title={props.user.user_name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {props.user.first_name} {props.user.last_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {props.user.street} {props.user.number}, {props.user.city}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {props.user.date_of_birth}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={showEditWindow}>Update details</Button>
            <Button size="small">
            <a href="https://poki.com/il/g/bubble-trouble-2#" target="_blank" rel="noopener noreferrer">Game</a>
            </Button>
            <Button size="small" onClick={btnlogout}>Log out</Button>
          </CardActions>
        </Card>
        ) : (
          <div>You need to log in to view your details</div>
        )}
      </div>
    );
  }
  