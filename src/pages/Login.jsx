import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useUserLoginMutation } from "../services/user";
export default function Login() {
  const navigate=useNavigate();
    const [userLogin,ff]=useUserLoginMutation();
    const handleSubmit = async(event) => {
      event.preventDefault();
      try{
      const data = new FormData(event.currentTarget);
      const val={
        email: data.get("email"),
        password: data.get("password"),
      }
      const d=await userLogin(val).unwrap();
      console.log(d);
      navigate('/');window.location.reload();
    }catch(err){ 
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
            Sign in
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }