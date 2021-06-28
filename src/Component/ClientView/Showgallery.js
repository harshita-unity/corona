import React, { useEffect, useState } from "react";
import "../../App.css"
import { fade, makeStyles } from "@material-ui/core/styles";
import Header from "./Header"
import Button from '@material-ui/core/Button';
import { getData, postDataAndImage, ServerURL } from "../FetchNodeServices";
import Grid from "@material-ui/core/Grid"
import Divider from '@material-ui/core/Divider'
import Paper from "@material-ui/core/Paper"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Footer from "./Footer"




const useStyles = makeStyles((theme) => ({
    root: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column'
    },
    paperstyle: {
        display: 'flex',
        justifyContent: 'flex-start',
        padding: 10,
        width: 300,
        height: 310,
        margin: 10,
        borderRadius: 10,
        flexDirection: 'column'
    },
    cardroot: {
        width: 200,
        height: 280,
        marginBottom: 20,
        marginTop: 40,
        backgroundColor: '#dfe6e9',
        borderRadius: 10,
        "&:hover": {
            backgroundColor: '#f3a683',
            transform: "scale(1)",
            tansition: "all 0.2s ease 0.2s",
        },
    },
    imageview:{
        width:190,
        height:110,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        margin:2,
        cursor:"pointer",
        "&:hover":{
          transform:"scale(1.25)",
          tansition:"all 0.5s ease 0s"
    
        }
    
        },

    slide_down: {
        "&:hover": {
            boxShadow: "inset (0 100px 0 0 #D80286)"
        }
    },
    media: {
        height: 12,
        paddingTop: '56.25%', // 16:9
    },
   

}))

export default function Home(props) {
    const classes = useStyles();

    const [listCategory, setListCategory] = useState([])
    

    const fetchAllCategory = async () => {
        var list = await getData('gallery/displayall')
        setListCategory(list)
    }

    const showSlider = () => {
        return listCategory.map((item) => {
            return (
                <div className='slick-slide-image'>
                    <img src={`${ServerURL}/images/${item.icon}`}  width="150" height="100" />
                </div>
            )
        })
    }

    



    var settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        margin: 5,


    };
    var itemsettings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    useEffect(function () {
        fetchAllCategory()
        
    }, [])
    const showCategory=()=>{
        return(
            listCategory.map((item)=>{
            return(
                <div style={{  justifyContent:'center', alignItems:'center',  display:'flex', flexDirection: 'row', padding:10, margin:5}} >
                    <img src={`${ServerURL}/images/${item.icon}`} width="80%" />
                   
                  
                </div>
                
            )
            })
        )
    }
    return (<div >


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

           <div  style={{width:'100%', justifyContent:'center', alignItems:'center',  display:'flex', padding:5, margin:5}}>
          
               <div >
                {showCategory()}
                </div>
             
                </div>

              
            </div>
        </div>
        <Footer />


        
    </div>)

}