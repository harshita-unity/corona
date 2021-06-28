import React,{useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
 
  orange: {
    background:'#1e6b7b',
    width: theme.spacing(4),
    height: theme.spacing(4),

  },
 
}));
export default function Qtyspinner(props) {
  const classes = useStyles();
  const [value,setValue]=useState(props.value)
  const handleIncreament=()=>{
    var c=value+1
   setValue(c)
   props.onChange(c) 

  }
  const handleDecreament=()=>{
      var c=value-1;
      if(c>=0)
    {setValue(c)
    props.onChange(c) 
    
    }
 
   }
return(<div>
  
   {value==0?(<div style={{alignItems:'center' ,display:'flex',flexDirection:'row'}}><Button variant="contained" style={{background:'#1e6b7b'}}  onClick={()=>handleIncreament()}>ADD TO CART</Button></div>):( <div style={{alignItems:'center' ,display:'flex',flexDirection:'row'}}><Avatar onClick={()=>handleDecreament()} style={{marginRight:15}} className={classes.orange}>-</Avatar>
    <div style={{display:'flex',justifyContent:'center',fontSize:16,fontWeight:'bold' ,width:15,alignItems:'center'}}>
       {value }
    </div>
    <Avatar onClick={()=>handleIncreament()} style={{marginLeft:15}} className={classes.orange}>+</Avatar></div>)}
    </div>
)

}