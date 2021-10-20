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
import CircularProgress from '@material-ui/core/CircularProgress';

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
        width: '100%', 
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
    },
    circle: {
        strokeLinecap: 'round',
      },
}));



export default function SignIn() {
    const classes = useStyles();
    let history = useHistory();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false)
    
    const handleLogin = async()=>{
        console.log("Handle Login");
        const resp=await auth.methods.login(
            {
                "username": username,
                "password": password
            }
        )
        
        if(resp !== true)
        {
            if(resp.includes("Error"))
            {
                alert(resp);
                setLoading(false)
            }
        }
        else{
    
        if(sessionStorage.getItem("Role")==="Store")
            history.replace("saffron/PM/Dashboard");
        else if(sessionStorage.getItem("Role")==="Admin")
            history.replace("saffron/dashboard");
        else if(sessionStorage.getItem("Role")==="Quality Control")
            history.replace("saffron/qc/dashboard");
        else if(sessionStorage.getItem("Role")==="QC_Analyst")
            history.replace("saffron/qc/rmpendingreports");
        else if(sessionStorage.getItem("Role")==="Quality Assurance")
            history.replace("saffron/QA/batch/issue");
        else if(sessionStorage.getItem("Role")==="Production")
            history.replace("saffron/production/batch/request");
            }
        
        
    }
    const isValidated = ()=>{
        if (username === " " || password === " " || username === "" || password === "" )
        {
            return false
        }
        return true
    }
    const loadingfun=()=>{
    {
        console.log(loading)
        if(loading)
        {
            console.log("true")
            return <CircularProgress 
            variant="indeterminate"
            disableShrink
            className={classes.top}
            classes={{
            circle: classes.circle,
            }}
            size={30}
            thickness={4}
          
           />
        }
      
        console.log("false")
        return <span>Sign In </span>
       
        
    }
}
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Username"
                        name="email"
                        
                        value={username}
                        autoFocus
                        onChange={(event)=>{
                            setUsername(event.target.value)
                            console.log(username)
                        }
                    }
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        autoComplete="current-password"
                        onChange={(event)=>{
                           setPassword(event.target.value)
                           console.log(password)
                        
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
                        disabled={loading}
                        onClick={()=>{
                           
                        
                           
                           if(isValidated())
                           { 
                            handleLogin();
                            setLoading(true)
                           }
                           else{
                               alert("Please Provide all Credentials !!")
                           }
                           
                           
                           
                            
                        }}

                    >
                        {loadingfun()}
                        
                       
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
 
