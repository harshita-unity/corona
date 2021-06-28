import MaterialTable, { MTableToolbar } from 'material-table';
import AddBoxPicture from '@material-ui/icons/AddBox';
import React,{useState,useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PictureButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ClosePicture from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import CloudDownloadPicture from '@material-ui/icons/CloudDownload';
import Switch from '@material-ui/core/Switch';
import RefreshOutlinedPicture from '@material-ui/icons/RefreshOutlined';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

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




export default function DisplayState(props)
{
    const [list,setList]=useState()
    const classes = useStyles();




/////////////////////////////////////////////////Edit form/////////////////////////////////////////////////////////

const [pictureid,setpictureid]=useState('')
const [picture,setpicture]=useState({bytes:'',file:'/noimage.png' })
  
const [pictureSaveCancel,setPictureSaveCancel]=useState(false)
const [getRowData,setRowData]=useState([])
const [status, setstatus] = React.useState({});

const handleChange =async (event) => {
  setstatus({ ...status, [event.target.name]: event.target.checked });
//  var result = jQuery('.switch-input').is(':checked')?'yes':'no';
  var formData=new FormData()
  formData.append("pictureid",pictureid)
  formData.append('status',status)

  var config={headers:{"content-type":"multipart/form-data"}}
  var r=await postDataAndImage('news/addswitch',formData,config)
 
}; 


const handlePicture=(event)=>{
    setpicture({bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])})
    setPictureSaveCancel(true)
}

 

const handleDelete=async(oldData)=>{

  var body={pictureid:oldData.pictureid}
  var result=await postData("foodslider/deletepicture",body)

  if(result){
    swal({
        title: "State Deleted Successfully",
        picture: "success",
        dangerMode: true,
      })
  }
  else{
    swal({
      title: "Fail to Deleted Record",
      picture: "success",
      dangerMode: true,
    })
  }

}





const handleCancelPicture=()=>{
  setPictureSaveCancel(false)
  setpicture({btyes:"",file:`${ServerURL}/images/${getRowData.picture}`})
}


const handleClickSavePicture=async()=>{

  var formData=new FormData()
  formData.append("pictureid",pictureid)
  formData.append("picture",picture.bytes)
  var config={headers:{"content-type":"multipart/form-data"}}
  var result= await postDataAndImage('foodslider/editpicture',formData,config)
  if(result){
    swal({
        title: "Picture updated Successfully",
        picture: "success",
        dangerMode: true,
      })
      setPictureSaveCancel(false)
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
                      Slider
                    </div>
                </Grid>
                
                    
                

                    
                    <Grid item xs={6}>
                    <span style={{fontSize:16,fontWeight:300}} >
                      Edit picture
                      </span>
                    <input onChange={(event)=>handlePicture(event)} accept="image/*" className={classes.input} id="picture-button-file" type="file" />
                    <label htmlFor="picture-button-file">
                       <PictureButton color="primary" aria-label="upload picture" component="span">
                       <PhotoCamera />
                       </PictureButton>
                    </label>
                </Grid>

                <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column' }} >
                <Avatar  variant="rounded" src={picture.file} className={{width:60,height:60}} />

                {pictureSaveCancel?<span><Button onClick={()=>handleClickSavePicture()} color="secondary">Save</Button><Button color="secondary" onClick={()=>handleCancelPicture()} >Cancel</Button></span>:<></>}

                </Grid>

           </Grid>

        </div>
    
    </div>
    </DialogContentText>
     </DialogContent>
     <DialogActions>
       <Button   color="primary" style={{color:'#d63031'}}>
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

  setpictureid(rowData.pictureid)
  
  setpicture({bytes:"",file:`${ServerURL}/images/${rowData.picture}`})
   };

const handleClose = () => {
  setOpen(false);
  fetchAllState()
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    const fetchAllState=async()=>{
        var result=await getData("foodslider/displayall")
        setList(result)
    
    }
    useEffect(function(){
       
        fetchAllState()
    
    },[])
    
    const [columns, setColumns] = useState([
      
    { title: 'ID', field: 'pictureid' },
    
    { title: 'Picture', field: 'picture',
     render: rowData =><div><img src={`${ServerURL}/images/${rowData.picture}`} style={{borderRadius:5}} width='40' height='40'/></div> },
    
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
                 Display Slider
                 
                </Grid>
                
                <Grid item xs={6}>
                <span><MTableToolbar {...props} /></span>
                </Grid>
                <Grid item xs={6} style={{textAlign:'right', padding:10}}>
                <a href='/displayslider'  ><RefreshOutlinedPicture/></a>  
              <span> <Button variant='contained' background="blue"><AddBoxPicture/><a href='/slider'  >Slider </a> </Button></span> 
               <span> <Button variant='contained' color="primary" ><CloudDownloadPicture/>Download Excel</Button></span>
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
    
    