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



  
export default function DisplaySupplierProducts(props)
{
    const [list,setList]=useState()
    const classes = useStyles();




/////////////////////////////////////////////////Edit form/////////////////////////////////////////////////////////

const [supplierId,setSupplierId]=useState('')
const [productId,setProductId]=useState('')
const [productName,setProductName]=useState('')
const [description,setDescription]=useState('')
const [productRate,setProductRate]=useState('')
const [offer,setOffer]=useState('')
const [stock,setStock]=useState('')
const [picture,setPicture]=useState({bytes:'',file:'/noimage.png' })
const [status,setStatus]=useState('')

const [pictureSaveCancel,setPictureSaveCancel]=useState(false)
const [getRowData,setRowData]=useState([])

const [listSupplier,setListSupplier]=useState([])
const [verifyStatus, setVerifyStatus] = React.useState({});

const handleChange =async (event) => {
  setVerifyStatus({ ...status, [event.target.name]: event.target.checked });
//  var result = jQuery('.switch-input').is(':checked')?'yes':'no';
  var formData=new FormData()
  formData.append("supplierId",supplierId)
  formData.append('verifyStatus',setVerifyStatus)

  var config={headers:{"content-type":"multipart/form-data"}}
  var r=await postDataAndImage('supplier/addswitch',formData,config)
 
}; 



const handlePicture=(event)=>{
    setPicture({bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])})
    setPictureSaveCancel(true)
}

 

