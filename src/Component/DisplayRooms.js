import React,{useState,useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import swalhtml from "@sweetalert/with-react";
import swal from "sweetalert";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ServerURL,postDataAndImage,getData,postData} from "./FetchNodeServices"
import {isBlank} from "./Checks";
import renderHTML from "react-render-html" ;

import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Switch from '@material-ui/core/Switch';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MaterialTable, { MTableToolbar } from 'material-table';
import AddBoxIcon from '@material-ui/icons/AddBox';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



    export default function DisplayRooms(props)
  {
     const classes = useStyles();
     const [list,setList]=useState()
    
     

     ///////////////Edit Form/////////////////


     
     const[hospitalId,setHospitalId]=useState('')
     const[roomTypeId,setRoomTypeId]=useState('')
     const[roomID,setRoomID]=useState('')
     const[totalBeds,setTotalBeds]=useState('')
     const[occupied,setOccupied]=useState('')
     const[verify,setVerify]=useState('')

     const [listHospital,setListHospital]=useState([])
    const [listRoomTypes,setListRoomTypes]=useState([])

  
     const handleDelete=async(oldData)=>{

        var body={roomid:oldData.roomid}
        var result=await postData("rooms/deleteroom",body)
        if(result)
        {
            swal({
                title: "Room record Deleted Successfully ",
                icon: "success",
                dangerMode: true,
              })
        }
        else{
          swal({
            title: "Fail to Delete Record ",
            icon: "success",
            dangerMode: true,
          })
      
        }
       
      }
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
            roomid:roomID,
            totalbeds:totalBeds,
            occupied:occupied,
            verify:verify,
        }

            var result=await postData('rooms/editroomdata',body)
           if(result)
          {
           swal({
                 title:"Room record Updated Successfully",
                 icon:"success",
                 dangerMode:true,
  
               })
          }
        }
  
      }
     const editFormView=()=>{

        return(
          <div>
          <Dialog
         open={open}
         onClose={()=>setOpen(false)}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
       >
         <DialogContent>
           <DialogContentText id="alert-dialog-description">
        
        <div className={classes.root}>
            <div className={classes.subdiv}>
                
                <Grid container spacing={1}>
                    <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <div style={{fontSize:30,fontWeight:'bold',letterSpacing:2,padding:20}} >
                            Rooms Interface </div>
                    </Grid>

                    <Grid item xs={12}>
                   <FormControl variant="outlined" fullWidth >
                         <InputLabel id="demo-simple-select-outlined-hospital">Hospital Id</InputLabel>
                           <Select
                              labelId="demo-simple-select-outlined-hospital"
                               id="demo-simple-select-hospital"
                              value={hospitalId}
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
                              value={roomTypeId}
                               onChange={(event)=>setRoomTypeId(event.target.value)}
                              label="RoomType Id"
                              >
                             {showRoomTypes()}
                           </Select>
                     </FormControl>
                </Grid>

                   <Grid item xs={12}>
                      <TextField  value={totalBeds} onChange={(event)=>setTotalBeds(event.target.value)} label="Total Beds" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField  value={occupied} onChange={(event)=>setOccupied(event.target.value)} label="Occupied" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} >
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                       <InputLabel id="demo-simple-select-outlined-label">Verify</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={verify}
                            onChange={(event)=>setVerify(event.target.value)}
                            label="Verify" >
                            <MenuItem value={'Pending'}>Pending</MenuItem>
                            <MenuItem value={'Active'}>Active</MenuItem>  
                        </Select>
                    </FormControl>
                    </Grid>
                </Grid>
            </div>
            </div>

            </DialogContentText>
     </DialogContent>
     <DialogActions>
       <Button onClick={()=>handleClick()}  color="primary" style={{color:'#d63031'}}>
        Edit
       </Button>
       <Button onClick={()=>handleClose()}  color="primary" autoFocus>
         CANCEL
       </Button>
       </DialogActions>
   </Dialog>
 </div>

      )
    }
      
     //////////////////////////////////////////

     ////////////Edit Dialog/////////////////
    
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = (rowData) => {
      setOpen(true);
      
      setHospitalId(rowData.hospitalid)
      setRoomTypeId(rowData.roomtypeid)
      setRoomID(rowData.roomid)
      setTotalBeds(rowData.totalbeds)
      setOccupied(rowData.occupied)
      setVerify(rowData.verify)
    };
  
    const handleClose = () => {
      setOpen(false);
      fetchAllRooms()
    };
  const showEditDialog=()=>
  {
    return (
      <div>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Update/Delete Rooms
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClick}>
                Update
              </Button>
              <Button autoFocus color="inherit" onClick={handleDelete}>
                Delete
              </Button>
            </Toolbar>
          </AppBar>
          {editFormView()}
        
        </Dialog>
      </div>
    );
    }

  /////////////////////////////////////////////////


  const fetchAllRooms=async()=>{
    var result=await getData("rooms/displayall")
    setList(result)
}


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
    fetchAllRooms()
    fetchAllRoomTypes()
    fetchAllHospital()
},[])
////////////////////////////////////////////////////////////////////////////

