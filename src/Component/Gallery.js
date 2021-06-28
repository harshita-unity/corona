import React,{useState,useEffect} from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Avatar from "@material-ui/core/Avatar"
import swalhtml from "@sweetalert/with-react"
import swal from "sweetalert"
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import {ServerURL,postDataAndImage,getData,postData} from"./FetchNodeServices"
import { isBlank } from "./Checks"
import renderHTML from "react-render-html"
import {DropzoneArea} from 'material-ui-dropzone'
const useStyles=makeStyles((theme)=> ({
root:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
    
    },
    subdiv:{
       padding:20,
       width:750,
       marginTop:20,
       background:'#fff'
       },
     input: {
    display: 'none',
  },

       }));
       export default function Gallery(Props)
      { const classes=useStyles();
         
        
       
        const [icon,setIcon]=useState({bytes:'',file:'/icon.jpg'})
        
        const [dataSources,setDataSource]=useState([])
        
      const handleClick=async()=>{
  
        var formData=new FormData();
      
        dataSources.map((item,index)=>{
         formData.append("pictures"+index,item)
  
        })
     
      var config={headers:{"content-type":"multipart/form-data"}}
      var result= await postDataAndImage('gallery/addimages',formData,config)
      if(result){
          swal({
              title: "Picture Submitted Successfully",
              icon: "success",
              dangerMode: true,
            })
      } 
  
     }
     
     const handleSave = async(files) => {
         setDataSource(files)
  
  
  
       console.log("Select files", files);
     };
        const handleIcon=(event)=>{
          setIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
  
          }
         
           
       return(
            <div className={classes.root}>
            <div className={classes.subdiv}>
       <Grid container spacing={1}>
        <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
         <div style={{fontSize:22,fontweight:700,letterSpacing:2,padding:20 }}>
            Gallery
         </div>
        </Grid>
        
      
              <Grid item xs={12}> 

<DropzoneArea

       onChange={(files)=>handleSave(files)}
       acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
       //showPreviews={true}
       maxFileSize={5000000}
       filesLimit={10}
       //onClose={()=>handleClose()}
   />

   
</Grid>   

    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Button onClick={()=>handleClick()} fullWidth variant="contained" color="primary">Save</Button>
     </Grid>

     <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Button fullWidth variant="contained" color="primary">Reset</Button>
     </Grid>
</Grid>
            </div>
            </div> 
        ) }