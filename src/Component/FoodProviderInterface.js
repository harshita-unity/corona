import React, { useState,useEffect } from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {ServerURL,postDataAndImage,postData,getData} from "./FetchNodeServices"
import swal from "sweetalert"
import {isBlank} from "./Checks"
import swalhtml from "@sweetalert/with-react"
import renderHTML from "react-render-html"

const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'


    },
    subdiv: {
        padding:20,
        width:700,
        marginTop:20,
        background:'#FFF'

    },
    input: {
        display: 'none',
    },

}));

export default function FoodProviderInterface(props) {
    const classes = useStyles();
    const [ownerName,setOwnerName]=useState('')
    const [firmName,setFirmName]=useState('')
    const [state,setState]=useState('')
    const [city,setCity]=useState('')
    const [address1,setAddress1]=useState('')
    const [address2,setAddress2]=useState('')
    const [contactNo,setContactNo]=useState('')
    const [emailId,setEmailId]=useState('')
    const [password,setPassword]=useState('')
    const [idProofNo,setIdproofNo]=useState('')
    const [photoCopyId,setPhotoCopyId]=useState('')
    const [registrationId,setRegistrationId]=useState('')
    const [uploadIdProof,setUploadIdProof]=useState({bytes:'',file:'/noimage.png'})
    const [logo,setLogo]=useState({bytes:'',file:'/noimage.png'})
    const [photoCopyRegistration,setPhotoCopyRegistration]=useState({bytes:'',file:'/noimage.png'})
    const [verify,setVerify]=useState('')
    

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


    const handleUploadIdProof=(event)=>{
        setUploadIdProof({bytes:event.target.files[0],
        file:URL.createObjectURL(event.target.files[0])})

    }
    
    const handleLogo=(event)=>{
        setLogo({bytes:event.target.files[0],
        file:URL.createObjectURL(event.target.files[0])})

    }

    const handlePhotoCopyRegistration=(event)=>{
        setPhotoCopyRegistration({bytes:event.target.files[0],
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
        
        if(isBlank(ownerName))
        {error=true
            msg+="<font color='#e74c3c'><b>Owner Name Should Not Be Blank..</b></font><br>"
        }
        if(isBlank(firmName))
        {error=true
            msg+="<font color='#e74c3c'><b>Firm Name Should Not Be Blank..</b></font><br>"
        }
        if(isBlank(state))
        {error=true
            msg+="<font color='#e74c3c'><b>State Should Not Be Blank..</b></font><br>"
        }
        if(isBlank(city))
        {error=true
            msg+="<font color='#e74c3c'><b>City Should Not Be Blank..</b></font><br>"
        }
        if(isBlank(address1))
        {error=true
            msg+="<font color='#e74c3c'><b>Address Should Not Be Blank..</b></font><br>"
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
           }
        */
        if(isBlank(idProofNo))
        {error=true
            msg+="<font color='#e74c3c'><b>Proof Id Should Not Be Blank..</b></font><br>"
        }
        if(isBlank(photoCopyId))
        {error=true
            msg+="<font color='#e74c3c'><b>Photocopy Id Should Not Be Blank..</b></font><br>"
        }
        if(isBlank(registrationId))
        {error=true
            msg+="<font color='#e74c3c'><b>Registration Id Should Not Be Blank..</b></font><br>"
        }
        if(isBlank(uploadIdProof.bytes))
        {error=true
            msg+="<font color='#e74c3c'><b>Please Upload IdProof</b></font><br>"
        }
        if(isBlank(logo.bytes))
        {error=true
            msg+="<font color='#e74c3c'><b>Please Select Logo</b></font><br>"
        }
        if(isBlank(photoCopyRegistration.bytes))
        {error=true
            msg+="<font color='#e74c3c'><b> Please Select Photocopy of Registration..</b></font><br>"
        }
        if(isBlank(verify)){
            error=true
            msg+="<font color='#e74c3c'><b>Plz choose Verify..</b></font><br> "
        }
        
       
        if(error)
        {
            swalhtml(renderHTML(msg))
        }
        else{

        var formData = new FormData()
        formData.append("ownername",ownerName)
        formData.append("firmname",firmName)
        formData.append("state",state)
        formData.append("city",city)
        formData.append("address1",address1)
        formData.append("address2",address2)
        formData.append("contactno",contactNo)
        formData.append("emailid",emailId)
        formData.append("password",values.password)
        formData.append("idproofno",idProofNo)
        formData.append("photocopyid",photoCopyId)
        formData.append("registrationid",registrationId)
        formData.append("uploadidproof",uploadIdProof.bytes)
        formData.append("logo",logo.bytes)
        formData.append("photocopyregistration",photoCopyRegistration.bytes)
        formData.append("verify",verify)
    
        var config = {headers:{"content-type":"multipart/form-data"}}
        var result = await postDataAndImage('foodprovider/addnewfoodprovider',formData,config)
        if(result){
            swal({
                title: "Foodprovider Submitted Successfully",
                icon: "success",
                dangerMode: true,
              })
                        }
            }
    }


    return (<div className={classes.root}>
        <div className={classes.subdiv}>
            <Grid container spacing={1}>
                
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, }}>
                        Food Provider Interface
                    </div>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <TextField onChange={(event)=>setOwnerName(event.target.value)} label="Owner Name" variant="outlined" fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField onChange={(event)=>setFirmName(event.target.value)} label="Firm Name" variant="outlined" fullWidth />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            //value={age}
                            onChange={(event)=>handleStateChange(event)}
                            label="State">
                            {fillState()}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            //value={age}
                            onChange={(event)=>setCity(event.target.value)}
                            label="City">
                            {fillCity()}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField onChange={(event)=>setAddress1(event.target.value)} label="Address Line 1" variant="outlined" fullWidth />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField onChange={(event)=>setAddress2(event.target.value)} label="Address Line 2" variant="outlined" fullWidth />
                </Grid>

                    <Grid item xs={12} sm={4}>
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


                <Grid item xs={12} sm={4}>
                    <TextField onChange={(event)=>setIdproofNo(event.target.value)} label="Id Proof Number" variant="outlined" fullWidth />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField onChange={(event)=>setPhotoCopyId(event.target.value)} label="Photocopy Id" variant="outlined" fullWidth />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField onChange={(event)=>setRegistrationId(event.target.value)} label="Registration Id" variant="outlined" fullWidth />
                </Grid>

                   <Grid item xs={6} sm={6}>
                        <span style={{fontSize:16,fontWeight:300}} >Upload IdProof </span>
                        <input onChange={(event)=>handleUploadIdProof(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                           <IconButton color="primary" aria-label="upload IdProof" component="span">
                           <PhotoCamera />
                           </IconButton>
                        </label>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center' }} >
                    <Avatar  variant="rounded" src={uploadIdProof.file} className={{width:60,height:60}} />
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

                    <Grid item xs={6} sm={6}>
                        <span style={{fontSize:16,fontWeight:300}} >Upload PhotoCopy Registration </span>
                        <input onChange={(event)=>handlePhotoCopyRegistration(event)} accept="image/*" className={classes.input} id="icon-button-photocopy" type="file" />
                        <label htmlFor="icon-button-photocopy">
                           <IconButton color="primary" aria-label="upload PhotoCopy Registration" component="span">
                           <PhotoCamera />
                           </IconButton>
                        </label>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center' }} >
                    <Avatar  variant="rounded" src={photoCopyRegistration.file} className={{width:60,height:60}} />
                    </Grid>

                    <Grid item xs={12} >
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                       <InputLabel id="demo-simple-select-outlined-label">Verify</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            //value={age}
                            onChange={(event)=>setVerify(event.target.value)}
                            label="Verify" >
                            <MenuItem value={'Active'}>Active</MenuItem>
                            <MenuItem value={'Deactive'}>Deactive</MenuItem>  
                        </Select>
                    </FormControl>
                    </Grid>
                
                <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button onClick={()=>handleClick()} fullWidth variant='contained' color='primary'>Save</Button>

                </Grid>

                <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button fullWidth variant='contained' color='secondary' >Reset</Button>
                </Grid>

                
            </Grid>
        </div>
    </div>

    )
}