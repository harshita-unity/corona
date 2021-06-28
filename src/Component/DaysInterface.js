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
  
export default function Days(props)
{ const classes = useStyles();
  const [daysName,setDaysName]=useState('')
  const [icon,setIcon]=useState({bytes:'',file:'/noimage.png' })
           
  const handleIcon=(event)=>{
    setIcon({bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])})
   }
  const handleClick=async()=>{
    
    var error=false
    var msg="<div>"
    if(isBlank(daysName))
    {error=true
    msg+="<Font color='#e74c3c'><b>Days Should not be blank..</b></Font><br>"
    }
    if(isBlank(icon.bytes)){
      error=true
      msg+="<font color='#e74c3c'><b>Plz select icon..</b></font><br> "
  }
    msg+="</div>"
    if(error)
    {
      swalhtml(renderHTML(msg))
    }
    else
    { 

    var formData=new FormData()
    formData.append("daysname",daysName)
    formData.append("icon",icon.bytes)
   
    

    var config={headers:{"content-type":"multipart/form-data"}}
    var result= await postDataAndImage('days/addnewdays',formData,config)
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
       Add Days 
     </div>
    </Grid>
    <Grid item xs={12}>
     <TextField onChange={(event)=>setDaysName(event.target.value)} label="Days Name" variant="outlined" fullWidth/>
     </Grid>
  
     <Grid item xs={6}>
                   <span style={{fontsize:16,fontweight:300}}>Upload Icon</span>
                   <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                   <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload Icon" component="span">
                    <PhotoCamera />
                    </IconButton>
                    </label>
                </Grid>
    
                <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <Avatar variant="rounded" src={icon.file} style={{width:60,height:60}} />
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