const handleDelete=async(oldData)=>{

  var body={productid:oldData.productid}
  var result=await postData("supplierproducts/deletesupplierproducts",body)

  if(result){
    swal({
        title: "Supplier Products Deleted Successfully",
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
    if(isBlank(supplierId)){
        error=true
        msg+="<font color='#e74c3c'><b>Supplier Id should not be blank..</b></font><br> "
    }
    if(isBlank(productName)){
        error=true
        msg+="<font color='#e74c3c'><b>Product Name should not be blank..</b></font><br> "
    }
    if(isBlank(description)){
        error=true
        msg+="<font color='#e74c3c'><b>Description should not be blank..</b></font><br> "
    }
    if(isBlank(productRate)){
        error=true
        msg+="<font color='#e74c3c'><b>Product Rate should not be blank..</b></font><br> "
    }
    if(isBlank(offer)){
        error=true
        msg+="<font color='#e74c3c'><b>Offer should not be blank..</b></font><br> "
    }
    if(isBlank(stock)){
        error=true
        msg+="<font color='#e74c3c'><b>Stock should not be blank..</b></font><br> "
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
    productid:productId,
    supplierid:supplierId,
    productname:productName,
    description:description,
    productrate:productRate,
    offer:offer,
    stock:stock,
    status:status,
   
    
   }
   
    var result= await postData('supplierproducts/editsupplierproductdata',body)
    if(result){
        swal({
            title: "Supplier Products updated Successfully",
            icon: "success",
            dangerMode: true,
          })
    }
}
}

const handleCancelPicture=()=>{
  setPictureSaveCancel(false)
  setPicture({btyes:"",file:`${ServerURL}/images/${getRowData.picture}`})
}


const handleClickSavePicture=async()=>{

    var formData=new FormData()
    formData.append("productid",productId)
    formData.append("picture",picture.bytes)
    var config={headers:{"content-type":"multipart/form-data"}}
    var result= await postDataAndImage('supplierproducts/editpicture',formData,config)
    if(result){
      swal({
          title: "Product Picture updated Successfully",
          icon: "success",
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
                        Supplier Products Interface
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                   <FormControl variant="outlined" fullWidth className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-supplier">Supplier Id</InputLabel>
                           <Select
                             labelId="demo-simple-select-outlined-supplier"
                             id="demo-simple-select-outlined-supplier"
                             value={supplierId}
                             onChange={(event)=>setSupplierId(event.target.value)}
                             label="Supplier Id"
                            >
                                {fillSupplier()}
                            </Select>
                     </FormControl>
                </Grid>

                    <Grid item xs={6}>
                       <TextField value={productName} onChange={(event)=>setProductName(event.target.value)} label="Product Name" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={6} >
                       <TextField value={description} onChange={(event)=>setDescription(event.target.value)} label="Product Description" variant="outlined" fullWidth/>
                    </Grid>
                    
                    <Grid item xs={4}>
                       <TextField value={productRate} onChange={(event)=>setProductRate(event.target.value)} label="Product Rate" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={4} >
                       <TextField value={stock} onChange={(event)=>setStock(event.target.value)} label="Stock" variant="outlined" fullWidth/>
                    </Grid>
                
                    <Grid item xs={4} >
                       <TextField value={offer} onChange={(event)=>setOffer(event.target.value)} label="Offer" variant="outlined" fullWidth/>
                    </Grid>

                   
                <Grid item xs={12} sm={6}>
                    <span style={{fontSize:16,fontWeight:300}} >
                      Edit Product Picture
                      </span>
                    <input onChange={(event)=>handlePicture(event)} accept="image/*" className={classes.input} id="icon-button-logo" type="file" />
                    <label htmlFor="icon-button-logo">
                       <IconButton color="primary" aria-label="upload logo" component="span">
                       <PhotoCamera />
                       </IconButton>
                    </label>
                </Grid>

                <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column' }} >
                <Avatar  variant="rounded" src={picture.file} className={{width:60,height:60}} />
                
                {pictureSaveCancel?<span><Button onClick={()=>handleClickSavePicture()} color="secondary">Save</Button><Button color="secondary" onClick={()=>handleCancelPicture()} >Cancel</Button></span>:<></>}

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
                            <MenuItem value={'Pending'}>Pending</MenuItem>
                            <MenuItem value={'Verify'}>Verify</MenuItem>  
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

  setSupplierId(rowData.supplierid)
  setProductId(rowData.productid)
  setProductName(rowData.productname)
  setDescription(rowData.description)
  setProductRate(rowData.productrate)
  setOffer(rowData.offer)
  setStock(rowData.stock)
  setPicture({bytes:"",file:`${ServerURL}/images/${rowData.picture}`})
  setStatus(rowData.status)

 };

 const handleClose = () => {
  setOpen(false);
  fetchAllSupplierProducts()
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
              Edit/Delete  Supplier Products
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



    const fetchAllSupplierProducts=async()=>{
        var result=await getData("supplierproducts/displayall")
        setList(result)
    
    }

    const fetchAllSupplier=async()=>{
      var result=await getData("supplier/displayall")
      setListSupplier(result)
  
  }
  
  const fillSupplier=()=>{
      return listSupplier.map((item)=>{
          return(
              <MenuItem value={item.supplierid}>{item.firmname}</MenuItem>
          )
      })
  }
 

useEffect(function(){
fetchAllSupplierProducts()
fetchAllSupplier()
  
},[])

///////////////////////////////////////////////////////////////////
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

{ title: 'ID', field: 'productid' },
{ title: 'Supplier Id', field: 'supplierid' },
{ title: 'Product Name', field: 'productname' },
{ title: 'Description', field: 'description' },
{ title: 'Product Rate', field: 'productrate' },
{ title: 'Stock', field: 'stock' },
{ title: 'Offer', field: 'offer'},
{ title: 'Picture', field: 'picture',
render: rowData =><div><img src={`${ServerURL}/images/${rowData.picture}`} style={{borderRadius:5}} width='40' height='40'/></div> },
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
             Display Supplier Products
             
            </Grid>
            
            <Grid item xs={6}>
            <span><MTableToolbar {...props} /></span>
            </Grid>
            <Grid item xs={6} style={{textAlign:'right', padding:10}}>
            <a href='/displaysupplierproducts'  ><RefreshOutlinedIcon/></a>  
          <span> <Button variant='contained' background="blue"><AddBoxIcon/><a href='/supplierproducts'  >ADD S PRODUCTS  </a> </Button></span> 
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


