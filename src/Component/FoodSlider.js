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


export default function SliderImages(Props)
{ 
  const classes=useStyles();


  const [picture,setPicture]=useState({bytes:'',file:'/noimage.png' })

   {/* const fetchAllPictures=async()=>{
        var result=await getData("sliderimages/displayall")
        setPicture(result)
    
    }
    useEffect(function(){
        fetchAllPictures()
    },[])
  */}
  const handlePicture=(event)=>{
    setPicture({bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])})
   }
                
   const handleClick=async()=>{
    var error=false
    var msg="<div>"

    if(isBlank(picture)){
      error=true
      msg+="<font color='#e74c3c'><b>Please select picture</b></font><br> "
  }
    msg+="</div>"

    if(error){
        swalhtml(renderHTML(msg))
    }
    else{


    var formData=new FormData()
    formData.append("picture",picture.bytes)
   
    

    var config={headers:{"content-type":"multipart/form-data"}}
    var result= await postDataAndImage('foodslider/addnewpicture',formData,config)
    if(result){
        swal({
            title: "Picture Submitted Successfully",
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
            Slider Images
            </div>
          </Grid>

                <Grid item xs={6}>
                   <span style={{fontsize:16,fontweight:300}}>Upload Icon</span>
                   <input onChange={(event)=>handlePicture(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                   <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload Picture" component="span">
                    <PhotoCamera />
                    </IconButton>
                    </label>
                </Grid>
    
                <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <Avatar variant="rounded" src={picture.file} style={{width:60,height:60}} />
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