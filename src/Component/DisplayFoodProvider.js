import React,{useState,useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import swal from "sweetalert";
import {isBlank} from "./Checks";
import swalhtml from "@sweetalert/with-react";
import renderHTML from "react-render-html";
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import {ServerURL,postData,postDataAndImage,getData} from "./FetchNodeServices";

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

export default function DisplayFoodProvider(props)
{ const [list,  setList]=useState()
  const classes = useStyles();

//////////////////////Edit Form//////////////////////////////

const [foodProviderId,setFoodProviderId]=useState('')
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


const [uploadIdProofSaveCancel,setUploadIdProofSaveCancel]=useState(false)
const [logoSaveCancel,setLogoSaveCancel]=useState(false)
const [photoCopyRegistrationSaveCancel,setPhotoCopyRegistrationSaveCancel]=useState(false)
const [getRowData,setRowData]=useState([])

const [listState,setListState]=useState([])
const [listCity,setListCity]=useState([])
const [Status, setStatus] = React.useState({});

const handleChange =async (event) => {
  setStatus({ ...Status, [event.target.name]: event.target.checked });
//  var result = jQuery('.switch-input').is(':checked')?'yes':'no';
  var formData=new FormData()
  formData.append("foodProviderId",foodProviderId)
  formData.append('Status',setStatus)

  var config={headers:{"content-type":"multipart/form-data"}}
  var r=await postDataAndImage('news/addswitch',formData,config)
 
}; 



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


  const handleUploadIdProof=(event)=>{
    setUploadIdProof({bytes:event.target.files[0],
        file:URL.createObjectURL(event.target.files[0])})
        setUploadIdProofSaveCancel(true)
  }

const handleLogo=(event)=>{
  setLogo({bytes:event.target.files[0],
      file:URL.createObjectURL(event.target.files[0])})
      setLogoSaveCancel(true)
}

const handlePhotoCopyRegistration=(event)=>{
  setPhotoCopyRegistration({bytes:event.target.files[0],
      file:URL.createObjectURL(event.target.files[0])})
      setPhotoCopyRegistrationSaveCancel(true)
}

const handleDelete = async (oldData) => {
  var body={foodproviderid:oldData.foodproviderid}
  var result =await postData("foodprovider/deletefoodprovider",body)



  if (result){
    swal({
        title: "Food Provider Deleted Successfully ",
        icon: "success",
        dangerMode: true,
      })
}
else
{
swal({
  title: "Fail To Delete Record ",
  icon: "success",
  dangerMode: true,
})
}
}


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
  } */
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
    if(isBlank(verify)){
      error=true
      msg+="<font color='#e74c3c'><b>Plz choose Verify..</b></font><br> "
  }


    if(error)
    {
        swalhtml(renderHTML(msg))
    }
    else{
    var body={
      
      foodproviderid:foodProviderId,
      ownername:ownerName,
      firmname:firmName,
      state:state,
      city:city,
      address1:address1,
      address2:address2,
      contactno:contactNo,
      emailid:emailId,
      password:password,
      idproofno:idProofNo,
      photocopyid:photoCopyId,
      registrationid:registrationId,
      verify:verify,
      
      }
      var result=await postData('foodprovider/editfoodprovider',body);
   if(result)
    {
        swal({
            title: "Food Provider updated Successfully ",
            icon: "success",
            dangerMode: true,
          })
    }
    }
    }

    const handleCancelUploadIdProof=()=>{
      setUploadIdProofSaveCancel(false)
      setUploadIdProof({bytes:"",file: `${ServerURL}/images/${getRowData.uploadidproof}`})
    }
    
    const handleClickSaveUploadIdProof=async()=>{
     
      var formData= new FormData()
      formData.append("foodproviderid",foodProviderId)
      formData.append("uploadidproof",uploadIdProof.bytes)
    
      var config = {headers:{"content-type":"multipart/form-data"}}
      var result = await postDataAndImage('foodprovider/edituploadidproof',formData,config)
      if(result){
          swal({
              title: "Upload IdProof Updated Successfully",
              icon: "success",
              dangerMode: true,
            });
            setUploadIdProofSaveCancel(false)
          
    }
    }
        

const handleCancelLogo=()=>{
  setLogoSaveCancel(false)
  setLogo({bytes:"",file: `${ServerURL}/images/${getRowData.logo}`})
}

