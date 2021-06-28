import React,{useState,useEffect} from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import swalhtml from "@sweetalert/with-react"
import swal from "sweetalert"

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ServerURL,postDataAndImage,getData,postData} from "./FetchNodeServices"
import { makeStyles } from '@material-ui/core/styles';
import {isBlank} from "./Checks"
import renderHTML from "react-render-html" 



const useStyles = makeStyles((theme) => ({
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

  
export default function SupplierProductsInterface(props)
{ const classes =useStyles();
    const [supplierId,setSupplierId]=useState('')
    const [productName,setProductName]=useState('')
    const [description,setDescription]=useState('')
    const [productRate,setProductRate]=useState('')
    const [offer,setOffer]=useState('')
    const [stock,setStock]=useState('')
    const [picture,setPicture]=useState({bytes:'',file:'/noimage.png' })
    const [status,setStatus]=useState('')
   
    const [listSupplier,setListSupplier]=useState([])

    const fetchAllSupplier=async()=>{
        var result=await getData("supplier/displayall")
        setListSupplier(result)
    
    }
    useEffect(function(){
        fetchAllSupplier()
    },[])

    const fillSupplier=()=>{
        return listSupplier.map((item)=>{
            return(
                <MenuItem value={item.supplierid}>{item.firmname}</MenuItem>
            )
        })
    }
   

   
    const handlePicture=(event)=>{
        setPicture({bytes:event.target.files[0],
        file:URL.createObjectURL(event.target.files[0])})

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
        if(isBlank(picture.bytes)){
            error=true
            msg+="<font color='#e74c3c'><b>Plz select ngo poster..</b></font><br> "
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


        var formData=new FormData()
        formData.append("supplierid",supplierId)
        formData.append("productname",productName)
        formData.append("description",description)
        formData.append("productrate",productRate)
        formData.append("offer",offer)
        formData.append("stock",stock)
        formData.append("picture",picture.bytes)
        formData.append("status",status)
        

        var config={headers:{"content-type":"multipart/form-data"}}
        var result= await postDataAndImage('supplierproducts/addnewsupplierproducts',formData,config)
        if(result){
            swal({
                title: "Supplier Products Added Successfully",
                icon: "success",
                dangerMode: true,
              })
        }
    }
}

    

    return(
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
                             //value={age}
                             onChange={(event)=>setSupplierId(event.target.value)}
                              label="Supplier Id">
                              {fillSupplier()}
                           </Select>
                        </FormControl>
               </Grid>

                    <Grid item xs={12}>
                       <TextField onChange={(event)=>setProductName(event.target.value)} label="Product Name" variant="outlined" fullWidth/>
                    </Grid>

                    
                    <Grid item xs={12} >
                       <TextField onChange={(event)=>setDescription(event.target.value)} label="Product Description" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={4}>
                       <TextField onChange={(event)=>setProductRate(event.target.value)} label="Product Rate" variant="outlined" fullWidth/>
                    </Grid>


                    <Grid item xs={4} >
                       <TextField onChange={(event)=>setStock(event.target.value)} label="Stock" variant="outlined" fullWidth/>
                    </Grid>
                
                    <Grid item xs={4} >
                       <TextField onChange={(event)=>setOffer(event.target.value)} label="Offer" variant="outlined" fullWidth/>
                    </Grid>
                    
                    


                    <Grid item xs={12} sm={6}>
                        <span style={{fontSize:16,fontWeight:300}} >Upload Product Picture</span>
                        <input onChange={(event)=>handlePicture(event)} accept="image/*" className={classes.input} id="icon-button-logo" type="file" />
                        <label htmlFor="icon-button-logo">
                           <IconButton color="primary" aria-label="upload logo" component="span">
                           <PhotoCamera />
                           </IconButton>
                        </label>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center' }} >
                    <Avatar  variant="rounded" src={picture.file} className={{width:60,height:60}} />
                    </Grid>


                    
                    <Grid item xs={12} >
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                       <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                          
                            onChange={(event)=>setStatus(event.target.value)}
                            label="Status" >
                            <MenuItem value={'Pending'}>Pending</MenuItem>
                            <MenuItem value={'Verify'}>Verify</MenuItem>  
                        </Select>
                    </FormControl>
                    </Grid>


                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}} >
                        <Button 
                         onClick={()=>handleClick()}
                         fullWidth variant="contained" 
                         color="primary" >
                             Save
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <Button fullWidth variant="contained" color="secondary">Reset</Button>
                    </Grid>




                </Grid>

            </div>
        
        </div>
    )
   
}