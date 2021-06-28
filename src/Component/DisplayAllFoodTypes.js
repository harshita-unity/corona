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
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import Avatar from "@material-ui/core/Avatar"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import swalhtml from "@sweetalert/with-react"
import swal from "sweetalert"
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ServerURL,postDataAndImage,getData,postData} from "./FetchNodeServices";
import {isBlank} from './Checks'
import { Sync } from "@material-ui/icons";
import renderHTML from "react-render-html"

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

export default function DisplayAllFoodTypes(props)
{
    const[list,setList]=useState()

    const classes = useStyles();

//////////////////////////Edit Form////////////////////////////////
  const [foodId,setFoodId]=useState('')
  const [daysId,setDaysId]=useState('')
  const [foodProviderId,setFoodProviderId]=useState('')
  const [foodType,setFoodType]=useState('')
  const [foodDescription,setFoodDescription]=useState('')
  const [days,setDays]=useState('')
  const [price,setPrice]=useState('')
  const [offer,setOffer]=useState('')
  const [icon,setIcon]=useState({bytes:'',file:'/noimage.png'})
  const [verify,setVerify]=useState('')
  
  const [iconSaveCancel,setIconSaveCancel]=useState(false)
 
  const [getRowData,setRowData]=useState([])
  
  const [listFoodprovider,setListFoodProvider]=useState([])
  const [listdays,setListDays]=useState([])

  const handleIcon=(event)=>{
    setIcon({bytes:event.target.files[0],
      file:URL.createObjectURL(event.target.files[0]),
    })
    setIconSaveCancel(true)
  }

  const handleDelete=async(oldData)=>{
    var body={foodid:oldData.foodid}
    var result=await postData("foodtypes/deletefoodtypes",body)
    if(result)
    {
      swal({
        title: "Food Types Deleted Successfully",
        icon: "success",
        dangerMode: true,
      }) 
    }
    else
       {
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

    if(isBlank(foodProviderId))
    {error=true
    msg+="<Font color='#e74c3c'><b>Food Provider Id Should not be blank..</b></Font><br>"
    }
    if(isBlank(foodType))
    {error=true
      msg+="<Font color='#e74c3c'><b>Food Type Should not be blank..</b></Font><br>"
    }
    if(isBlank(foodDescription))
    {error=true
      msg+="<Font color='#e74c3c'><b>Food Description Should not be blank..</b></Font><br>"
    }
    if(isBlank(days))
    {error=true
    msg+="<Font color='#e74c3c'><b>Days Should not be blank..</b></Font><br>"
    }
    if(isBlank(price))
    {error=true
      msg+="<Font color='#e74c3c'><b>Price Should not be blank..</b></Font><br>"
    }
    if(isBlank(offer))
    {error=true
      msg+="<Font color='#e74c3c'><b>Offer Should not be blank..</b></Font><br>"
    }
    if(isBlank(verify))
    {error=true
    msg+="<Font color='#e74c3c'><b>Verify Should not be blank..</b></Font><br>"
    }



    msg+="</div>" 
    
    if(error)
    {
      swalhtml(renderHTML(msg))
    }
    else
    { 

    var body={
      foodid:foodId,
      foodproviderid:foodProviderId,
      foodtype:foodType,
      fooddescription:foodDescription,
      days:days,
      price:price,
      offer:offer,
      verify:verify
      
    }
    var result = await postData('foodtypes/editfoodtypesdata',
    body)
    if(result)
    {
      swal({
        title: "Food Types Updated Successfully",
        icon: "success",
        dangerMode: true,
      }) 
    }
    }
  }

const handleCancelIcon=()=>{
    setIconSaveCancel(false)
    setIcon({bytes:"",file:`${ServerURL}/images/${getRowData.icon}`})
  }

 
  const handleClickSaveIcon=async()=>{

    var formData=new FormData()
    formData.append("foodid",foodId)
    formData.append("icon",icon.bytes)
   
    var config={headers:{"content-type":"multipart/form-data"}}
    var result = await postDataAndImage('foodtypes/editicon',formData,config)
    if(result)
    {
      swal({
        title: "Icon Updated Successfully",
        icon: "success",
        dangerMode: true,
      }) 
      setIconSaveCancel(false)
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
         <div style={{ fontSize:22,fontWeight:700,letterSpacing:2,padding:20 }}>
         Food Types Interface
         </div>
        </Grid>
    
        <Grid item xs={12}>
<FormControl variant="outlined" fullWidth className={classes.formControl}>
    <InputLabel id="demo-simple-select-outlined-category">Food Provider ID</InputLabel>
    <Select
      labelId="demo-simple-select-outlined-category"
      id="demo-simple-select-outlined-category"
      //value={age}
      value={foodProviderId}
      onChange={(event)=>setFoodProviderId(event.target.value)}
      label="Food Provider ID"
    >
     {showFoodProvider()}
    </Select>
  </FormControl>
 </Grid>

    <Grid item xs={12} sm={6}>
     <TextField value={foodType}  onChange={(event)=>setFoodType(event.target.value)} label="Food Type" variant="outlined" fullWidth/>
     </Grid>
     
     <Grid item xs={12} sm={6}>
     <TextField value={foodDescription} onChange={(event)=>setFoodDescription(event.target.value)} label="Food Description" variant="outlined" fullWidth/>
     </Grid>

     <Grid item xs={12}>
<FormControl variant="outlined" fullWidth className={classes.formControl}>
    <InputLabel id="demo-simple-select-outlined-category">Days</InputLabel>
    <Select
      labelId="demo-simple-select-outlined-category"
      id="demo-simple-select-outlined-category"
      //value={age}
      value={days}
      onChange={(event)=>setDays(event.target.value)}
      label="Days"
    >
     {showDays()}
    </Select>
  </FormControl>
 </Grid>

     <Grid item xs={12} sm={6}>
        <TextField value={price}  onChange={(event)=>setPrice(event.target.value)} label="Price" variant="outlined" fullWidth/>
     </Grid>
    
     <Grid item xs={12} sm={6}>
        <TextField value={offer}  onChange={(event)=>setOffer(event.target.value)} label="Offer" variant="outlined" fullWidth/>
     </Grid>
    
  
        <Grid item   xs={6}>
        <span style={{fontSize:16,fontWeight:300}}>
        Edit Food Icon
       
        </span>     
        <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
    
        </Grid>
        <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
        <Avatar  variant="rounded" src={icon.file} style={{width:60,height:60}} />
        {iconSaveCancel?<span><Button onClick={()=>handleClickSaveIcon()} color="secondary">Save</Button><Button onClick={()=>handleCancelIcon()} color="secondary" >Cancel</Button></span>:<></>}
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


//////////////////////////End Edit Form///////////////////////////

///////////////////////////////////"Edit Dialog"//////////////////////////////////////
    
const [open, setOpen] = React.useState(false);

const handleClickOpen = (rowData) => {
  setRowData(rowData)
  setOpen(true);
  setFoodProviderId(rowData.foodproviderid)
  setFoodId(rowData.foodid)
  setFoodType(rowData.foodtype)
  setFoodDescription(rowData.fooddescription)
  setDays(rowData.days)
  setPrice(rowData.price)
  setOffer(rowData.offer)
  setVerify(rowData.verify)
  
  
  setIcon({bytes:"",file:`${ServerURL}/images/${rowData.icon}`})
 
};

const handleClose = () => {
  setOpen(false);
  fetchAllFoodTypes()
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
            Edit/Delete Food Types
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
    
/////////////////////////////////"End Edit Dialog"//////////////////////////////////////////


const fetchAllFoodprovider=async()=>{
  var result = await getData("foodprovider/displayall")
  setListFoodProvider(result)
  }

  const showFoodProvider=()=>{
    return listFoodprovider.map((item)=>{
      return(
        <MenuItem value={item.foodproviderid}>{item.firmname}</MenuItem>
        )
        
      })
    }
    
    const fetchAllDays=async()=>{
      var result = await getData("days/displayall")
      setListDays(result)
      }
  const showDays=()=>{
    return listdays.map((item)=>{
      return(
        <MenuItem value={item.daysid}>{item.daysname}</MenuItem>
        )
        
      })
    }

    const fetchAllFoodTypes=async()=>{
    var result=await getData("foodtypes/displayall")
    setList(result)
    }
    

    useEffect(function(){
        fetchAllFoodTypes()
        fetchAllFoodprovider()
        fetchAllDays()
    },[])

/////////////////////////////////////////////////////////////////
const [columns, setColumns] = useState([
      
  { title: 'Id', field: 'foodid' },
  { title: 'FoodProviderId', field: 'foodproviderid'},
  { title: 'FoodType', field: 'foodtype'},
  { title: 'Description', field: 'fooddescription'},
  { title: 'Days', field: 'dname' },
  { title: 'Price', field: 'price'},
  { title: 'Offer', field: 'offer'},
  { title: 'Icon', field: 'icon',
  render: rowData =>(<div><img src={`${ServerURL}/images/${rowData.icon}`} style={{borderRadius:5}} width='40' height='40'/></div>)},
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
               Display Foods
               
              </Grid>
              
              <Grid item xs={6}>
              <span><MTableToolbar {...props} /></span>
              </Grid>
              <Grid item xs={6} style={{textAlign:'right', padding:10}}>
              <a href='/displayallfoodtypes'  ><RefreshOutlinedIcon/></a>  
            <span> <Button variant='contained' background="blue"><AddBoxIcon/><a href='/foodtypesinterface'  >ADD FOOD  </a> </Button></span> 
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
  
  