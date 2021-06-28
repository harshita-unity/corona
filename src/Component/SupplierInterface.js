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
import {ServerURL,postDataAndImage,getData,postData} from "./FetchNodeServices"
import { makeStyles } from '@material-ui/core/styles';
import {isBlank} from "./Checks"
import renderHTML from "react-render-html" 

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';




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

  
export default function SupplierInterface(props)
{ const classes =useStyles();

    const [category,setCategory]=useState('')
    const [firmName,setFirmName]=useState('')
    const [ownerName,setOwnerName]=useState('')
    const [state,setState]=useState('')
    const [city,setCity]=useState('')
    const [address,setAddress]=useState('')
    const [registrationNo,setRegistrationNo]=useState('')
    const [contactNo,setContactNo]=useState('')
    const [emailId,setEmailId]=useState('')
    const [password,setPassword]=useState('')
    const [description,setDescription]=useState('')
    const [photoCopy,setPhotoCopy]=useState({bytes:'',file:'/noimage.png' })
    const [logo,setLogo]=useState({bytes:'',file:'/noimage.png' })
    const [status,setStatus]=useState('')

    const [listCategory,setListCategory]=useState([])

    const [listState,setListState]=useState([])
    const [listCity,setListCity]=useState([])

    const handleStateChange=async(event)=>{
        setState(event.target.value)
        var body={stateid:event.target.value}
        var result= await postData("city/displaycitybystateid",body)
        setListCity(result);

    } 


    const fetchAllState=async()=>{
        var result=await getData("state/displayall")
        setListState(result)
    
    }
    useEffect(function(){
        fetchAllState()
    },[])

    const fillState=()=>{
        return listState.map((item)=>{
            return(
                <MenuItem value={item.stateid}>{item.statename}</MenuItem>
            )
        })
    }

    const fillCity=()=>{
        return listCity.map((item)=>{
            return(
                <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
            )
        })
    }

    

    const fetchAllCategory=async()=>{
        var result=await getData("suppliercategory/displayall")
        setListCategory(result)
    
    }
    useEffect(function(){
        fetchAllCategory()
    },[])

    const fillCategory=()=>{
        return listCategory.map((item)=>{
            return(
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }
   


    const handlePhotoCopy=(event)=>{
        setPhotoCopy({bytes:event.target.files[0],
        file:URL.createObjectURL(event.target.files[0])})

    }
    
    const handleLogo=(event)=>{
        setLogo({bytes:event.target.files[0],
        file:URL.createObjectURL(event.target.files[0])})

    }

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };


    const handleClick=async()=>{
        var error=false
        var msg="<div>"
        if(isBlank(category)){
            error=true
            msg+="<font color='#e74c3c'><b>Category should not be blank..</b></font><br> "
        }
        if(isBlank(firmName)){
            error=true
            msg+="<font color='#e74c3c'><b>Firm Name should not be blank..</b></font><br> "
        }
        if(isBlank(ownerName)){
            error=true
            msg+="<font color='#e74c3c'><b>Owner Name should not be blank..</b></font><br> "
        }
        if(isBlank(state)){
            error=true
            msg+="<font color='#e74c3c'><b>State  should not be blank..</b></font><br> "
        }
        if(isBlank(city)){
            error=true
            msg+="<font color='#e74c3c'><b>City should not be blank..</b></font><br> "
        }
        if(isBlank(address)){
            error=true
            msg+="<font color='#e74c3c'><b>Address should not be blank..</b></font><br> "
        }
        if(isBlank(registrationNo)){
            error=true
            msg+="<font color='#e74c3c'><b>Registration No. should not be blank..</b></font><br> "
        }
        if(isBlank(contactNo)){
            error=true
            msg+="<font color='#e74c3c'><b>Contact No. should not be blank..</b></font><br> "
        }
        if(isBlank(emailId)){
            error=true
            msg+="<font color='#e74c3c'><b>Email Id should not be blank..</b></font><br> "
        }
        /* if(isBlank(password)){
            error=true
            msg+="<font color='#e74c3c'><b>Password should not be blank..</b></font><br> "
        } */
        if(isBlank(description)){
            error=true
            msg+="<font color='#e74c3c'><b>Description should not be blank..</b></font><br> "
        }
        if(isBlank(photoCopy.bytes)){
            error=true
            msg+="<font color='#e74c3c'><b>Plz select Picture... </b></font><br> "
        }
        if(isBlank(logo.bytes)){
            error=true
            msg+="<font color='#e74c3c'><b>Plz select Logo..</b></font><br> "
        }
        if(isBlank(status)){
            error=true
            msg+="<font color='#e74c3c'><b>Plz choose Status..</b></font><br> "
        }


        msg+="</div>"

        if(error){
            swalhtml(renderHTML(msg))
        }
        else{


        var formData=new FormData()
        formData.append("category",category)
        formData.append("firmname",firmName)
        formData.append("ownername",ownerName)
        formData.append("state",state)
        formData.append("city",city)
        formData.append("address",address)
        formData.append("registrationno",registrationNo)
        formData.append("contactno",contactNo)
        formData.append("emailid",emailId)
        formData.append("password",values.password)
        formData.append("description",description)
        formData.append("photocopy",photoCopy.bytes)
        formData.append("logo",logo.bytes)
        formData.append("status",status)
        

        var config={headers:{"content-type":"multipart/form-data"}}
        var result= await postDataAndImage('supplier/addnewsupplier',formData,config)
        if(result){
            swal({
                title: "Supplier Record Submitted Successfully",
                icon: "success",
                dangerMode: true,
              })
        }
    }
}



    

    return(
        <div className={classes.root} >
            <div className={classes.subdiv} >
                <Grid container spacing={1}>

                    <Grid item xs={12}  style={{display:'flex', justifyContent:'center', alignItems:'center' }}>
                        <div style={{fontSize:22,fontWeight:700,letterSpacing:2,padding:20}}>
                        Supplier Interface
                        </div>
                    </Grid>

                    <Grid item xs={12} >
                       <FormControl variant="outlined" fullWidth className={classes.formControl}>
                          <InputLabel id="demo-simple-select-outlined-category">Category</InputLabel>
                          <Select
                             labelId="demo-simple-select-outlined-category"
                             id="demo-simple-select-outlined-category"
                             //value={age}
                             onChange={(event)=>setCategory(event.target.value)}
                              label="Category">
                              {fillCategory()}
                           </Select>
                        </FormControl>
                   </Grid>

                   
                    <Grid item xs={12} sm={6}>
                       <TextField onChange={(event)=>setFirmName(event.target.value)} label="Firm Name" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                       <TextField onChange={(event)=>setOwnerName(event.target.value)} label="Owner Name" variant="outlined" fullWidth/>
                    </Grid>


                    <Grid item xs={12} sm={4}>
                       <FormControl variant="outlined" fullWidth className={classes.formControl}>
                          <InputLabel id="demo-simple-select-outlined-state">State</InputLabel>
                          <Select
                             labelId="demo-simple-select-outlined-state"
                             id="demo-simple-select-outlined-state"
                             //value={age}
                             onChange={(event)=>handleStateChange(event)}
                              label="State ">
                              {fillState()}
                           </Select>
                        </FormControl>
                   </Grid>

                   <Grid item xs={12} sm={4}>
                        <FormControl variant="outlined" fullWidth className={classes.formControl}>
                           <InputLabel id="demo-simple-select-outlined-city">City</InputLabel>
                           <Select
                               labelId="demo-simple-select-outlined-city"
                               id="demo-simple-select-outlined-city"
                               //value={age}
                               onChange={(event)=>setCity(event.target.value)}
                               label="City">
                                {fillCity()}
                           </Select>
                       </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                       <TextField onChange={(event)=>setAddress(event.target.value)} label="Address" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                       <TextField onChange={(event)=>setRegistrationNo(event.target.value)} label="Registration No" variant="outlined" fullWidth/>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                       <TextField onChange={(event)=>setContactNo(event.target.value)} label="Contact No" variant="outlined" fullWidth/>
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                       <TextField onChange={(event)=>setEmailId(event.target.value)} label="Email Id" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                       <FormControl xs={12} className={clsx(classes.margin, classes.textField)} variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                           <OutlinedInput
                           id="outlined-adornment-password"
                           type={values.showPassword ? 'text' : 'password'}
                           value={values.password}
                           onChange={(event)=>setValues({password:event.target.value})}
                           endAdornment={
                           <InputAdornment position="end">
                              <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                               >
                              {values.showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                           </InputAdornment>}
                          labelWidth={70}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4} >
                       <TextField onChange={(event)=>setDescription(event.target.value)} label="Description" variant="outlined" fullWidth/>
                    </Grid>
                    
                    <Grid item xs={6} sm={6}>
                        <span style={{fontSize:16,fontWeight:300}} >Upload PhotoCopy </span>
                        <input onChange={(event)=>handlePhotoCopy(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                           <IconButton color="primary" aria-label="upload photocopy" component="span">
                           <PhotoCamera />
                           </IconButton>
                        </label>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center' }} >
                    <Avatar  variant="rounded" src={photoCopy.file} className={{width:60,height:60}} />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <span style={{fontSize:16,fontWeight:300}} >Upload Logo</span>
                        <input onChange={(event)=>handleLogo(event)} accept="image/*" className={classes.input} id="icon-button-logo" type="file" />
                        <label htmlFor="icon-button-logo">
                           <IconButton color="primary" aria-label="upload logo" component="span">
                           <PhotoCamera />
                           </IconButton>
                        </label>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center' }} >
                    <Avatar  variant="rounded" src={logo.file} className={{width:60,height:60}} />
                    </Grid>


                    <Grid item xs={12} >
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                       <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            //value={age}
                            onChange={(event)=>setStatus(event.target.value)}
                            label="Status" >
                            <MenuItem value={'Verified'}>Verified</MenuItem>
                            <MenuItem value={'Pending'}>Pending</MenuItem>  
                        </Select>
                    </FormControl>
                    </Grid>


                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}} >
                        <Button 
                         onClick={()=>handleClick()}
                         fullWidth variant="contained" 
                         color="primary" >
                             Save
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <Button fullWidth variant="contained" color="secondary">Reset</Button>
                    </Grid>




                </Grid>

            </div>
        
        </div>
    )
   
}