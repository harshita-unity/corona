import MaterialTable, { MTableToolbar } from 'material-table';
import AddBoxIcon from '@material-ui/icons/AddBox';
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

import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Switch from '@material-ui/core/Switch';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
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




export default function Displayabout(props)
{
    const [list,setList]=useState()
    const classes = useStyles();




/////////////////////////////////////////////////Edit form/////////////////////////////////////////////////////////

const [aboutid,setaboutid]=useState('')
const [about,setabout]=useState('')

const [getRowData,setRowData]=useState([])





 

const handleDelete=async(oldData)=>{

  var body={aboutid:oldData.aboutid}
  var result=await postData("about/deleteabout",body)

  if(result){
    swal({
        title: "Data Deleted Successfully",
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
    
    if(isBlank(about)){
        error=true
        msg+="<font color='#e74c3c'><b>About should not be blank..</b></font><br> "
    }
    



    msg+="</div>"

    if(error){
        swalhtml(renderHTML(msg))
    }
    else{

   var body={
    aboutid:aboutid,
    about:about,
   
    
    
   }
   
    var result= await postData('about/editabout',body)
    if(result){
        swal({
            title: "data updated Successfully",
            icon: "success",
            dangerMode: true,
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
    <div className={classes.root} >
        <div className={classes.subdiv} >
            <Grid container spacing={1}>

                <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center' }}>
                    <div style={{fontSize:22,fontWeight:700,letterSpacing:2,padding:20}}>
                        About
                    </div>
                </Grid>
                
                    
                <Grid item xs={12}>
                    <TextField value={about} onChange={(event)=>setabout(event.target.value)} label="About" variant="outlined" fullWidth/>
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

  setabout(rowData.aboutid)
  setabout(rowData.about)
  

   };

const handleClose = () => {
  setOpen(false);
  fetchAllState()
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    const fetchAllState=async()=>{
        var result=await getData("about/displayall")
        setList(result)
    
    }
    useEffect(function(){
       
        fetchAllState()
    
    },[])
    
    const [columns, setColumns] = useState([
      
    { title: 'ID', field: 'aboutid' },
    { title: 'About', field: 'about' },
  
  
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
                 Display About
                 
                </Grid>
                
                <Grid item xs={6}>
                <span><MTableToolbar {...props} /></span>
                </Grid>
                <Grid item xs={6} style={{textAlign:'right', padding:10}}>
                <a href='/displayabout'  ><RefreshOutlinedIcon/></a>  
              <span> <Button variant='contained' background="blue"><AddBoxIcon/><a href='/about'  >ADD About  </a> </Button></span> 
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
    
    