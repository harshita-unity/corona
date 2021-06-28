import React,{ useState} from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import swalhtml from "@sweetalert/with-react"
import swal from "sweetalert"
import { makeStyles } from '@material-ui/core/styles';
import {ServerURL,postDataAndImage} from "./FetchNodeServices";
import {isBlank} from './Checks'
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
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
    formControl: {
      
      minWidth: 690,
    },
  }));
  
export default function Tips(props)
{ const classes = useStyles();
  const [tips,settips]=useState('')
         

  const handleClick=async()=>{
    
    var error=false
    var msg="<div>"
    if(isBlank(tips))
    {error=true
    msg+="<Font color='#e74c3c'><b>Tips Should not be blank..</b></Font><br>"
    }
  
    msg+="</div>"
    if(error)
    {
      swalhtml(renderHTML(msg))
    }
    else
    { 

    var formData=new FormData()
    formData.append("tips",tips)
   
    

    var config={headers:{"content-type":"multipart/form-data"}}
    var result= await postDataAndImage('tips/adddata',formData,config)
    if(result){
        swal({
            title: "Data Submitted Successfully",
            icon: "success",
            dangerMode: true,
          })
    }
    }
  }

return(<div className={classes.root}>
  <div className={classes.subdiv}>
   <Grid container spacing={1}>
    <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
     <div style={{ fontSize:22,fontWeight:700,letterSpacing:2,padding:20 }}>
       Problem Tips
     </div>
    </Grid>
    <Grid item xs={12}>
     <TextField onChange={(event)=>settips(event.target.value)} label="Tips" variant="outlined" fullWidth/>
     </Grid>
  
   

  <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
   <Button onClick={()=>handleClick()} fullWidth variant="contained" color="primary">Save</Button>
  </Grid>

  <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
   <Button fullWidth variant="contained" color="secondary">Reset</Button>
  </Grid>

  </Grid>
  </div>

</div>)

}

