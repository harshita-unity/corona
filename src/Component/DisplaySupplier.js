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




export default function DisplaySupplier(props)
{
    const [list,setList]=useState()
    const classes = useStyles();




/////////////////////////////////////////////////Edit form/////////////////////////////////////////////////////////

    const [category,setCategory]=useState('')
    const [supplierID,setSupplierID]=useState('')
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
    
    const [photoCopySaveCancel,setPhotoCopySaveCancel]=useState(false)
    const [logoSaveCancel,setLogoSaveCancel]=useState(false)
    const [getRowData,setRowData]=useState([])

    const [listCategory,setListCategory]=useState([])
    const [listState,setListState]=useState([])
    const [listCity,setListCity]=useState([])

    const [verifyStatus, setVerifyStatus] = React.useState({});

    const handleChange =async (event) => {
      setVerifyStatus({ ...status, [event.target.name]: event.target.checked });
    //  var result = jQuery('.switch-input').is(':checked')?'yes':'no';
      var formData=new FormData()
      formData.append("supplierID",supplierID)
      formData.append('verifyStatus',setVerifyStatus)
    
      var config={headers:{"content-type":"multipart/form-data"}}
      var r=await postDataAndImage('supplier/addswitch',formData,config)
     
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

  var body={supplierid:oldData.supplierid}
  var result=await postData("supplier/deletesupplier",body)

  if(result){
    swal({
        title: "Supplier Record Deleted Successfully",
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
    if(isBlank(description)){
        error=true
        msg+="<font color='#e74c3c'><b>Description should not be blank..</b></font><br> "
    }
    if(isBlank(status)){
        error=true
        msg+="<font color='#e74c3c'><b>Status should not be blank..</b></font><br> "
    }
    
    msg+="</div>"

    if(error){
        swalhtml(renderHTML(msg))
    }
    else{

   var body={

    supplierid:supplierID,
    category:category,
    firmname:firmName,
    ownername:ownerName,
    state:state,
    city:city,
    address:address,
    registrationno:registrationNo,
    contactno:contactNo,
    emailid:emailId,
    password:password,
    description:description,
    status:status,
    
   }
   
    var result= await postData('supplier/editsupplierdata',body)
    if(result){
        swal({
            title: "supplier Record updated Successfully",
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
    formData.append("supplierid",supplierID)
    formData.append("photocopy",photoCopy.bytes)
    var config={headers:{"content-type":"multipart/form-data"}}
    var result= await postDataAndImage('supplier/editphotocopy',formData,config)
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
    formData.append("supplierid",supplierID)
    formData.append("logo",logo.bytes)
    var config={headers:{"content-type":"multipart/form-data"}}
    var result= await postDataAndImage('supplier/editlogo',formData,config)
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
                    Supplier Interface
                    </div>
                </Grid>
                
                <Grid item xs={12} >
                       <FormControl variant="outlined" fullWidth className={classes.formControl}>
                          <InputLabel id="demo-simple-select-outlined-category">Category</InputLabel>
                          <Select
                             labelId="demo-simple-select-outlined-category"
                             id="demo-simple-select-outlined-category"
                             value={category}
                             onChange={(event)=>setCategory(event.target.value)}
                              label="Category">
                              {fillCategory()}
                           </Select>
                        </FormControl>
               </Grid>
                    
                    <Grid item xs={12} sm={3}>
                       <TextField value={firmName} onChange={(event)=>setFirmName(event.target.value)} label="Firm Name" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                       <TextField value={ownerName} onChange={(event)=>setOwnerName(event.target.value)} label="Owner Name" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                       <TextField value={registrationNo} onChange={(event)=>setRegistrationNo(event.target.value)} label="Registration No" variant="outlined" fullWidth/>
                    </Grid>
                    
                    <Grid item xs={12} sm={3}>
                       <TextField value={contactNo} onChange={(event)=>setContactNo(event.target.value)} label="Contact No" variant="outlined" fullWidth/>
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
                    
                    <Grid item xs={12} sm={4} >
                       <TextField value={address} onChange={(event)=>setAddress(event.target.value)} label="Address" variant="outlined" fullWidth/>
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

                    <Grid item xs={12} sm={4} >
                       <TextField value={description} onChange={(event)=>setDescription(event.target.value)} label="Description" variant="outlined" fullWidth/>
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

                <Grid item xs={12} >
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                       <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={status}
                            onChange={(event)=>setStatus(event.target.value)}
                            label="Status" >
                            <MenuItem value={'Verified'}>Verified</MenuItem>
                            <MenuItem value={'Pending'}>Pending</MenuItem>  
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

  setSupplierID(rowData.supplierid)
  setCategory(rowData.category)
  setFirmName(rowData.firmname)
  setOwnerName(rowData.ownername)
  setState(rowData.state)
  fillCityByState(rowData.state)
  setCity(rowData.city)
  setAddress(rowData.address)
  setContactNo(rowData.contactno)
  setRegistrationNo(rowData.registrationno)
  setEmailId(rowData.emailid)
  setPassword(rowData.password)
  setDescription(rowData.description)
  setPhotoCopy({bytes:"",file:`${ServerURL}/images/${rowData.photocopy}`})
  setLogo({bytes:"",file:`${ServerURL}/images/${rowData.logo}`})
  setStatus(rowData.status)
  
 };

const handleClose = () => {
  setOpen(false);
  fetchAllSupplier()
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
              Edit/Delete Supplier
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



    const fetchAllSupplier=async()=>{
        var result=await getData("supplier/displayall")
        setList(result)
    
    }

    const fetchAllCategory=async()=>{
        var result=await getData("suppliercategory/displayall")
        setListCategory(result)
    
      }
    const fillCategory=()=>{
      return listCategory.map((item)=>{
          return(
              <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
          )
      })
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
  fetchAllSupplier()
  fetchAllCategory()
  fetchAllState()
},[])
/////////////////////////////////////////////////////////////////////////////////
    
const [columns, setColumns] = useState([
  {
    title: "Status",
    field: 'status',
    editable: 'onUpdate',
  render: rowData =>
  
   <div>
   <Switch checked={status.checked} onChange={(event)=>handleChange(event,rowData)} name="checked" inputProps={{ 'aria-label': 'secondary checkbox' }} />
    </div>
},

{ title: 'ID', field: 'supplierid' },
{ title: 'Category', field: 'scname' },
//{ title: 'RegistrationNo', field: 'registrationno' },
{ title: 'Name', field: 'firmname',render:(rowData)=>(<div style={{flexDirection:"column"}}><div>{rowData.firmname}, {rowData.ownername}</div></div>) },
{ title: 'Address', field:"sname",render:(rowData)=>(<div style={{flexDirection:"column"}}><div>{rowData.address}, {rowData.cname},{rowData.sname}</div></div>) },
{ title: 'Contact', field: 'contactno',render:(rowData)=>(<div style={{flexDirection:"column"}}><div>{rowData.contactno}, {rowData.emailid}</div></div>) },
// { title: 'Password', field: 'password' },
// { title: 'Description', field: 'description' },
{ title: 'PhotoCopy', field: 'photocopy',
 render: rowData =><div><img src={`${ServerURL}/images/${rowData.photocopy}`} style={{borderRadius:5}} width='40' height='40'/></div> },
{ title: 'Logo', field: 'logo',
render: rowData =><div><img src={`${ServerURL}/images/${rowData.logo}`} style={{borderRadius:5}} width='40' height='40'/></div> },
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
             Display Supplier
             
            </Grid>
            
            <Grid item xs={6}>
            <span><MTableToolbar {...props} /></span>
            </Grid>
            <Grid item xs={6} style={{textAlign:'right', padding:10}}>
            <a href='/displaysupplier'  ><RefreshOutlinedIcon/></a>  
          <span> <Button variant='contained' background="blue"><AddBoxIcon/><a href='/supplierproducts'  >ADD SUPPLIER DATA  </a> </Button></span> 
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


