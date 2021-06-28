import React, { useEffect, useState } from "react";
import "../../App.css"
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header"
import { getData, ServerURL } from "../FetchNodeServices";
import Paper from "@material-ui/core/Paper"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Divider from "@material-ui/core/Divider"
import Footer from "./Footer"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column'
  },
  paperstyle: {
    display: 'flex',
    justifyContent: 'Center',
    alignItems: 'center',
    padding: 10,
    width: 230,
    height: 280,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'colomn',
    backgroundColor: '#f1f2f6',
    borderRadius: 10,
    
    "&:hover": {
      backgroundColor: '#fed330',
      
      transform: "scale(1.05)",
      tansition: "all 0.2s ease 0.2s",
    },
  },

  imageview:{
    width:150,
    height:110,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    padding:10,
    margin:20,
    cursor:"pointer",
    "&:hover":{
      transform:"scale(1.25)",
      tansition:"all 0.5s ease 0s"

    }

    },
}))

export default function AllFoodProvider(props) {
  const classes = useStyles()
  const [listFoodImage, setListFoodImage] = useState([])
  const [listCity, setListCity] = useState([])
  const [listFoodProvider, setListFoodProvider] = useState([])

  const fetchAllFoodImage = async () => {
    var list = await getData('foodslider/displayall')
    setListFoodImage(list)
  }

  const fetchAllFoodProvider = async () => {
    var list = await getData('foodprovider/displayall')
    setListFoodProvider(list)
  }
  const fetchAllCity = async () => {
    var result = await getData("city/displayall")
    setListCity(result)

  }

  ////////////////////////////////////// 
  const handlePerticularFoodProvider=(foodproviderid)=>{

    props.history.push({'pathname':'/perticularfood'},{'foodproviderid':foodproviderid})
  }
//////////////////////////////////////////

  const showSlider = () => {
    return listFoodImage.map((item) => {
      return (
        <div className='slick-slide-image'>
          <img src={`${ServerURL}/images/${item.picture}`} width="100%" />
        </div>
      )
    })
  }


  const showFoodProvider = () => {
    return listFoodProvider.map((item) => {
      return (
        <div>
          <div
            style={{
              width: "70%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              padding: 10,
              
       

            }}
          >
             

            <Paper elevation={1} className={classes.paperstyle}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
               onClick={()=>handlePerticularFoodProvider(item.foodproviderid)}>
                <div style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>{item.firmname}</div>
   
                <div className={classes.imageview}>  
                <img src={`${ServerURL}/images/${item.logo}`} width="180" height="150" style={{ display: 'flex', marginTop: 20 }} />
                </div>  
                <div >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{item.ownername}</div>
                  <span style={{ fontSize: 16,padding: 10 }}>{item.address1}</span><span style={{ fontSize: 16,padding: 10 }}>{item.address2}</span>
                </div>
              </div>
            </Paper>




          </div>

        </div>
      );
    });
  };
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

  useEffect(function () {

    fetchAllFoodImage()
    fetchAllFoodProvider()
    fetchAllCity()

  }, [])
  return (<div >


    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection:"row"
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
        <div style={{width:'100%',display:'flex'}}>

          {showFoodProvider()}

        </div>

        <Footer />
      </div>
    </div>



    {/* <div>
        <Footer /></div> */}
  </div>)

}