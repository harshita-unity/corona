
import Grid from "@material-ui/core/Grid"

import { makeStyles } from '@material-ui/core/styles';


const useStyles=makeStyles((theme)=> ({
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        background:'#fff',
        opacity:0.9
        
        },
        subdiv:{
           padding:40,
           width:1200,
           marginTop:20,
           
           
           },
         input: {
        display: 'none',
      },
    formControl: {
        minWidth: 690,
      },
           }));

export default function Description(Props)
           { const classes=useStyles();
            
                return(
                    <div className={classes.root}>
                    <div className={classes.subdiv}>
               <Grid container spacing={1}>
      <Grid item xs={6} style={{padding:50}}>
      <div style={{fontSize:40}}>
                    <b>EK <img src="/health.jpg" style={{width:40, height:40 ,margin:0}} /> UMEED </b>            
                    
                </div>
                <div style={{fontSize:33}}>
             <i> Government Of Madhya Pradesh </i>
             
                </div>

                <div style={{fontSize:15}}>
<p>Our health system is completely equipped with facilities to fight against Covid pandemic. Check "Hospital Dashboard" available below to know about the occupancy status and availability of hospital beds and ICUs. Follow the advice given by doctors and health workers to stay safe and be healthy. For any clarification on bed availability please contact the Covid Control Room of your district. You can find control room number in "Helpline" seen below.
               </p> </div>
               <div><p>हमारी स्वास्थ्य प्रणाली कोविड महामारी से लड़ने के लिए पूरी तरह से सुविधाओं से लैस है। अधिभोग की स्थिति और अस्पताल के बिस्तरों और आईसीयू की उपलब्धता के बारे में जानने के लिए नीचे उपलब्ध "अस्पताल डैशबोर्ड" देखें। सुरक्षित रहने और स्वस्थ रहने के लिए डॉक्टरों और स्वास्थ्य कर्मियों द्वारा दी गई सलाह का पालन करें। बिस्तर की उपलब्धता के बारे में किसी भी स्पष्टीकरण के लिए कृपया अपने जिले के कोविड नियंत्रण कक्ष से संपर्क करें। आप नीचे देखे गए "हेल्पलाइन" में कंट्रोल रूम नंबर पा सकते हैं।</p></div>
    </Grid>
    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <img width={350} src="/warning.jpg" style={{width:700, height:500 ,margin:0}}  alt="image"  />
      </Grid>

   
</Grid>

     </div>
     </div>
                  )  }
 