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




export default function DisplayNewsAgency(props)
{
    const [list,setList]=useState()
    const classes = useStyles();




/////////////////////////////////////////////////Edit form/////////////////////////////////////////////////////////

const [agencyID,setAgencyID]=useState('')
const [agencyName,setAgencyName]=useState('')
const [ownerName,setOwnerName]=useState('')
const [state,setState]=useState('')
const [city,setCity]=useState('')
const [address,setAddress]=useState('')
const [registrationNo,setRegistrationNo]=useState('')
const [contactNo,setContactNo]=useState('')
const [emailId,setEmailId]=useState('')
const [password,setPassword]=useState('')
const [photoCopy,setPhotoCopy]=useState({bytes:'',file:'/noimage.png' })
const [logo,setLogo]=useState({bytes:'',file:'/noimage.png' })
const [verify,setVerify]=useState('')
    
const [photoCopySaveCancel,setPhotoCopySaveCancel]=useState(false)
const [logoSaveCancel,setLogoSaveCancel]=useState(false)
const [getRowData,setRowData]=useState([])

const [listState,setListState]=useState([])
const [listCity,setListCity]=useState([])

const [Status, setStatus] = React.useState({});


const handleChange =async (event) => {
  setStatus({ ...Status, [event.target.name]: event.target.checked });
//  var result = jQuery('.switch-input').is(':checked')?'yes':'no';
  var formData=new FormData()
  formData.append("agencyID",agencyID)
  formData.append('Status',setStatus)

  var config={headers:{"content-type":"multipart/form-data"}}
  var r=await postDataAndImage('news/addswitch',formData,config)
 
}; 


const handlePhotoCopy=(event)=>{
    setPhotoCopy({bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])})
    setPhotoCopySaveCancel(true)
}

const handleLogo=(event)=>{
    setLogo({bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])})
    setLogoSaveCancel(true)
}

 

