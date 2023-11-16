import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import axios from "axios";
import { useParams,useNavigate,Link  } from 'react-router-dom';

const ViewUser = () => {
    const id = useParams().id;
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const headers = {
      'Authorization': user.accessToken
    }
    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );

      useEffect(() => {
        const oneUser = async () => {
            try {
              const result = await axios.get(`http://localhost:8080/api/user/view/${id}`,headers);
                setUser(result.data)
              } catch (error) { 
              console.log(error);      
            }
          };

          oneUser();
    }, []);  

    const deleteUser = async () => {
        try {
          console.log(id)
            await axios.delete(`http://localhost:8080/api/user/delete/${id}`,headers);
            navigate(`/user`)
        } catch (error) { 
          console.log(error);
        }
    };

    return (
        <Card sx={{ marginTop:'2%',marginLeft:'25%',minWidth: 275, maxWidth: "50vw", padding: 5 }}>
           <CardContent key={user.id}>
            <Typography variant="h5" component="div">
                유저 번호 : {user.id}
            </Typography>
            <Typography variant="body1">
                유저 이름 : {user.username}
            </Typography>
            <Typography variant="body1">
                유저 닉네임 : {user.nickname}
            </Typography>
            <Typography variant="body1">
                유저 이메일 : {user.email}
            </Typography>
            <Typography variant="body1">
                유저 권한 : {user.role}
            </Typography>
            {user.roles && user.roles.map((role)=>{
                return <span>{role.name} </span>
            })}
            
        </CardContent>
        <CardActions>
            <Link to={`/user/update/${id}`} state={{ user: user}}> 
              <Button variant="contained" color="success">수정</Button>
            </Link>
            <Button variant="contained" color="error" onClick={deleteUser}>삭제</Button>
        </CardActions>
        </Card>
      );
}

export default ViewUser;