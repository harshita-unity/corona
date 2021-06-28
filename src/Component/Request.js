import React,{useState,useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import {ServerURL,postDataAndImage,getData,postData} from "./FetchNodeServices";
import swalhtml from "@sweetalert/with-react"
import swal from "sweetalert"
import {isBlank} from './Checks'
import renderHTML from "react-render-html"



const useStyles = makeStyles((theme)=>({
       root:{
           justifyContent:'center',
           alignItems:'center',
           display:'flex',
           

       },
       subdiv:{
            width:750,
            marginTop:20,
            padding:10,
            border:'1px solid'
       }
    })
)

export default function Request(props){
     const classes=useStyles()
     const[firstName,setFirstName]=useState('')
     const[lastName,setLastName]=useState('')
     const[patientName,setPatientName]=useState('')
     const[age,setAge]=useState('')
     const[address,setAddress]=useState('')
     const[city,setCity]=useState('')
     const[state,setState]=useState('')
     const [contactNo,setContactNo]=useState('')
     const [emailId,setEmailId]=useState('')
     const[blood,setBlood]=useState([])
     const[remark,setRemark]=useState('')
     const[status,setStatus]=useState('')

     const [listCity,setListCity]=useState([])
     const [listState,setListState]=useState([])
  
     const[plasma,setPlasma]=useState("")
     const[oxygen,setOxygen]=useState("")
     const[hospital,setHospital]=useState("")
     const[medical,setMedical]=useState("")
     const[ambulance,setAmbulance]=useState("")
    
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

const handleClick=async()=>{
    var body={
        firstname:firstName,
        lastname:lastName,
        patientname:patientName,
        age:age,
        state:state,
        city:city,
        address:address,
        contactno:contactNo,
        emailid:emailId,
        blood:blood,
        plasma:plasma,
        oxygen:oxygen,
        hospital:hospital,
        medical:medical,
        ambulance:ambulance,
        remark:remark,
        status:status 
    }
                  
    var result=await postData('request/addnewrequest',body)
    if(result){
    swal({
        title:"Request Submitted Successfully",
        icon:"success",
        dangerMode:true,
         
        })
    }
}
           
   return(
    <div className={classes.root}>
    <div className={classes.subdiv}>
        <Grid container spacing={1}>
                <Grid xs={12} style={{justifyContent:'center',display:'flex',alignItems:'center'}}>
                    <div style={{fontWeight:700,fontSize:25,font:'bold',letterSpacing:2,padding:15}}>
                <u>Request Form</u>
                   </div>
                </Grid>
            
            <Grid item xs={6}>
                <TextField onChange={(event)=>setFirstName(event.target.value)} label='First Name' variant='outlined' fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField onChange={(event)=>setLastName(event.target.value)} label='Last Name' variant='outlined' fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField onChange={(event)=>setPatientName(event.target.value)} label='Patient Name' variant='outlined' fullWidth/>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField onChange={(event)=>setAge(event.target.value)} label='Age' variant='outlined' fullWidth />
            </Grid>

            <Grid item xs={12} sm={4}>
            <FormControl variant="outlined" fullWidth >
                         <InputLabel id="demo-simple-select-outlined-state">State</InputLabel>
                           <Select
                              labelId="demo-simple-select-outlined-state"
                               id="demo-simple-select-state"
                              //value={age}
                              onChange={(event)=>handleStateChange(event)}
                              label="State"
                              >
                             {fillState()}
                           </Select>
                     </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
            <FormControl variant="outlined" fullWidth >
                         <InputLabel id="demo-simple-select-outlined-city">City</InputLabel>
                           <Select
                              labelId="demo-simple-select-outlined-city"
                               id="demo-simple-select-city"
                              //value={age}
                             onChange={(event)=>setCity(event.target.value)}
                              label="City"
                              >
                             {fillCity()}
                           </Select>
                     </FormControl>
            
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField onChange={(event)=>setAddress(event.target.value)} label='Address' variant='outlined' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField onChange={(event)=>setContactNo(event.target.value)} label="Contact No" variant="outlined" fullWidth/>
            </Grid>
                    
            <Grid item xs={12} sm={6}>
                <TextField onChange={(event)=>setEmailId(event.target.value)} label="Email Id" variant="outlined" fullWidth/>
            </Grid>

            <Grid item xs={12} sm={3}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-blood">Blood</InputLabel>
                  <Select
                     labelId="demo-simple-select-outlined-blood"
                     id="demo-simple-select-outlined"
                    // value={age}
                     onChange={(event)=>setBlood(event.target.value)}
                     label="blood"
                    >
                     <MenuItem value={'A+'}>A+</MenuItem>
                     <MenuItem value={'A-'}>A-</MenuItem>
                     <MenuItem value={'B+'}>B+</MenuItem>
                     <MenuItem value={'B-'}>B-</MenuItem>
                     <MenuItem value={'O+'}>O+</MenuItem>
                     <MenuItem value={'O-'}>O-</MenuItem>
                     <MenuItem value={'AB+'}>AB+</MenuItem>
                     <MenuItem value={'AB-'}>AB-</MenuItem>

                 </Select>
                </FormControl>
            </Grid>
            
           <Grid item xs={9} >
              

                 <Grid container >
                  <Grid item xs={1.1}>
                   <span>Plasma</span>
                <Checkbox color="primary" onClick={()=>setPlasma("Plasma")}/>
                </Grid>
                <Grid item xs={2.2}>
                <span>Oxygen</span>
                <Checkbox color="primary" onClick={()=>setOxygen("Oxygen")}/> 
                </Grid>
                <Grid item xs={2.8}>
                <span>Hospital</span>
                <Checkbox color="primary" onClick={()=>setHospital("Hospital")}/>
                </Grid>
                <Grid item xs={3.2}>
                <span>Medical</span>
                <Checkbox color="primary" onClick={()=>setMedical("Medical")}/>
                </Grid>
                <Grid item xs={3.6}>
                <span>Ambulance</span> 
                <Checkbox color="primary" onClick={()=>setAmbulance("Ambulance")}/>            
                </Grid>
                </Grid>
            </Grid>
            
            <Grid item xs={12} sm={6}>
                <TextField onChange={(event)=>setRemark(event.target.value)} label='Remark' variant='outlined' fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth >
                       <InputLabel id="demo-simple-select-outlined-label" >Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            //value={age}
                            onChange={(event)=>setStatus(event.target.value)}
                            label="Status">
                            <MenuItem value={'pending'}>pending</MenuItem>
                            <MenuItem value={'verified'}>verified</MenuItem>  
                        </Select>
                    </FormControl>
                    </Grid>
            <Grid item xs={12} sm={6}>
                   <Button onClick={()=>handleClick()} variant="contained" color="primary" fullWidth>Save</Button>
                </Grid>
            <Grid item xs={6} >
                <Button label='Clear' variant='contained' color='secondary' fullWidth >Clear</Button>
            </Grid>

            
        </Grid>

    </div>

</div>

   )
}