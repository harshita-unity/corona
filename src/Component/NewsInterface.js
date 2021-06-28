import React,{ useEffect,useState } from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Avatar from "@material-ui/core/Avatar"
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InputLabel from '@material-ui/core/InputLabel';
import { isBlank } from "./Checks"
import swalhtml from "@sweetalert/with-react"
import swal from "sweetalert"
import renderHTML from "react-render-html"
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ServerURL,postDataAndImage,postData,getData} from"./FetchNodeServices"

const useStyles=makeStyles((theme)=> ({
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
        
        },
        subdiv:{
           padding:20,
           width:750,
           marginTop:20,
           background:'#fff'
           },
         input: {
        display: 'none',
      },
    
}));

export default function NewsInterface(Props)
           { const classes=useStyles();
            
            const [agencyId,setAgencyId]=useState('')
            const [dateNews,setDateNews]=useState('')
            const [timeNews,setTimeNews]=useState('')
            const [newsHeading,setNewsHeading]=useState('')
            const [subheading,setSubheading]=useState('')
            const [description,setDescription]=useState('')
            const [image,setImage]=useState({bytes:'',file:'/noimage.png' })
            const [verify,setVerify]=useState('')

            const [listAgency,setListAgency]=useState([])

            const fetchAllAgency=async()=>{
                var result=await getData("newsagency/displayall")
                setListAgency(result)
            
            }
            useEffect(function(){
                fetchAllAgency()
            },[])
        
            const fillAgency=()=>{
                return listAgency.map((item)=>{
                    return(
                        <MenuItem value={item.agencyid}>{item.agencyname}</MenuItem>
                    )
                })
            }
           
          
             const handleImage=(event)=>{
                setImage({bytes:event.target.files[0],
                file:URL.createObjectURL(event.target.files[0])})
        
                }

  const handleClick=async()=>{
      var error=false
          var msg="<div>"
          if(isBlank(agencyId))
          {error=true
          msg+="<font color='#b2bec3'><b>Category fill the Agency Name</b></font><br>";
          }
          if(isBlank(dateNews))
          {error=true
            msg+="<font color='#b2bec3'><b>Pls fill the DATE</b></font><br>";
          }
          if(isBlank(image.bytes))
          {error=true
            msg+="<font color='#b2bec3'><b>Pls select picture </b></font><br>";
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
        
                var formData=new FormData()
                formData.append("agencyid",agencyId)
                formData.append("datenews",dateNews)
                formData.append("timenews",timeNews)
                formData.append("newsheading",newsHeading)
                formData.append("subheading",subheading)
                formData.append("description",description)
                formData.append("image",image.bytes)
                formData.append("verify",verify)

                var config={headers:{"content-type":"multipart/form-data"}}
                var result=await postDataAndImage('news/addnews',formData,config)
                
                if(result)
               {
                swal({
                  title: "News Data Submitted Successfully",
                  image: "success",
                  dangerMode: true,
                })
               }
                }
   }


 return(
                    
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
                    //value={age}
                    onChange={(event)=>setAgencyId(event.target.value)}
                    label="agency ID"
                    >
                      {fillAgency()}
                    </Select>
               </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                  <TextField onChange={(event)=> setDateNews(event.target.value)} type="date"  variant="outlined" fullWidth/>
              </Grid>

              <Grid item xs={12} sm={6}>
                  <TextField onChange={(event)=> setTimeNews(event.target.value)}  type="time"  variant="outlined" fullWidth/>
              </Grid>
                    
              <Grid item xs={12}>
                 <TextField onChange={(event)=> setNewsHeading(event.target.value)} label="Newsheading" variant="outlined" fullWidth/>
             </Grid>

              <Grid item xs={12}>
                 <TextField onChange={(event)=> setSubheading(event.target.value)} label="Subheading" variant="outlined" fullWidth/>
               </Grid>

                      <Grid item xs={12}>
                         <TextField onChange={(event)=> setDescription(event.target.value)} label="Description" variant="outlined" fullWidth/>
                      </Grid> 

                    
                      <Grid item xs={12} sm={6}>
                        <span style={{fontSize:16,fontWeight:300}} >Upload Image</span>
                        <input onChange={(event)=>handleImage(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                           <IconButton color="primary" aria-label="upload image" component="span">
                           <PhotoCamera />
                           </IconButton>
                        </label>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center' }} >
                    <Avatar  variant="rounded" src={image.file} className={{width:60,height:60}} />
                    </Grid>

                    <Grid item xs={12} >
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                       <InputLabel id="demo-simple-select-outlined-label">Verify</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                          
                            onChange={(event)=>setVerify(event.target.value)}
                            label="Verify" >
                            <MenuItem value={'Pending'}>Pending</MenuItem>
                            <MenuItem value={'Active'}>Active</MenuItem>  
                        </Select>
                    </FormControl>
                    </Grid>


                  <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                          <Button onClick={()=>handleClick()} fullWidth variant="contained" color="primary">Save</Button>
                   </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Button fullWidth variant="contained" color="secondary">Reset</Button>
                     </Grid>
      </Grid>

    </div>
  </div>
                  
                  
)}
 