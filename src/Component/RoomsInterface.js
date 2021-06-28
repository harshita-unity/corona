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



export default function RoomsInterface(props){
    const classes=useStyles();
    const [hospitalId,setHospitalId]=useState('')
    const [roomTypeId,setRoomTypeId]=useState('')
    const [totalBeds,setTotalBeds]=useState('')
    const [occupied,setOccupied]=useState('')
    const [verify,setVerify]=useState('')

    const [listHospital,setListHospital]=useState([])
    const [listRoomTypes,setListRoomTypes]=useState([])

    
    
     const fetchAllHospital=async()=>{
        var result=await getData("hospital/displayall")
        setListHospital(result)
       }

       const showHospital=()=>{
        return listHospital.map((item)=>{
          return(
            <MenuItem value={item.hospitalid}>{item.hospitalname}</MenuItem>
           )
        })
       }

       const fetchAllRoomTypes=async()=>{
        var result=await getData("roomtypes/displayall")
        setListRoomTypes(result)
       }

     const showRoomTypes=()=>{
      return listRoomTypes.map((item)=>{
        return(
          <MenuItem value={item.roomtypeid}>{item.roomtype}</MenuItem>
         )
      })
     }

     useEffect(function(){
        fetchAllRoomTypes()
        fetchAllHospital()
   },[])

    const handleClick=async()=>{
      var error=false
      var msg="<div>"
      if(isBlank(hospitalId))
      {error=true
        msg+="<font color='#e74c3c'><b>HospitalId should not be blank..</b></font><br>"
      }
      if(isBlank(roomTypeId))
      {error=true
        msg+="<font color='#e74c3c'><b>RoomTypeId should not be blank..</b></font><br>"
      }
      if(isBlank(totalBeds))
      {error=true
        msg+="<font color='#e74c3c'><b>Totalbeds should not be blank..</b></font><br>"
      }
      if(isBlank(occupied))
      {error=true
        msg+="<font color='#e74c3c'><b>Occupied should not be blank..</b></font><br>"
      }
      if(isBlank(verify))
      {error=true
        msg+="<font color='#e74c3c'><b>Verify should not be blank..</b></font><br>"
      }
      
      msg+="</div>"
      if(error){
        swalhtml(renderHTML(msg))
      }
      else
      {
         var body={
             hospitalid:hospitalId,
             roomtypeid:roomTypeId,
             totalbeds:totalBeds,
             occupied:occupied,
             verify:verify
             }
          var result=await postData('rooms/addnewroom',body)
         if(result)
        {
         swal({
               title:"Room record Submitted Successfully",
               icon:"success",
               dangerMode:true,

             })
        }
      }

    }
    return(<div className={classes.root}>
        <div className={classes.subdiv}>
            
            <Grid container spacing={1}>
                <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div style={{fontSize:30,fontWeight:'bold',letterSpacing:2,padding:20}} >
                        Rooms Interface
                        </div>
                </Grid>
                
                <Grid item xs={12}>
                   <FormControl variant="outlined" fullWidth >
                         <InputLabel id="demo-simple-select-outlined-hospital">Hospital Id</InputLabel>
                           <Select
                              labelId="demo-simple-select-outlined-hospital"
                               id="demo-simple-select-hospital"
                              //value={age}
                               onChange={(event)=>setHospitalId(event.target.value)}
                              label="Hospital Id"
                              >
                             {showHospital()}
                           </Select>
                     </FormControl>
                </Grid>

                <Grid item xs={12}>
                   <FormControl variant="outlined" fullWidth >
                         <InputLabel id="demo-simple-select-outlined-roomtypes">RoomType Id</InputLabel>
                           <Select
                              labelId="demo-simple-select-outlined-roomtypes"
                               id="demo-simple-select-roomtypes"
                              //value={age}
                               onChange={(event)=>setRoomTypeId(event.target.value)}
                              label="RoomType Id"
                              >
                             {showRoomTypes()}
                           </Select>
                     </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField onChange={(event)=>setTotalBeds(event.target.value)} label="Total Beds" variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12}>
                  <TextField onChange={(event)=>setOccupied(event.target.value)} label="Occupied" variant="outlined" fullWidth/>
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


                <Grid item xs={12} sm={6}>
                   <Button onClick={()=>handleClick()} variant="contained" color="primary" fullWidth>Save</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                   <Button variant="contained" color="secondary" fullWidth>Reset</Button>
                </Grid>

            </Grid>

        </div>


        </div>
    )

}