const handleDelete=async(oldData)=>{

  var body={agencyid:oldData.agencyid}
  var result=await postData("newsagency/deletenewsagency",body)

  if(result){
    swal({
        title: "News Agency Record Deleted Successfully",
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

    if(isBlank(agencyName)){
        error=true
        msg+="<font color='#e74c3c'><b>Agency Name should not be blank..</b></font><br> "
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
            msg+="<font color='#e74c3c'><b>City  should not be blank..</b></font><br> "
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
        if(isBlank(verify)){
          error=true
          msg+="<font color='#e74c3c'><b>Plz choose Verify..</b></font><br> "
        }

    msg+="</div>"

    if(error){
        swalhtml(renderHTML(msg))
    }
    else{

   var body={

    agencyid:agencyID,
    agencyname:agencyName,
    ownername:ownerName,
    state:state,
    city:city,
    address:address,
    registrationno:registrationNo,
    contactno:contactNo,
    emailid:emailId,
    password:password,
    verify:verify,
    
   }
   
    var result= await postData('newsagency/editnewsagencydata',body)
    if(result){
        swal({
            title: "News Agency Record updated Successfully",
            icon: "success",
            dangerMode: true,
          })
    }
}
}


const handleCancelPhotoCopy=()=>{
  setPhotoCopySaveCancel(false)
  setPhotoCopy({btyes:"",file:`${ServerURL}/images/${getRowData.photocopy}`})
}


const handleCancelLogo=()=>{
  setLogoSaveCancel(false)
  setLogo({btyes:"",file:`${ServerURL}/images/${getRowData.logo}`})
}


const handleClickSavePhotoCopy=async()=>{
    var formData=new FormData()
    formData.append("agencyid",agencyID)
    formData.append("photocopy",photoCopy.bytes)
    var config={headers:{"content-type":"multipart/form-data"}}
    var result= await postDataAndImage('newsagency/editphotocopy',formData,config)
    if(result){
      swal({
          title: "PhotoCopy updated Successfully",
          icon: "success",
          dangerMode: true,
        })
        setPhotoCopySaveCancel(false)
    }
  }
  

const handleClickSaveLogo=async()=>{

    var formData=new FormData()
    formData.append("agencyid",agencyID)
    formData.append("logo",logo.bytes)
    var config={headers:{"content-type":"multipart/form-data"}}
    var result= await postDataAndImage('newsagency/editlogo',formData,config)
    if(result){
      swal({
          title: "Logo updated Successfully",
          icon: "success",
          dangerMode: true,
        })
        setLogoSaveCancel(false)
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
                        News Agency Interface
                    </div>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                       <TextField value={agencyName} onChange={(event)=>setAgencyName(event.target.value)} label="Agency Name" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                       <TextField value={ownerName} onChange={(event)=>setOwnerName(event.target.value)} label="Owner Name" variant="outlined" fullWidth/>
                    </Grid>


                    <Grid item xs={12} sm={4}>
                   <FormControl variant="outlined" fullWidth className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-state">State</InputLabel>
                           <Select
                             labelId="demo-simple-select-outlined-state"
                             id="demo-simple-select-outlined-state"
                             value={state}
                             onChange={(event)=>handleStateChange(event)}
                             label="State"
                            >
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
                        value={city}
                        onChange={(event)=>setCity(event.target.value)}
                        label="City">
                        {fillCity()}
                       </Select>
                    </FormControl>
                </Grid>
 

                    <Grid item xs={12} sm={4}>
                       <TextField value={address} onChange={(event)=>setAddress(event.target.value)} label="Address" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                       <TextField value={registrationNo} onChange={(event)=>setRegistrationNo(event.target.value)} label="Registration No" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                       <TextField value={contactNo} onChange={(event)=>setContactNo(event.target.value)} label="Contact No" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={4} >
                       <TextField value={emailId} onChange={(event)=>setEmailId(event.target.value)} label="Email Id" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <FormControl xs={12} className={clsx(classes.margin, classes.textField)} variant="outlined" fullWidth>
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                       id="outlined-adornment-password"
                       type={values.showPassword ? 'text' : 'password'}
                       value={password}
                       onChange={(event)=>setPassword(event.target.value)}
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
                          </InputAdornment> }
                       labelWidth={70}
                      />
                      </FormControl>
                    </Grid>

                    <Grid item xs={6} >
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                       <InputLabel id="demo-simple-select-outlined-label">Verify</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={verify}
                            onChange={(event)=>setVerify(event.target.value)}
                            label="Verify" >
                            <MenuItem value={'Active'}>Active</MenuItem>
                            <MenuItem value={'Deactive'}>Deactive</MenuItem>  
                        </Select>
                    </FormControl>
                  </Grid>
                   
                    <Grid item xs={6}>
                    <span style={{fontSize:16,fontWeight:300}} >
                      Edit PhotoCopy
                      </span>
                    <input onChange={(event)=>handlePhotoCopy(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                       <IconButton color="primary" aria-label="upload photocopy" component="span">
                       <PhotoCamera />
                       </IconButton>
                    </label>
                </Grid>

                <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column' }} >
                <Avatar  variant="rounded" src={photoCopy.file} className={{width:60,height:60}} />

                {photoCopySaveCancel?<span><Button onClick={()=>handleClickSavePhotoCopy()} color="secondary">Save</Button><Button color="secondary" onClick={()=>handleCancelPhotoCopy()} >Cancel</Button></span>:<></>}

                </Grid>

                <Grid item xs={12} sm={6}>
                    <span style={{fontSize:16,fontWeight:300}} >
                      Edit Logo
                      </span>
                    <input onChange={(event)=>handleLogo(event)} accept="image/*" className={classes.input} id="icon-button-logo" type="file" />
                    <label htmlFor="icon-button-logo">
                       <IconButton color="primary" aria-label="upload logo" component="span">
                       <PhotoCamera />
                       </IconButton>
                    </label>
                </Grid>

                <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column' }} >
                <Avatar  variant="rounded" src={logo.file} className={{width:60,height:60}} />
                
                {logoSaveCancel?<span><Button onClick={()=>handleClickSaveLogo()} color="secondary">Save</Button><Button color="secondary" onClick={()=>handleCancelLogo()} >Cancel</Button></span>:<></>}

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

  setAgencyID(rowData.agencyid)
  setAgencyName(rowData.agencyname)
  setOwnerName(rowData.ownername)
  setState(rowData.state)
  fillCityByState(rowData.state)
  setCity(rowData.city)
  setAddress(rowData.address)
  setRegistrationNo(rowData.registrationno)
  setContactNo(rowData.contactno)
  setEmailId(rowData.emailid)
  setPassword(rowData.password)
  setPhotoCopy({bytes:"",file:`${ServerURL}/images/${rowData.photocopy}`})
  setLogo({bytes:"",file:`${ServerURL}/images/${rowData.logo}`})
  setVerify(rowData.verify)
  
 };

const handleClose = () => {
  setOpen(false);
  fetchAllNewsAgency()
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
              Edit/Delete News Agency
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



    const fetchAllNewsAgency=async()=>{
        var result=await getData("newsagency/displayall")
        setList(result)
    
    }

    const fetchAllState=async()=>{
      var result=await getData("state/displayall")
      setListState(result)
  
    }
  const fillState=()=>{
    return listState.map((item)=>{
        return(
            <MenuItem value={item.stateid}>{item.statename}</MenuItem>
        )
    })
  }
  
    
    const handleStateChange=async(event)=>{
      setState(event.target.value)
      fillCityByState(event.target.value)
      
  } 

  const fillCityByState =async(cid)=>{
    var body={stateid:cid}
      var result= await postData("city/displaycitybystateid",body)
      setListCity(result);

  }

  
  const fillCity=()=>{
    return listCity.map((item)=>{
        return(
            <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
        )
    })
}

useEffect(function(){
  fetchAllNewsAgency()
  fetchAllState()
},[])
    
 /////////////////////////////////////////////////////////////////////////////////////////

const [columns, setColumns] = useState([
  {
    title: "Status",
    field: 'status',
    editable: 'onUpdate',
  render: rowData =>
  
   <div>
   <Switch checked={Status.checked} onChange={(event)=>handleChange(event,rowData)} name="checked" inputProps={{ 'aria-label': 'secondary checkbox' }} />
    </div>
},

{ title: 'ID', field: 'agencyid' },
{ title: 'R.No- Agency Name', field: 'registrationno',render:(rowData)=>(<div style={{flexDirection:"column"}}><div>{rowData.registrationno}- {rowData.agencyname}</div></div>) },
{ title: 'Owner Name', field: 'ownername' },
{ title: 'Address', field:"sname",render:(rowData)=>(<div style={{flexDirection:"column"}}><div>{rowData.address}, {rowData.cname},{rowData.sname}</div></div>) },
{ title: 'Contact', field: 'contactno',render:(rowData)=>(<div style={{flexDirection:"column"}}><div>{rowData.contactno}, {rowData.emailid}</div></div>) },
// { title: 'Password', field: 'password' },
{ title: 'PhotoCopy', field: 'photocopy',
 render: rowData =><div><img src={`${ServerURL}/images/${rowData.photocopy}`} style={{borderRadius:5}} width='40' height='40'/></div> },
{ title: 'Logo', field: 'logo',
render: rowData =><div><img src={`${ServerURL}/images/${rowData.logo}`} style={{borderRadius:5}} width='40' height='40'/></div> },
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
        searchFieldStyle:{borderRadius:'50px',borderColor:' #a4b0be',height:'40px',width:'70%', justifyContent:'center'}
 
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
             Display News Agency
             
            </Grid>
            
            <Grid item xs={6}>
            <span><MTableToolbar {...props} /></span>
            </Grid>
            <Grid item xs={6} style={{textAlign:'right', padding:10}}>
            <a href='/displaynewsagency'  ><RefreshOutlinedIcon/></a>  
          <span> <Button variant='contained' background="blue"><AddBoxIcon/><a href='/newsagencyinterface'  >ADD NEWS AGENCY  </a> </Button></span> 
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


