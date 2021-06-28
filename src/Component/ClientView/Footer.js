import React,{useState,useEffect} from 'react'
import Grid from "@material-ui/core/Grid"
import { makeStyles } from '@material-ui/core/styles';
import { postData, getData, ServerURL } from "../FetchNodeServices";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from "@material-ui/core/Divider"
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button"
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import GitHubIcon from '@material-ui/icons/GitHub';
import HouseIcon from '@material-ui/icons/House';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import EmailIcon from '@material-ui/icons/Email';


const useStyles = makeStyles((theme) => ({
    root: {
  
      width:'100%', 
      backgroundColor:'#FFF',
      color:'#000',
      height:'90%',

      
    },

    subdiv:{
       padding:20,
       width:'100%',
       marginLeft:'10px'
    },

  }));


export default function Footer(props){

    const classes = useStyles();
    const [listCategory, setListCategory] = useState([]);
    
    const fetchAllCategory = async () => {
        var result = await getData("categories/displayall");
        setListCategory(result);
      };

      useEffect(function () {
        fetchAllCategory();
      }, []);

      const menuCategory = () => {
        return listCategory.map((item) => {
          return (
            <Grid item xs={12}>
              {item.categoryname}
            </Grid>
          );
        });
      };

    return(

      <div  style={{display:'flex',justifyContent:'center',alignItems:'center', width:'100%'}}>       
        <div className={classes.root} >

        
            
           


            <Grid container spacing={1} style={{display:'flex',justifyContent:'center'}}>

                 <Grid item xs={12} sm={3}>
                    <Grid container spacing={2} className={classes.subdiv} >

                        <Grid item xs={12}  style={{fontWeight:'bold'}}>
                           OUR SERVICES
                          </Grid> 

                          <Grid item xs={12}>
                            Hospital
                          </Grid>

                          <Grid item xs={12}>
                            Ambulance
                          </Grid>

                          <Grid item xs={12}>
                            Plasma
                          </Grid>

                          <Grid item xs={12}>
                            Blood
                          </Grid>

                          <Grid item xs={12}>
                            Food
                          </Grid>
                          
                    </Grid>
                  </Grid>

                <Grid item xs={12} sm={3}>
                   <Grid container spacing={2} className={classes.subdiv} >
                         <Grid item xs={12} >
                            <b>CUSTOMER SERVICES </b>
                         </Grid> 

                          <Grid item xs={12}>
                            Terms & Conditions
                          </Grid>

                          <Grid item xs={12}>
                            FAQ
                          </Grid>

                          <Grid item xs={12}>
                            About US
                          </Grid>

                    </Grid>
                </Grid>

                <Grid item xs={12} sm={3}>
                   <Grid container spacing={2} className={classes.subdiv} >
                         <Grid item xs={12} >
                            <b>VISIT</b>
                         </Grid> 

                          <Grid item xs={12}>
                            Home
                          </Grid>

                          <Grid item xs={12}>
                            Blog
                          </Grid>

                    </Grid>
                    
                </Grid>
               
                
                <Grid item xs={12} sm={3} >
                    <Grid container spacing={2} className={classes.subdiv}>
                   
                         <Grid item xs={12} fullWidth style={{fontWeight:'bold'}}>
                            CONTACT US
                         </Grid> 

                        <Grid item xs={12} style={{display:'flex',flexDirection:'center',alignItems:'center'}}>
                          <HouseIcon style={{marginRight:15}} />
                          Gwalior,M.P,India
                        </Grid>

                        <Grid item xs={12} style={{display:'flex',flexDirection:'center',alignItems:'center'}}>
                          <EmailIcon style={{marginRight:15}} />
                          <b>ekumeed@gmail.com</b>
                        </Grid>

                        <Grid item xs={12} style={{display:'flex',flexDirection:'center',alignItems:'center'}}>
                          <PhoneEnabledIcon style={{marginRight:15,}} />
                          +0256-85621488
                        </Grid>
                        
                      <Grid item xs={12} style={{marginLeft:45, fontSize:15}}>
                       <b>Download App</b>
                      </Grid>
                        
                        <Grid item xs={12} sm={4}  style={{marginRight:25}}>
                          <img src="/app.jpg" ></img>
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>
                          <img src="/google.jpg" />
                        </Grid>
                        
                    </Grid>
                    
                </Grid>
                <Grid item xs={12} fullWidth style={{display:'flex',flexDirection:'center',alignItems:'center'}}>         
                <div class="me-5 d-none d-lg-block">
                <Divider style={{marginTop:5,marginBottom:5,backgroundColor:'#000'}} />

                   <span style={{marginRight:798 }} >Get connected with us on social networks:</span>
                 
                    <FacebookIcon style={{marginRight:10}} />
                    <TwitterIcon style={{marginRight:10}} />
                    <InstagramIcon style={{marginRight:10}} />
                    <YouTubeIcon  />
                    </div>
                
            </Grid>  

               

            </Grid> 

            

            
        </div>

    </div>
  

        
    )
}