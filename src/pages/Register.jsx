import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useUserRegMutation } from "../services/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate=useNavigate();
  const [userReg,df]=useUserRegMutation();
  const [admin,setA]=useState(false);
  const handleChange = (event) => {
    setA(event.target.checked);
  }
    const handleSubmit = async(event) => {
      event.preventDefault();
     try{
      const data = new FormData(event.currentTarget);
      const val={
        name:data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        Admin:admin
      }
      console.log(val);
      const da=await userReg(val).unwrap();
      console.log("done",da);
      navigate('/login')
      //window.location.reload();
      }
      catch(err){
        console.log(err);
        alert(err.data.message);
      }
    };

    return (
      <Container component="main" maxWidth="xs" sx={{marginTop:'200px'}}>
        <Box
          sx={{  
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Register 
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <input id="remember" type="checkbox" onChange={handleChange}/><span className="ml-4 font-bold">As a Admin</span>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }