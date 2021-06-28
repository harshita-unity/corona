import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { getData, ServerURL, postData, postDataAndImage } from "../FetchNodeServices";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Footer from "./Footer"
import Slider from "react-slick";
import Chip from '@material-ui/core/Chip';
import Header from "./Header"
import Qtyspinner from "./Qtyspinner"
import { InvertColors } from '@material-ui/icons';




const styles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    

  },

  paperstyle: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems:'center',
    display: 'flex',
    padding: 10,
    width: 100,
    height: 350,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'column',
    backgroundColor: '#fff',
    opacity: 0.9
  },
  paperstyleimage: {
    marginTop: 3,
    justifyContent: 'center',
    display: 'flex',
    padding: 2,
    width:250,
    margin: 10,
    borderRadius: 10,
    marginLeft: 90,
    flexDirection:'column'

  },
  paperstyleWeekFood: {
    marginTop: 3,
    justifyContent: 'center',
    display: 'flex',
    padding: 2,
    width: 155,
    height: 180,
    margin: 10,
    borderRadius: 10,
    flexDirection:'column'
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  hover:{
        "&:hover": {
            backgroundColor: '#fff',
            
            transform: "scale(1.0)",
            tansition: "all 0.5s ease 0.5s",
        },
      },
      hover1:{
        
              "&:hover": {
                
                  backgroundColor: '#fff',
                  transform: "scale(1.3)",
                  tansition: "all 1.0s ease 0.2s",
              },
            },
})
)

export default function PerticularFoodProvider(props) {
  const classes = styles()
 var foodproviderid = props.history.location.state.foodproviderid;
  const [days, setDays] = useState('')
  const [listFoodProvider, setListFoodProvider] = useState([])
  const [listFoodProviderDetail,setListFoodProviderDetail]=useState([])
  // const [listFoodImage,setListFoodImage]=useState([])
  const [listFoodImage, setListFoodImage] = useState([])
  const [listFoodTypes, setListFoodTypes] = useState([])
  const [listDays, setListDays] = useState([])
  const [listWeekFoodDays, setListWeekFoodDays] = useState([])


  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    margin: 10,
  }
  

  const fetchAllFoodImage = async () => {
    var list = await getData('foodslider/displayall')
    setListFoodImage(list)
  }
  const fetchFoodTypes = async () => {
    var list = await getData('foodtypes/displayall')
    setListFoodTypes(list)
  }
  const fetchAllDays = async () => {
    var list = await getData('days/displayall')
    setListDays(list)
  }


  const fetchAllFoodProviderById = async () => {
   var body = { 'foodproviderid': foodproviderid }
    var list = await postData('foodprovider/displayfoodproviderbyfoodproviderid', body)
    setListFoodProvider(list)
  }
  const fetchAllFoodProviderDetail=async()=>{
    var body={'foodproviderid':foodproviderid}
    var list=await postData('foodprovider/displayfoodproviderdetail',body)
    setListFoodProviderDetail(list)
 }

  useEffect(function () {

    fetchAllFoodProviderById()
    // fetchFoodImage()
    fetchFoodTypes()
    fetchAllDays()
    fetchAllFoodImage()
    fetchAllFoodProviderDetail()


  }, [])



  const showSlider = () => {
    return listFoodImage.map((item) => {
      return (
        <div className='slick-slide-image'>
          <img src={`${ServerURL}/images/${item.picture}`} width="100%" />
        </div>
      )
    })
  }

  const showFoodProviderIcon = () => {
    return listFoodProvider.map((item) => {
      return (<div>
        <img src={`${ServerURL}/images/${item.logo}` } style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }} />
        
        </div>

        )})}
  const showFoodProviderDetail = () => {
    return listFoodProviderDetail.map((item) => {
      return (<div>
        <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

            }}>

        <Grid container spacing={2}  style={{display: "flex",alignItems: "center",justifyContent: "center",margin:10,borderRadius:10,background:'#000',}}>
                <Grid item xs={4} style={{display: "flex",alignItems: "center",justifyContent: "center",flexDirection:'column'}}>
                <div><img width={20} src="/poor.jpg" /></div>
                <div style={{fontSize:22,fontWeight:'bold'}}>Owner</div>
                <div style={{fontSize:20,margin:10,fontWeight:600}}>{item.ownername}</div>
                <div><img src={`${ServerURL}/images/${item.logo}`} style={{margin:5,borderRadius:5}} width={140}/></div>
                
                </Grid>
                <Grid item xs={4} style={{display: "flex",alignItems: "center",justifyContent: "center",flexDirection:'column'}}>
                <div><img width={20} src="/shop.png" / ></div>
                <div style={{fontSize:22,fontWeight:'bold'}}>Address</div>
                <div style={{margin:30}}>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:20,margin:10,fontWeight:600}}>{item.firmname}</div>
                <div>
                <div style={{display: "flex",alignItems: "center",justifyContent: "center",flexDirection:'column',fontWeight:500}}>
                {item.address1},
                {item.address2},
                <div>{item.sname},
                {item.cname}</div>
                </div>
                </div>
                </div>
                </Grid>
                <Grid item xs={4} style={{display: "flex",alignItems: "center",justifyContent: "center",flexDirection:'column'}}>
                <div><img width={20} src="/contact.png" / ></div>
                <div style={{fontSize:22,fontWeight:'bold'}}>Contact Us</div>
                <div style={{margin:30}}>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',fontWeight:650}} >Mobile</div>
                  <div style={{display:'flex',justifyContent:'center',alignItems:'center',fontWeight:500}}>+91-9644223374</div>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',fontWeight:650}}>
                Email Id
                </div >
                 <div style={{display:'flex',justifyContent:'center',alignItems:'center',fontWeight:500}}>101bhatnagar@gmail.com
                </div>
                </div>
                
                </Grid>
                </Grid>
                    </div>
                    </div>
                    
              


      );
    });
  };

  const showdays = () => {
    return listDays.map((item) => {
      return (
        <div>
          
          <Button className={classes.hover} style={{display:'flex',margin:2, width:170}}>
            
            <div
              onClick={() => showWeeklyFood(item.daysid)}>
                <div style={{display:'flex',flexDirection:'column'}}>
               <div style={{ display: 'flex', alignItems: 'center',justifyContent:'center',fontWeight:'bold'}}>    
                <b>{item.daysname}</b>
                </div>
                <div>
              <img src={`${ServerURL}/images/${item.icon}`} color='red' width="130" style={{ display: 'flex', marginTop: 20, borderRadius: 5 }} />
              </div>
              </div>
              </div>
              
              
              
            
              </Button>
          
          

        </div>
      )

    })
  }

  const showWeeklyFood = async (days) => {

    var body = { foodproviderid: foodproviderid, days: days }
    var list = await postData('foodtypes/displayweekandfood', body)
    setListWeekFoodDays(list)

  }

  const showFoodProviders = () => {
    var qty=0
    return listWeekFoodDays.map((item) => {
      return (<div style={{ width: '100%' }} >
        
        <Grid container spacing={1} style={{display: "flex",alignItems: "center",justifyContent: "center",margin:20,background:'#fff',}}>
          <Grid item xs={12} >
            <Grid container >
              <Grid item xs={12} sm={4} >
              
                <Paper elevation={5} className={classes.paperstyleimage}>
                  
                  <img className={classes.hover1} src={`${ServerURL}/images/${item.icon} `} width="200" style={{ display: 'flex', }} />
                  
                </Paper>
                
              </Grid>
            
              <Grid item xs={12} sm={4}>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:100 ,fontWeight:'bold',fontSize:50,color:'#7bed9f' }}>{item.foodtype}</div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 100 ,fontWeight:'bold',fontSize:50,color:'#e15f41' }}>{item.fooddescription}</div>
              </Grid>
             

            </Grid>
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginRight:10}}>
              <Qtyspinner value={qty}  />
              </div>
            <hr style={{ width: "90%" }} />
          </Grid>
        </Grid>
      </div>)
    });
  };



  const showFoodProvider = () => {
    return listFoodProvider.map((item) => {
      return (<div className={classes.root}>
     


          <Grid Container spacing={2} style={{ display: 'flex', justifyContent: 'center', marginTop: 20, }}>
            <Grid item xs={12}>
              <Grid container >

                
                <Grid item xs={12} sm={6}
                  style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold',flexDirection:'column' }}>
                    <b style={{fontSize:40}}>EK <img src="/health.jpg" style={{width:40, height:40 ,margin:0}} /> UMEED </b>
                    <p style={{margin:20}}> The COVID-19 pandemic has led to a dramatic loss of human life worldwide
                    and presents an unprecedented challenge to public health Millions of enterprises faces an existential threat
                     Our motive is to give you  some peace and positive vibes
                    Always turn a negative situation into a positive situation 
                   Once you replace negative thoughts with positive ones, you,ll start having positive results</p>
                </Grid>
                <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                  <img src={`/slum.png`} width="350" height="300"  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>



      </div>


      );
    });
  };



  return (<div
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
                <div style={{ width: "100%",}}>
          <Slider {...settings} >{showSlider()}</Slider>
        </div>
                
      
      <div style={{ display:"flex", marginTop:5}}>
        {showFoodProviderDetail()}
      </div>
      <Grid item xs={12}>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
        <div style={{marginTop:40}}>{showFoodProviderIcon()}</div>
        <div style={{ fontSize: 36, marginTop: 20,}}>
        Our Food Services
        </div>
        </div>
      </Grid>
      
      <div style={{ padding: 8, flexDirection: 'column', display: 'flex', flexWrap: 'wrap', marginTop: 50 }}>

        <div style={{ flexDirection: 'row', display: 'flex', }}>
          {showdays()}

        </div>

      </div>
      {/* <div style={{ padding: 8, flexDirection: 'column', display: 'flex', flexWrap: 'wrap' }}>
    
                 {showWeeklyFood()}

             </div> */}
      <div style={{ marginTop:10, flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>

        {showFoodProviders()}

      </div>
      
      <div style={{ padding: 8, flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>

        {showFoodProvider()}

      </div>
    <Footer />

    </div>   
  </div>)

}