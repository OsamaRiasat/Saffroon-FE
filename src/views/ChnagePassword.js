import React , {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useHistory } from "react-router-dom"
import auth from '../Services/auth/login.js'

// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="https://material-ui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    select: {
        margin: '5px',
        width: '100px'
    }
}));

export default function ChangePassword() {
    const classes = useStyles();
    let history = useHistory();
    const [old_password,setold_password]=useState("");
    const [new_password,setnew_password]=useState("");
    
    const handleChnagePassword = async()=>{
        console.log("Handle Login");
        const resp=await auth.methods.changePassword(
            {
                "old_password": old_password,
                "new_password": new_password
            }
        )
        console.log(resp);
        history.push("/login");
        // if(sessionStorage.getItem("Role")==="Store")
        //     history.push("saffron/RM/Demand");
        // else if(sessionStorage.getItem("Role")==="Admin")
        //     history.push("saffron/dashboard");
        
        
    }
    const isValidated = ()=>{
        if (old_password === " " || new_password === " " || old_password === "" || new_password === "" )
        {
            return false
        }
        return true
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                   Change Password
                </Typography>
                <form className={classes.form} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        
                        label="Old Password"
                        
                        type="password"
                        value={old_password}
                        autoFocus
                        onChange={(event)=>{
                            setold_password(event.target.value)
                            console.log(old_password)
                        }
                    }
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="New Password"
                        type="password"
                        id="password"
                        value={new_password}
                        autoComplete="current-password"
                        onChange={(event)=>{
                           setnew_password(event.target.value)
                           console.log(new_password)
                        
                        }}
                    />
                    <br/><br/>
                        {/* <InputLabel id="demo-simple-select-label">Department</InputLabel>
                        <Select className={classes.select}
                            id="demo-simple-select"
                        >
                            <MenuItem value={1}>QA</MenuItem>
                            <MenuItem value={2}>Store</MenuItem>
                            <MenuItem value={3}>Purchases</MenuItem>
                        </Select> */}

                    <Button
                        
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>{
                           
                           if(isValidated())
                           { 
                            handleChnagePassword();
                           }
                           else{
                               alert("Please Provide all Credentials !!")
                           }
                            
                        }}
                    >
                        Change Password
                    </Button>
                    {/* <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid> */}
                </form>
            </div>
           
        </Container>
    );
 }
 
