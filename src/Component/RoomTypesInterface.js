import React,{useState,useEffect} from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import swalhtml from "@sweetalert/with-react"
import swal from "sweetalert"

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ServerURL,postDataAndImage,getData} from "./FetchNodeServices"
import { makeStyles } from '@material-ui/core/styles';
import {isBlank} from "./Checks"
import renderHTML from "react-render-html" 



const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
     
    },
    subdiv:{
        padding:20,
        width:700,
        marginTop:20,
        background:'#FFF'
    },
    input: {
        display: 'none',
    },
  }));


export default function RoomtypesInterface(Props)
{ 
  const classes=useStyles();
     
  const [roomType,setRoomType]=useState('')
  const [description,setDescription]=useState('')
                
   const handleClick=async()=>{
    var error=false
    var msg="<div>"
    
    if(isBlank(roomType)){
        error=true
        msg+="<font color='#e74c3c'><b>RoomType  should not be blank..</b></font><br> "
    }
    if(isBlank(description)){
        error=true
        msg+="<font color='#e74c3c'><b>Description should not be blank..</b></font><br> "
    }

    msg+="</div>"

    if(error){
        swalhtml(renderHTML(msg))
    }
    else{


    var formData=new FormData()
    formData.append("roomtype",roomType)
    formData.append("description",description)

    var config={headers:{"content-type":"multipart/form-data"}}
    var result= await postDataAndImage('roomtypes/addnewroomtype',formData,config)
    if(result){
        swal({
            title: "RoomType Record  Submitted Successfully",
            icon: "success",
            dangerMode: true,
          })
    }
}
}


        
  return(
  <div className={classes.root}>
    <div className={classes.subdiv}>
      <Grid container spacing={1}>

          <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
            <div style={{fontSize:22,fontweight:700,letterSpacing:2,padding:20 }}>
             RoomTypes Interface
            </div>
          </Grid>

             <Grid item xs={12}>
                <TextField onChange={(event)=> setRoomType(event.target.value)} label="Room Type" variant="outlined" fullWidth/>
              </Grid>

               <Grid item xs={12}>
                  <TextField onChange={(event)=> setDescription(event.target.value)} label="Description" variant="outlined" fullWidth/>
                </Grid> 

                
                
               <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <Button onClick={()=>handleClick()} fullWidth variant="contained" color="primary">Save</Button>
                </Grid>

                <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <Button fullWidth variant="contained" color="secondary">Reset</Button>
                 </Grid>

      </Grid>
    </div>
  </div>

)}
 