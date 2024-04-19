import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HeartBroken from '@mui/icons-material/HeartBroken';
import axios from 'axios';
import { useState, useContext } from 'react';
import UserContex from './Context'

export default function MediaCover(props) {

  let user = useContext(UserContex);
  let [liked,setLiked] = useState(false)
  let [unLiked,setUnLiked] = useState(false)
  const [likes, setLikes] = useState(props.likes);
  const apiUrl = 'https://backend-server-22ub.onrender.com/likes?liker='+user.id +'&currentlikes='+props.likes+'&mediaID='+props.id+'&operation='
  const handleLike = async () => {
      if (liked) {
          setLikes(likes-1)
          setLiked(false)
      }else{
          try {
              // Make an API request to update the likes count on the server
              const response = await axios.post(apiUrl+'like', {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              
              // If the API request is successful, update the likes count in the client
              setLikes(likes + 1);
              setLiked(true)
            } catch (error) {
              console.error(error);
            }
      }
    
  };
  const handleunLike = async () => {
      if (unLiked) {
          setLikes(likes + 1)
          setUnLiked(false)
      }
      else{
        try {
          // Make an API request to update the likes count on the server
          const response = await axios.post(apiUrl+'unlike', {
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
    
          // If the API request is successful, update the likes count in the client
          setLikes(likes - 1);
          setUnLiked(true)
        } catch (error) {
          console.error(error);
        }
      }
      
    };
    const handleDelete = async ()=>{
        
      try{
        const response = await axios.post(delUrl+props.id,{
          headers: {
            'Content-Type': 'application/json'
          }
        })
        console.log(response);
        toast.info('Media Was Deleted Successfully. Refresh The Page')
      }catch(error){
        console.log(error);
      }
    }
  return (
    <Box
      component="ul"
      sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
    >
      <Card  component="li" sx={{  boxShadow:10,  margin:'auto', marginTop:5 ,maxWidth: 345, flexGrow: 1 }}>
          <video
            loop            
            controls
            width={345}
            poster={props.media}
          >
            <source
              src={props.media}
              type="video/mp4"
            />
          </video>
          <CardContent sx={{marginLeft:4}}>
          <Typography gutterBottom variant="h5" component="div">
             Posted By : {props.author}
          </Typography>
        </CardContent>
        <CardActions sx={{marginLeft:15}}>
        <Button size="small" color="primary">
          <FavoriteBorderIcon onClick={handleLike}></FavoriteBorderIcon>
          <Typography sx={{marginLeft:1, marginRight:1}}>{likes}</Typography>
          <HeartBroken  onClick={handleunLike}></HeartBroken>
        </Button>
      </CardActions>
      {props.uploadpage == true && (
              <Button sx={{marginLeft:17.2}} size="small" color="error">
                <DeleteIcon onClick={handleDelete}></DeleteIcon>
              </Button>
            )}
      </Card>
    </Box>
  );
}