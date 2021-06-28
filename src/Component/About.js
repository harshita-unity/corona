import React,{ useState } from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

import swalhtml from "@sweetalert/with-react"
import swal from "sweetalert"

import { makeStyles } from '@material-ui/core/styles';
import {ServerURL,postDataAndImage,getData,postData} from"./FetchNodeServices"
//import { isBlank } from "./checks"
import renderHTML from "react-render-html"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

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
       export default function About(props)
      { const classes=useStyles();
         
        const [about,setabout]=useState('')

        About.modules = {
          toolbar: [
            [{'header':'1'},{'header':'2'},{'font':[] } ],
            [{size: []}],
            ['bold','italic','underline','strike','blockquote'],
            [{'list':'ordered'},{'list':'bullet'},
          {'indent':'-1'},{'indent':'+1'}],
          ['link','image','video'],
          ['clean']
          ],
          clipboard: {
            matchVisual:false,
          }
        }

        About.formats =[
          'header','font','size',
          'bold','italic','underline','strike','blockquote','list','bullet','indent',
          'link','image','video'
        ]
    
        const handleClick=async()=>{
          var error=false
          var msg="<div>"
        
         
          msg+="</div>"
          if(error)
          {
           swalhtml(renderHTML(msg))
          }
          else
          {

          

         var formData=new FormData()
       
         formData.append("about",about)
         
         var config={headers:{"content-type":"multipart/form-data"}}
         var result=await postDataAndImage('about/addabout',formData,config)
         
         if(result)
         {
          swal({
            title: "Data Submitted Successfully",
            icon: "success",
            dangerMode: true,
          })
         }
        }
       } 
       return(
            <div className={classes.root}>
            <div className={classes.subdiv}>
       <Grid container spacing={1}>
        <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
         <div style={{fontSize:22,fontweight:700,letterSpacing:2,padding:20 }}>
             About
         </div>
        </Grid>
     
     

             <Grid item xs={12}>
       <ReactQuill value={about}
      modules={About.modules}
       formats={About.formats}
                   onChange={(value)=> setabout(value)}/>

       </Grid >
         

    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Button onClick={()=>handleClick()} fullWidth variant="contained" color="primary">Save</Button>
     </Grid>

     <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Button fullWidth variant="contained" color="primary">Reset</Button>
     </Grid>
</Grid>
            </div>
            </div> 
        ) }
