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

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';

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



  
export default function DisplayNgoWork(props)
{
    const [list,setList]=useState()
    const classes = useStyles();




/////////////////////////////////////////////////Edit form/////////////////////////////////////////////////////////

const [ngoworkID,setNgoworkID]=useState('')
const [ngoId,setNgoId]=useState('')
const [workName,setWorkName]=useState('')
const [description,setDescription]=useState('')
const [dateStart,setDateStart]=useState('')
const [contactTiming,setContactTiming]=useState('')
const [poster,setPoster]=useState({bytes:'',file:'/noimage.png' })
const [status,setStatus]=useState('')

const [posterSaveCancel,setPosterSaveCancel]=useState(false)
const [getRowData,setRowData]=useState([])

const [listNgo,setListNgo]=useState([])



const handlePoster=(event)=>{
    setPoster({bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])})
    setPosterSaveCancel(true)
}

 

const handleDelete=async(oldData)=>{

  var body={ngoworkid:oldData.ngoworkid}
  var result=await postData("ngowork/deletengowork",body)

  if(result){
    swal({
        title: "Ngo Work Record Deleted Successfully",
        icon: "success",
        dangerMode: true,
      })
  }
  else{
    swal({
      title: "Fail to Deleted Record",
      icon: "success",
      dangerMode: true,
    })
  }

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
        
        if(isBlank(status)){
            error=true
            msg+="<font color='#e74c3c'><b>Plz choose status..</b></font><br> "
        }


    msg+="</div>"

    if(error){
        swalhtml(renderHTML(msg))
    }
    else{

   var body={
    ngoworkid:ngoworkID,
    ngoid:ngoId,
    workname:workName,
    description:description,
    datestart:dateStart,
    contacttiming:contactTiming,
    status:status,
   
    
   }
   
    var result= await postData('ngowork/editngoworkdata',body)
    if(result){
        swal({
            title: "Ngo Work Record updated Successfully",
            icon: "success",
            dangerMode: true,
          })
    }
}
}

const handleCancelPoster=()=>{
  setPosterSaveCancel(false)
  setPoster({btyes:"",file:`${ServerURL}/images/${getRowData.poster}`})
}


const handleClickSavePoster=async()=>{

    var formData=new FormData()
    formData.append("ngoworkid",ngoworkID)
    formData.append("poster",poster.bytes)
    var config={headers:{"content-type":"multipart/form-data"}}
    var result= await postDataAndImage('ngowork/editposter',formData,config)
    if(result){
      swal({
          title: "Ngo Poster updated Successfully",
          icon: "success",
          dangerMode: true,
        })
        setPosterSaveCancel(false)
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
                             value={ngoId}
                             onChange={(event)=>setNgoId(event.target.value)}
                             label="Ngo Id"
                            >
                                {fillNgo()}
                            </Select>
                     </FormControl>
                </Grid>

                    <Grid item xs={6}>
                       <TextField value={workName} onChange={(event)=>setWorkName(event.target.value)} label="Work Name" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={6} >
                       <TextField value={description} onChange={(event)=>setDescription(event.target.value)} label="Work Description" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={6} >
                       <TextField value={dateStart} onChange={(event)=>setDateStart(event.target.value)} type="date" variant="outlined" fullWidth/>
                    </Grid>
                    
                    <Grid item xs={6} >
                       <TextField value={contactTiming} onChange={(event)=>setContactTiming(event.target.value)} type="time" variant="outlined" fullWidth/>
                    </Grid>

                   
                <Grid item xs={12} sm={6}>
                    <span style={{fontSize:16,fontWeight:300}} >
                      Edit Ngo Poster
                      </span>
                    <input onChange={(event)=>handlePoster(event)} accept="image/*" className={classes.input} id="icon-button-poster" type="file" />
                    <label htmlFor="icon-button-poster">
                       <IconButton color="primary" aria-label="upload poster" component="span">
                       <PhotoCamera />
                       </IconButton>
                    </label>
                </Grid>

                <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column' }} >
                <Avatar  variant="rounded" src={poster.file} className={{width:60,height:60}} />
                
                {posterSaveCancel?<span><Button onClick={()=>handleClickSavePoster()} color="secondary">Save</Button><Button color="secondary" onClick={()=>handleCancelPoster()} >Cancel</Button></span>:<></>}

                </Grid>


                    <Grid item xs={12} >
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                       <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={status}
                            onChange={(event)=>setStatus(event.target.value)}
                            label="Status" >
                            <MenuItem value={'Activate'}>Activate</MenuItem>
                            <MenuItem value={'Deactivate'}>Deactivate</MenuItem>  
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






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////Edit Dialog//////////////////////////////////////////////////////////


  
const [open, setOpen] = React.useState(false);

const handleClickOpen = (rowData) => {
  setRowData(rowData)
  setOpen(true);

  setNgoworkID(rowData.ngoworkid)
  setNgoId(rowData.ngoid)
  setWorkName(rowData.workname)
  setDescription(rowData.description)
  setDateStart(rowData.datestart)
  setContactTiming(rowData.contacttiming)
  setPoster({bytes:"",file:`${ServerURL}/images/${rowData.poster}`})
  setStatus(rowData.status)
 };

 const handleClose = () => {
  setOpen(false);
  fetchAllNgoWork()
};

const showEditDialog=()=>{

  return (
    <div>
      
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit/Delete  Ngo Work
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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    const fetchAllNgoWork=async()=>{
        var result=await getData("ngowork/displayall")
        setList(result)
    
    }

    const fetchAllNgo=async()=>{
      var result=await getData("ngo/displayall")
      setListNgo(result)
  
    }
  const fillNgo=()=>{
    return listNgo.map((item)=>{
        return(
            <MenuItem value={item.ngoid}>{item.ngoname}</MenuItem>
        )
    })
  }
  
    

useEffect(function(){
  fetchAllNgoWork()
  fetchAllNgo()
  
},[])


   
    ////////////////////////////////////////////////////////////////////////

    const [columns, setColumns] = useState([
      { title: 'ID', field: 'ngoworkid' },
      { title: 'Ngo', field: 'nname' },
      { title: 'Name', field: 'workname' },
      { title: 'Description', field: 'description' },
      { title: 'Start Date', field: 'datestart' },
      { title: 'Contact Timing', field: 'contacttiming' },
      { title: 'Poster', field: 'poster',
      render: rowData =><div><img src={`${ServerURL}/images/${rowData.poster}`} style={{borderRadius:5}} width='40' height='40'/></div> },
      { title: 'Status', field: 'status' },
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
                   Display Ngo Works
                   
                  </Grid>
                  
                  <Grid item xs={6}>
                  <span><MTableToolbar {...props} /></span>
                  </Grid>
                  <Grid item xs={6} style={{textAlign:'right', padding:10}}>
                  <a href='/displayngowork'  ><RefreshOutlinedIcon/></a>  
                <span> <Button variant='contained' background="blue"><AddBoxIcon/><a href='/ngoworkinterface'  >ADD NGO WORK </a> </Button></span> 
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
      
      