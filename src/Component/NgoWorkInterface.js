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

  
export default function NgoWorkInterface(props)
{ const classes =useStyles();

    const [ngoId,setNgoId]=useState('')
    const [workName,setWorkName]=useState('')
    const [description,setDescription]=useState('')
    const [dateStart,setDateStart]=useState('')
    const [contactTiming,setContactTiming]=useState('')
    const [poster,setPoster]=useState({bytes:'',file:'/noimage.png' })
    const [status,setStatus]=useState('')

    const [listNgo,setListNgo]=useState([])

    const fetchAllNgo=async()=>{
        var result=await getData("ngo/displayall")
        setListNgo(result)
    
    }
    useEffect(function(){
        fetchAllNgo()
    },[])

    const fillNgo=()=>{
        return listNgo.map((item)=>{
            return(
                <MenuItem value={item.ngoid}>{item.ngoname}</MenuItem>
            )
        })
    }
   


   
    const handlePoster=(event)=>{
        setPoster({bytes:event.target.files[0],
        file:URL.createObjectURL(event.target.files[0])})

        }


    const handleClick=async()=>{
        var error=false
        var msg="<div>"
        if(isBlank(ngoId)){
            error=true
            msg+="<font color='#e74c3c'><b>Ngo Id should not be blank..</b></font><br> "
        }
        if(isBlank(workName)){
            error=true
            msg+="<font color='#e74c3c'><b>Work Name should not be blank..</b></font><br> "
        }
        if(isBlank(description)){
            error=true
            msg+="<font color='#e74c3c'><b>Description should not be blank..</b></font><br> "
        }
        if(isBlank(dateStart)){
            error=true
            msg+="<font color='#e74c3c'><b>Ngo Date Start should not be blank..</b></font><br> "
        }
        if(isBlank(contactTiming)){
            error=true
            msg+="<font color='#e74c3c'><b>Contact Timing should not be blank..</b></font><br> "
        }
        if(isBlank(poster.bytes)){
            error=true
            msg+="<font color='#e74c3c'><b>Plz select  poster..</b></font><br> "
        }
        if(isBlank(status)){
            error=true
            msg+="<font color='#e74c3c'><b>Plz choose status..</b></font><br> "
        }


        msg+="</div>"

        if(error){
            swalhtml(renderHTML(msg))
        }
        else{


        var formData=new FormData()
        formData.append("ngoid",ngoId)
        formData.append("workname",workName)
        formData.append("description",description)
        formData.append("datestart",dateStart)
        formData.append("contacttiming",contactTiming)
        formData.append("poster",poster.bytes)
        formData.append("status",status)
        

        var config={headers:{"content-type":"multipart/form-data"}}
        var result= await postDataAndImage('ngowork/addnewngowork',formData,config)
        if(result){
            swal({
                title: "Ngo's Work  Submitted Successfully",
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

                    <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center' }}>
                        <div style={{fontSize:22,fontWeight:700,letterSpacing:2,padding:20}}>
                        Ngo Work Interface
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                       <FormControl variant="outlined" fullWidth className={classes.formControl}>
                          <InputLabel id="demo-simple-select-outlined-ngo">Ngo Id</InputLabel>
                          <Select
                             labelId="demo-simple-select-outlined-ngo"
                             id="demo-simple-select-outlined-ngo"
                             //value={age}
                             onChange={(event)=>setNgoId(event.target.value)}
                              label="Ngo Id">
                              {fillNgo()}
                           </Select>
                        </FormControl>
               </Grid>


                    <Grid item xs={12}>
                       <TextField onChange={(event)=>setWorkName(event.target.value)} label="Work Name" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} >
                       <TextField onChange={(event)=>setDescription(event.target.value)} label="Work Description" variant="outlined" fullWidth/>
                    </Grid>
                
                    <Grid item xs={6} >
                       <TextField onChange={(event)=>setDateStart(event.target.value)}   type="date"  variant="outlined" fullWidth/>
                    </Grid>
                    
                    <Grid item xs={6} >
                       <TextField onChange={(event)=>setContactTiming(event.target.value)} type="time" variant="outlined" fullWidth/>
                    </Grid>
                  


                    <Grid item xs={12} sm={6}>
                        <span style={{fontSize:16,fontWeight:300}} >Upload Ngo Poster</span>
                        <input onChange={(event)=>handlePoster(event)} accept="image/*" className={classes.input} id="icon-button-poster" type="file" />
                        <label htmlFor="icon-button-poster">
                           <IconButton color="primary" aria-label="upload poster" component="span">
                           <PhotoCamera />
                           </IconButton>
                        </label>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center' }} >
                    <Avatar  variant="rounded" src={poster.file} className={{width:60,height:60}} />
                    </Grid>


                    <Grid item xs={12} >
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                       <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                         
                            onChange={(event)=>setStatus(event.target.value)}
                            label="Status" >
                            <MenuItem value={'Activate'}>Activate</MenuItem>
                            <MenuItem value={'Deactivate'}>Deactivate</MenuItem>  
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