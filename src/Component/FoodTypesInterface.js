import React,{ useEffect, useState} from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import Avatar from "@material-ui/core/Avatar"
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import swalhtml from "@sweetalert/with-react"
import swal from "sweetalert"
import { makeStyles } from '@material-ui/core/styles';
import {ServerURL, getData, postDataAndImage} from "./FetchNodeServices";
import {isBlank} from './Checks'
import { Sync } from "@material-ui/icons";
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
  
export default function FoodTypesInterface(props)
{ const classes = useStyles();
  const [foodProviderId,setFoodProviderId]=useState('')
  const [foodType,setFoodType]=useState('')
  const [foodDescription,setFoodDescription]=useState('')
  const [days,setDays]=useState('')
  const [price,setPrice]=useState('')
  const [offer,setOffer]=useState('')
  const [icon,setIcon]=useState({bytes:'',file:'/noimage.png'})
  const [verify,setVerify]=useState('')
 
  const [listFoodprovider,setListFoodProvider]=useState([])
  const [listdays,setListDays]=useState([])

  const fetchAllFoodprovider=async()=>{
    var result = await getData("foodprovider/displayall")
    setListFoodProvider(result)
    }
  useEffect(function(){
      fetchAllFoodprovider()
      },[])

    const showFoodProvider=()=>{
      return listFoodprovider.map((item)=>{
        return(
          <MenuItem value={item.foodproviderid}>{item.firmname}</MenuItem>
          )
          
        })
      }

      
  const fetchAllDays=async()=>{
    var result = await getData("days/displayall")
    setListDays(result)
    }
  useEffect(function(){
      fetchAllDays()
      },[])

    const showDays=()=>{
      return listdays.map((item)=>{
        return(
          <MenuItem value={item.daysid}>{item.daysname}</MenuItem>
          )
          
        })
      }



  const handleIcon=(event)=>{
    setIcon({bytes:event.target.files[0],
      file:URL.createObjectURL(event.target.files[0])})
  }

  const handleClick=async()=>{
    
    var error=false
    var msg="<div>"

    if(isBlank(foodProviderId))
    {error=true
    msg+="<Font color='#e74c3c'><b>Food Provider ID Should not be blank..</b></Font><br>"
    }
    if(isBlank(foodType))
    {error=true
      msg+="<Font color='#e74c3c'><b>Food Type Should not be blank..</b></Font><br>"
    }
    if(isBlank(foodDescription))
    {error=true
      msg+="<Font color='#e74c3c'><b>Food Description Should not be blank..</b></Font><br>"
    }
    if(isBlank(days))
    {error=true
      msg+="<Font color='#e74c3c'><b>Days Should not be blank..</b></Font><br>"
    }
    if(isBlank(price))
    {error=true
      msg+="<Font color='#e74c3c'><b>Price Should not be blank..</b></Font><br>"
    }
    if(isBlank(offer))
    {error=true
      msg+="<Font color='#e74c3c'><b>Offer Should not be blank..</b></Font><br>"
    }
    if(isBlank(icon.bytes))
    {error=true
      msg+="<Font color='#e74c3c'><b>Please select Food icon..</b></Font><br>"
    }
    if(isBlank(verify))
    {error=true
      msg+="<Font color='#e74c3c'><b>Verify Should not be blank..</b></Font><br>"
    }
    
  
    msg+="</div>"
    if(error)
    {
      swalhtml(renderHTML(msg))
    }
    else
    { 

        var formData=new FormData()
        formData.append("foodproviderid",foodProviderId)
        formData.append("foodtype",foodType)
        formData.append("fooddescription",foodDescription)
        formData.append("days",days)
        formData.append("price",price)
        formData.append("offer",offer)
        formData.append("icon",icon.bytes)
        formData.append("verify",verify)
    
    var config={headers:{"content-type":"multipart/form-data"}}
    var res = await postDataAndImage('foodtypes/addnewfoodtypes',formData,config);
    if(res)
    {
      
      swal({
         title: "Food Types Submitted Successfully",
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
     Food Types Interface
     </div>
    </Grid>

    
    <Grid item xs={12}>
<FormControl variant="outlined" fullWidth className={classes.formControl}>
    <InputLabel id="demo-simple-select-outlined-category">Food Provider ID</InputLabel>
    <Select
      labelId="demo-simple-select-outlined-category"
      id="demo-simple-select-outlined-category"
      //value={age}
      onChange={(event)=>setFoodProviderId(event.target.value)}
      label="Food Provider ID"
    >
     {showFoodProvider()}
    </Select>
  </FormControl>
 </Grid>

    <Grid item xs={12} sm={6}>
     <TextField  onChange={(event)=>setFoodType(event.target.value)} label="Food Type" variant="outlined" fullWidth/>
    </Grid>

   <Grid item xs={12} sm={6}>
     <TextField  onChange={(event)=>setFoodDescription(event.target.value)} label="Food Description" variant="outlined" fullWidth/>
     </Grid>

     
     <Grid item xs={12}>
<FormControl variant="outlined" fullWidth className={classes.formControl}>
    <InputLabel id="demo-simple-select-outlined-category">Days</InputLabel>
    <Select
      labelId="demo-simple-select-outlined-category"
      id="demo-simple-select-outlined-category"
      //value={age}
      onChange={(event)=>setDays(event.target.value)}
      label="Days"
    >
     {showDays()}
    </Select>
  </FormControl>
 </Grid>

    <Grid item xs={12} sm={6}>
      <TextField  onChange={(event)=>setPrice(event.target.value)} label="Price" variant="outlined" fullWidth/>
    </Grid>

     <Grid item xs={12} sm={6}>
        <TextField  onChange={(event)=>setOffer(event.target.value)} label="Offer" variant="outlined" fullWidth/>
     </Grid>

    <Grid item   xs={6}>
    <span style={{fontSize:16,fontWeight:300}}>Upload Food Icon</span>  
    <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
    <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>

    </Grid>
    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Avatar  variant="rounded" src={icon.file} style={{width:60,height:60}} />
    </Grid>

                  <Grid item xs={12} >
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                       <InputLabel id="demo-simple-select-outlined-label">Verify</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={(event)=>setVerify(event.target.value)}
                            label="Verify" >
                            <MenuItem value={'Pending'}>Pending</MenuItem>
                            <MenuItem value={'Active'}>Active</MenuItem>  
                        </Select>
                    </FormControl>
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