const handleClickSaveLogo=async()=>{
 
  var formData= new FormData()
  formData.append("foodproviderid",foodProviderId)
  formData.append("logo",logo.bytes)

  var config = {headers:{"content-type":"multipart/form-data"}}
  var result = await postDataAndImage('foodprovider/editlogo',formData,config)
  if(result){
      swal({
          title: "Logo Updated Successfully",
          icon: "success",
          dangerMode: true,
        });
        setLogoSaveCancel(false)
      
}
}

const handleCancelPhotoCopyRegistration=()=>{
  setPhotoCopyRegistrationSaveCancel(false)
  setPhotoCopyRegistration({bytes:"",file: `${ServerURL}/images/${getRowData.photocopyregistration}`})
}

const handleClickSavePhotoCopyRegistration=async()=>{
 
  var formData= new FormData()
  formData.append("foodproviderid",foodProviderId)
  formData.append("photocopyregistration",photoCopyRegistration.bytes)

  var config = {headers:{"content-type":"multipart/form-data"}}
  var result = await postDataAndImage('foodprovider/editphotocopyregistration',formData,config)
  if(result){
      swal({
          title: "PhotoCopy Registration Updated Successfully",
          icon: "success",
          dangerMode: true,
        });
        setPhotoCopyRegistrationSaveCancel(false)
      
}
}


const editFormView=()=>{

    return (
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
                
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, }}>
                        Food Provider Interface
                    </div>
                </Grid>
               
                <Grid item xs={12} sm={6}>
                    <TextField value={ownerName} onChange={(event)=>setOwnerName(event.target.value)} label="Owner Name" variant="outlined" fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField value={firmName} onChange={(event)=>setFirmName(event.target.value)} label="Firm Name" variant="outlined" fullWidth />
                </Grid>

                 <Grid item xs={12}  sm={3}>
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

                <Grid item xs={12}  sm={3}>
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

                <Grid item xs={12} sm={3}>
                    <TextField value={address1} onChange={(event)=>setAddress1(event.target.value)} label="Address Line 1" variant="outlined" fullWidth />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField value={address2} onChange={(event)=>setAddress2(event.target.value)} label="Address Line 2" variant="outlined" fullWidth />
                </Grid>

                   <Grid item xs={12} sm={4}>
                       <TextField value={contactNo} onChange={(event)=>setContactNo(event.target.value)} label="Contact No" variant="outlined" fullWidth/>
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                       <TextField value={emailId} onChange={(event)=>setEmailId(event.target.value)} label="Email Id" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
  

                <Grid item xs={12} sm={4}>
                    <TextField value={idProofNo} onChange={(event)=>setIdproofNo(event.target.value)} label="Id Proof Number" variant="outlined" fullWidth />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField value={photoCopyId} onChange={(event)=>setPhotoCopyId(event.target.value)} label="Photocopy Id" variant="outlined" fullWidth />
                </Grid>

                 <Grid item xs={12} sm={4}>
                    <TextField value={registrationId} onChange={(event)=>setRegistrationId(event.target.value)} label="Registration Id" variant="outlined" fullWidth />
                </Grid>

                <Grid item xs={6}>
                    <span style={{fontSize:16,fontWeight:300}} >
                      Edit upload IdProof
                      </span>
                    <input onChange={(event)=>handleUploadIdProof(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                       <IconButton color="primary" aria-label=" Upload IdProof" component="span">
                       <PhotoCamera />
                       </IconButton>
                    </label>
                </Grid>

                <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column' }} >
                <Avatar  variant="rounded" src={uploadIdProof.file} className={{width:60,height:60}} />

                {uploadIdProofSaveCancel?<span><Button onClick={()=>handleClickSaveUploadIdProof()} color="secondary">Save</Button><Button color="secondary" onClick={()=>handleCancelUploadIdProof()} >Cancel</Button></span>:<></>}

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

                <Grid item xs={6}>
                    <span style={{fontSize:16,fontWeight:300}} >
                      Edit PhotoCopyRegistration
                      </span>
                    <input onChange={(event)=>handlePhotoCopyRegistration(event)} accept="image/*" className={classes.input} id="icon-button-photocopy" type="file" />
                    <label htmlFor="icon-button-photocopy">
                       <IconButton color="primary" aria-label=" Upload PhotoCopy Registration" component="span">
                       <PhotoCamera />
                       </IconButton>
                    </label>
                </Grid>

                <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column' }} >
                <Avatar  variant="rounded" src={photoCopyRegistration.file} className={{width:60,height:60}} />

                {photoCopyRegistrationSaveCancel?<span><Button onClick={()=>handleClickSavePhotoCopyRegistration()} color="secondary">Save</Button><Button color="secondary" onClick={()=>handleCancelPhotoCopyRegistration()} >Cancel</Button></span>:<></>}

                </Grid>


                <Grid item xs={12}>
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
///////////////////////////////////////////////////////////



//////////////////////////////Edit Dialog//////////////////

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (rowData) => {
    setRowData(rowData)
    setOpen(true);

    
    setFoodProviderId(rowData.foodproviderid)
    setOwnerName(rowData.ownername)
    setFirmName(rowData.firmname)
    setState(rowData.state)
    fillCityByState(rowData.state)
    setCity(rowData.city)
    setAddress1(rowData.address1)
    setAddress2(rowData.address2)
    setContactNo(rowData.contactno)
    setEmailId(rowData.emailid)
    setPassword(rowData.password)
    setIdproofNo(rowData.idproofno)
    setPhotoCopyId(rowData.photocopyid)
    setRegistrationId(rowData.registrationid)
    setUploadIdProof({bytes:"",file:`${ServerURL}/images/${rowData.uploadidproof}`})
    setLogo({bytes:"",file:`${ServerURL}/images/${rowData.logo}`})
    setPhotoCopyRegistration({bytes:"",file:`${ServerURL}/images/${rowData.photocopyregistration}`})
    setVerify(rowData.verify)
    
  };

  const handleClose = () => {
    setOpen(false);
    fetchAllFoodprovider();
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
                Edit/Delete Food Provider
              </Typography>
              <Button autoFocus color="inherit" onClick={()=>handleClick()}>
                Update
              </Button>
              <Button autoFocus color="inherit" onClick={()=>handleDelete()}>
                Delete
              </Button>
            </Toolbar>
          </AppBar>
          {editFormView()}
        </Dialog>
      </div>
    );


  }
/////////////////////////////////////////////////////////




const fetchAllFoodprovider=async()=>{
var result = await getData("foodprovider/displayall")
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
    fetchAllFoodprovider()
    fetchAllState()
},[])

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