const [columns, setColumns] = useState([
      
  { title: 'Id', field: 'roomid' },
  { title: 'Hospital', field: 'hname' },
  { title: 'RoomType', field: 'rname' },
  { title: 'TotalBeds', field: 'totalbeds' },
  { title: 'Occupied', field: 'occupied' },
  { title: 'Verify', field: 'verify' },
  ]);
  
    return (
      <div>
      <MaterialTable
        title=""
        columns={columns}
        data={list}
      
        options={{
         
          search: true,
          searchFieldAlignment:'left',
          //actionsColumnIndex: -1,
          //headerStyle:{fontWeight:800,padding:10,fontSize:14,color:'black'},
          sortingFieldStyle:{visible:true},
          searchFieldVariant:"outlined",
          searchFieldStyle:{borderRadius:'50px',borderColor:' #a4b0be',height:'40px',width:'55%', justifyContent:'center'}
   
        }}
      
        components={{
          Toolbar: props =>{
          
           // const propsCopy = { ...props };
            //onsole.log(propsCopy);
            // Hide default title
           // propsCopy.showTitle = false;
            return (
            <div >
              <Grid container spacing={1}>
              <Grid item xs={12} style={{display:'flex', fontSize:24, fontWeight:'bold', padding:20, justifyContent:'center'}}>
               Display Rooms
               
              </Grid>
              
              <Grid item xs={6}>
              <span><MTableToolbar {...props} /></span>
              </Grid>
              <Grid item xs={6} style={{textAlign:'right', padding:10}}>
              <a href='/displayrooms'  ><RefreshOutlinedIcon/></a>  
            <span> <Button variant='contained' background="blue"><AddBoxIcon/><a href='/roomsinterface'  >ADD ROOMS  </a> </Button></span> 
             <span> <Button variant='contained' color="primary" ><CloudDownloadIcon/>Download Excel</Button></span>
            </Grid>
            </Grid>
          
            
              </div>
              )
          }
        }}
        
             
        editable={{
          
          onRowUpdate: (rowData, oldData) =>
             
          new Promise((resolve, reject) => {
            
              setTimeout(() => {
                 
                const dataUpdate = [...list];
                  
                const index = oldData.tableData.id;
                  
                dataUpdate[index] = rowData;
                 {handleClickOpen(rowData)}
                            
                // {opentheDialog()}
                setList([...dataUpdate]);
                 
                resolve();
              }, 1000)
              
            }),
  
          
          onRowDelete: oldData =>
          
          new Promise((resolve, reject) => {
          
            
            setTimeout(() => {
              
                const dataDelete = [...list];
                const index = oldData.tableData.id;
                
                dataDelete.splice(index, 1);
                {handleDelete(oldData)}
                setList([...dataDelete]);
                
                resolve()
              }, 1000)
            }),
        }}
      />
      {editFormView()}
      </div>
    )
  
  
  }
  
  