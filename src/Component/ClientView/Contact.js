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
import {ServerURL,postDataAndImage,getData} from "../FetchNodeServices"
import { makeStyles } from '@material-ui/core/styles';
import {isBlank} from "../Checks"
import renderHTML from "react-render-html" 
import Switch from '@material-ui/core/Switch'
import { Typography } from "@material-ui/core"
import Header from "./Header"
import Footer from "./Footer"

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


export default function Contact(props)
{ 
  const classes=useStyles();

  const [Tips,setTips]=useState('')  
  const [Name,setName]=useState('')
  const [Email,setEmail]=useState('')
  const [Mobile,setMobile]=useState('')
  const [Problem,setProblem]=useState('')
  const [icon,setIcon]=useState({bytes:'',file:'/noimage.png' })
  
  const [listState,setListState]=useState([])

  const fetchAlltips=async()=>{
      var result=await getData("tips/displayall")
      setListState(result)
  
  }
  useEffect(function(){
      fetchAlltips()
  },[])

  const filltips=()=>{
      return listState.map((item)=>{
          return(
           <MenuItem value={item.tipsid}>{item.tips}</MenuItem>
          )
      })
  }

     
           
  const handleIcon=(event)=>{
    setIcon({bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])})
   }
                
   const handleClick=async()=>{
    var error=false
    var msg="<div>"

    msg+="</div>"

    if(error){
        swalhtml(renderHTML(msg))
    }
    else{


    var formData=new FormData()
    formData.append("tips",Tips)
    formData.append("name",Name)
    formData.append("email",Email)
    formData.append("mobile",Mobile)
    formData.append("problem",Problem)
    formData.append("icon",icon.bytes)
   
    

    var config={headers:{"content-type":"multipart/form-data"}}
    var result= await postDataAndImage('contact/adddata',formData,config)
    if(result){
        swal({
            title: "Feedback Submitted Successfully",
            icon: "success",
            dangerMode: true,
          })
    }
}
}


const feedback=()=>{   
  return(
  <div className={classes.root}>
    <div className={classes.subdiv}>
      <Grid container spacing={1}>

          <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
            <div style={{fontSize:22,fontweight:700,letterSpacing:2,padding:20 }}>
           Feedback Form
            </div>
          </Grid>

          <Grid item xs={12}>
                       <FormControl variant="outlined" fullWidth className={classes.formControl}>
                          <InputLabel id="demo-simple-select-outlined-state">Please Select The Option </InputLabel>
                          <Select
                             labelId="demo-simple-select-outlined-state"
                             id="demo-simple-select-outlined-state"
                             //value={age}
                             onChange={(event)=>setTips(event.target.value)}
                              label="State Id">
                              {filltips()}
                           </Select>
                        </FormControl>
               </Grid>


             <Grid item xs={12}>
                <TextField onChange={(event)=>setName(event.target.value)} label="Name" multiline rows={2} variant="outlined" fullWidth/>
              </Grid>

               <Grid item xs={12}>
                  <TextField onChange={(event)=>setEmail(event.target.value)} label="Email"multiline rows={2} variant="outlined" fullWidth/>
                </Grid> 

                <Grid item xs={12}>
                  <TextField onChange={(event)=>setMobile(event.target.value)} label="Mobile no." multiline rows={2} variant="outlined" fullWidth/>
                </Grid> 

                <Grid item xs={12}>
                  <TextField onChange={(event)=>setProblem(event.target.value)} label="Please Explain your Problem" variant="outlined"   multiline rows={7} fullWidth/>
            
                </Grid> 

                <Grid item xs={6}>
                   <span style={{fontsize:16,fontweight:300}}>Upload Screenshot</span>
                   <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                   <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload Icon" component="span">
                    <PhotoCamera />
                    </IconButton>
                    </label>
                </Grid>
    
                <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <Avatar variant="rounded" src={icon.file} style={{width:60,height:60}} />
               </Grid>
              
               <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <Button onClick={()=>handleClick()} fullWidth variant="contained" color="Secondary">Sumbit</Button>
                </Grid>


      </Grid>
    </div>
  </div>
  )}
return(
  <div >


  <div
      style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

      }}>

      <div style={{ width: "100%", background: "#fff" }}>
          
       <div style={{ marginBottom: 80 }}>
              <Header history={props.history} />
  </div>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Times New Roman', color: '#ff3838', fontWeight: 'bolder', fontSize: 18 }}>
              <marquee width="100%" behavior="scroll" driection="left">Wash your hands often with soap and water for at least 20 seconds(अपने हाथों को बार-बार साबुन और पानी से कम से कम 20 सेकंड तक धोएं). Use an alcohol-based hand sanitizer that contains at least 60% alcohol if soap and water are not available(साबुन और पानी उपलब्ध न होने पर अल्कोहल-आधारित हैंड सैनिटाइज़र का उपयोग करें जिसमें कम से कम 60% अल्कोहल हो).
              Avoid touching your eyes, nose, and mouth with unwashed hands(बिना धुले हाथों से अपनी आंख, नाक और मुंह को छूने से बचें).
              Avoid close contact with people who are sick(जो लोग बीमार हैं उनके साथ निकट संपर्क से बचें).
              Cover your cough or sneeze with a tissue, then throw the tissue in the trash(अपनी खाँसी या छींक को टिश्यू से ढँक लें, फिर टिश्यू को कूड़ेदान में फेंक दें).
              Clean and disinfect frequently touched objects and surfaces(बार-बार छुई जाने वाली वस्तुओं और सतहों को साफ और कीटाणुरहित करें).
              Maintain at least 1 meter (3 feet) distance between yourself and other people, particularly those who are coughing, sneezing and have a fever(अपने और अन्य लोगों के बीच कम से कम 1 मीटर (3 फीट) की दूरी बनाए रखें, खासकर उन लोगों के लिए जो खांस रहे हैं, छींक रहे हैं और बुखार है).
Wear cloth face coverings in public settings where other social distancing measures are difficult to maintain(सार्वजनिक स्थानों पर कपड़े के फेस कवरिंग पहनें जहां अन्य सामाजिक दूर करने के उपायों को बनाए रखना मुश्किल हो).                     
</marquee></div>
<div>

  <img src={'./tem.jpg'} width={"100%"} />
</div>
     
         <div style={{marginBottom:100}} >
         <Grid container spacing={1}>


         <Grid item xs={6}>
        {feedback()}
          </Grid>

          <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            
            <img src={'./slum.png'} width={550} />


            </Grid>

          </Grid>









          </div>
       
        

          <Footer />   
      </div>

     
  </div>
</div>
)}
 