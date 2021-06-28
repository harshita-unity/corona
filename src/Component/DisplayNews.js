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
import {ServerURL,postDataAndImage,getData,postData} from "./FetchNodeServices"
import Avatar from "@material-ui/core/Avatar"
import swalhtml from "@sweetalert/with-react"
import swal from "sweetalert"

import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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


export default function Displaynews(props)
{ const[list,setList]=useState()
  const classes = useStyles();
  //////////////////////////Edit Form//////////////////////////////
  
            const [agencyId,setAgencyId]=useState('')
            const [newsID,setNewsID]=useState('')
            const [dateNews,setDateNews]=useState('')
            const [timeNews,setTimeNews]=useState('')
            const [newsHeading,setNewsHeading]=useState('')
            const [subheading,setSubheading]=useState('')
            const [description,setDescription]=useState('')
            const [image,setImage]=useState({bytes:'',file:'/noimage.png' })
            const [verify,setVerify]=useState('')

           const [imageSaveCancel,setImageSaveCancel]=useState(false)
           const [getRowData,setRowData]=useState([])

           const [listAgency,setListAgency]=useState([])

  const handleImage=(event)=>{
    setImage({bytes:event.target.files[0],
      file:URL.createObjectURL(event.target.files[0])})
      setImageSaveCancel(true)
    }
   
  const handleDelete=async(oldData)=>{
    var body={newsid:oldData.newsid}
  var result=await postData("news/deletenews",body)
  if(result)
  {
   swal({
     title: "News  Deleted Successfully",
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

    if(isBlank(agencyId))
    {error=true
    msg+="<font color='#b2bec3'><b> fill the Agency Name</b></font><br>";
    }
    if(isBlank(dateNews))
    {error=true
      msg+="<font color='#b2bec3'><b>Pls fill the DATE</b></font><br>";
    }
    if(isBlank(timeNews))
    {error=true
      msg+="<font color='#b2bec3'><b>Pls fill the time</b></font><br>";
    }
    if(isBlank(newsHeading))
    {error=true
      msg+="<font color='#b2bec3'><b>Pls fill the newsheading</b></font><br>";
    }
    if(isBlank(subheading))
    {error=true
      msg+="<font color='#b2bec3'><b>Pls fill the subheading</b></font><br>";
    }
    if(isBlank(description))
    {error=true
      msg+="<font color='#b2bec3'><b>Pls fill the description</b></font><br>";
    }
    if(isBlank(verify))
    {error=true
      msg+="<font color='#b2bec3'><b>Pls fill the verify</b></font><br>";
    }
    msg+="</div>"
    if(error)
    {
     swalhtml(renderHTML(msg))
    }
    else
    {
   var body={
     
    agencyid:agencyId,
    newsid:newsID,
    datenews:dateNews,
    timenews:timeNews,
    newsheading:newsHeading,
    subheading:subheading,
    description:description,
    verify:verify
  }
   var result=await postData('news/editnews',body)
   if(result)
   {
    swal({
      title: "News Data Updated Successfully",
      icon: "success",
      dangerMode: true,
    })
   }
  }
 }

 const handleCancelImage=()=>{
   setImageSaveCancel(false)
   setImage({bytes:"",file:`${ServerURL}/images/${getRowData.image}`})
 } 
 

const handleClickSaveImage=async()=>{

  var formData=new FormData()
  formData.append("newsid",newsID)
  formData.append("image",image.bytes)

  var config={headers:{"content-type":"multipart/form-data"}}
  var result=await postDataAndImage('news/editimage',formData,config)
  if(result)
  {
   swal({
     title: "image Updated Successfully",
     icon: "success",
     dangerMode: true,
   })
   setImageSaveCancel(false)
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

                <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center' }}>
                        <div style={{fontSize:22,fontWeight:700,letterSpacing:2,padding:20}}>
                        News Interface
                        </div>
                </Grid>
                
           <Grid item xs={12}>
             <FormControl
               variant="outlined"
               fullWidth
               className={classes.formControl}
               >
                 <InputLabel id="demo-simple-select-outlined-State">
                   Agency ID
                 </InputLabel>
                 <Select 
                    labelId="demo-simple-select-outlined-State"
                    id="demo-simple-select-outlined-State"
                    value={agencyId}
                    onChange={(event)=>setAgencyId(event.target.value)}
                    label="agency ID"
                    >
                      {fillAgency()}
                    </Select>
               </FormControl>
              </Grid>
                      <Grid item xs={12} sm={6}>
                     <TextField value={dateNews} onChange={(event)=> setDateNews(event.target.value)} type="Date"  variant="outlined" fullWidth/>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                     <TextField value={timeNews} onChange={(event)=> setTimeNews(event.target.value)} type="Time"  variant="outlined" fullWidth/>
                      </Grid>
                      

                      <Grid item xs={4}>
                     <TextField value={newsHeading} onChange={(event)=> setNewsHeading(event.target.value)} label="News Heading" variant="outlined" fullWidth/>
                      </Grid>
                 <Grid item xs={4}>
                     <TextField value={subheading} onChange={(event)=> setSubheading(event.target.value)} label="Subheading" variant="outlined" fullWidth/>
                      </Grid>
                      <Grid item xs={4}>
                     <TextField value={description} onChange={(event)=> setDescription(event.target.value)} label="Description" variant="outlined" fullWidth/>
                      </Grid>     
                      
                      <Grid item xs={12} sm={6}>
                    <span style={{fontSize:16,fontWeight:300}} >
                      Edit Image
                      </span>
                    <input onChange={(event)=>handleImage(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                       <IconButton color="primary" aria-label="upload image" component="span">
                       <PhotoCamera />
                       </IconButton>
                    </label>
                </Grid>

                <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column' }} >
                <Avatar  variant="rounded" src={image.file} className={{width:60,height:60}} />
                
                {imageSaveCancel?<span><Button onClick={()=>handleClickSaveImage()} color="secondary">Save</Button><Button color="secondary" onClick={()=>handleCancelImage()} >Cancel</Button></span>:<></>}

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




  ////////////////////////////////////////////////////////////////////
///////////////////////////Edit Dialog ///////////////////////////////

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (rowData) => {
    setRowData(rowData)
    setOpen(true);
    
    setAgencyId(rowData.agencyid)
    setNewsID(rowData.newsid)
    setDateNews(rowData.datenews)
    setTimeNews(rowData.timenews)
    setNewsHeading(rowData.newsheading)
    setSubheading(rowData.subheading)
    setDescription(rowData.description)
    setImage({bytes:" ",file:`${ServerURL}/images/${ rowData.image}`})
    setVerify(rowData.verify)
    
  };

  const handleClose = () => {
    setOpen(false);
    fetchAllNews()
  };

  const showEditdialog=()=>{
    return (
      <div>
        
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Edit/Delete News
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
  ///////////////////////////////////////////////////////////////////
  
  const fetchAllNews=async()=>{
    var result=await getData("news/displayall")
    setList(result)

  }

  const fetchAllAgency=async()=>{
  var result=await getData("newsagency/displayall")
  setListAgency(result)

}

const fillAgency=()=>{
  return listAgency.map((item)=>{
      return(
          <MenuItem value={item.agencyid}>{item.agencyname}</MenuItem>
      )
  })
}

useEffect(function(){
  fetchAllNews()
  fetchAllAgency();
  },[])

 /////////////////////////////////////////////////////////////////////////////// 

 const [columns, setColumns] = useState([
      
  { title: 'Id', field: 'newsid' },
          { title: 'AgencyId', field: 'aname' },
          { title: 'Date', field: 'datenews' },
          { title: 'Time', field: 'timenews' },
          { title: 'News, Sub Heading', field: 'newsheading',render:(rowData)=>(<div style={{flexDirection:"column"}}><div>{rowData.newsheading},{rowData.subheading}</div></div>) },
         // { title: 'description', field: 'description' },
          { title: 'Image', field: 'image',
             render: rowData =><div><img src={`${ServerURL}/images/${rowData.image}`} style={{borderRadius:5}} width='40' height='40'/></div>},
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
               Display News
               
              </Grid>
              
              <Grid item xs={6}>
              <span><MTableToolbar {...props} /></span>
              </Grid>
              <Grid item xs={6} style={{textAlign:'right', padding:10}}>
              <a href='/displaynews'  ><RefreshOutlinedIcon/></a>  
            <span> <Button variant='contained' background="blue"><AddBoxIcon/><a href='/newsinterface'  >ADD NEWS  </a> </Button></span> 
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
  
  