{ title: 'ID', field: 'foodproviderid' },
          { title: 'Name', field: 'ownername',render:(rowData)=>(<div style={{flexDirection:"column"}}><div>{rowData.ownername}, {rowData.firmname}</div></div>) },
          { title: 'Address', field:"sname",render:(rowData)=>(<div style={{flexDirection:"column"}}><div>{rowData.address1},{rowData.address2}, {rowData.cname},{rowData.sname}</div></div>) },
          { title: 'Contact', field: 'contactno',render:(rowData)=>(<div style={{flexDirection:"column"}}><div>{rowData.contactno}, {rowData.emailid}</div></div>) },   
         // { title: 'Password', field: 'password' },
         // { title: 'Id proof Number', field: 'idproofno' },
         // { title: 'Photocopy Id', field: 'photocopyid' },
         // { title: 'Registration Id', field: 'registrationid' },
          { title: 'Upload IdProof', field: 'uploadidproof',
            render:rowData =>(<div><img src={`${ServerURL}/images/${rowData.uploadidproof}`} style={{borderRadius:'5'}} width='40' height='50' /></div>)},
          { title: 'Logo', field: 'logo',
            render:rowData =>(<div><img src={`${ServerURL}/images/${rowData.logo}`} style={{borderRadius:'5'}} width='40' height='50' /></div>)},
          { title: 'Photocopy Registration', field: 'photocopyregistration',
          render:rowData =>(<div><img src={`${ServerURL}/images/${rowData.photocopyregistration}`} style={{borderRadius:'5'}} width='40' height='50' /></div>) },
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
             Display Food Provider
             
            </Grid>
            
            <Grid item xs={6}>
            <span><MTableToolbar {...props} /></span>
            </Grid>
            <Grid item xs={6} style={{textAlign:'right', padding:10}}>
            <a href='/displayfoodprovider'  ><RefreshOutlinedIcon/></a>  
          <span> <Button variant='contained' background="blue"><AddBoxIcon/><a href='/foodproviderinterface'  >ADD FOOD PROVIDER DATA  </a> </Button></span> 
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


