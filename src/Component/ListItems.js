import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

import StateInterface from './StateInterface'
import DisplayState from './DisplayState'
import CityInterface from './CityInterface'
import DisplayCity from './DisplayCity'
import HospitalInterface from './HospitalInterface'
import DisplayHospital from './DisplayHospital'
import FoodProviderInterface from './FoodProviderInterface'
import DisplayFoodProvider from './DisplayFoodProvider'
import FoodTypesInterface from './FoodTypesInterface'
import DisplayAllFoodTypes from './DisplayAllFoodTypes'
import DaysInterface from './DaysInterface'
import DisplayAllDays from './DisplayAllDays'
import RoomsInterface from './RoomsInterface'
import DisplayRooms from './DisplayRooms'
import RoomTypesInterface from './RoomTypesInterface'
import DisplayRoomTypes from './DisplayRoomTypes'
import NgoInterface from './NgoInterface'
import DisplayNgo from './DisplayNgo'
import NgoWorkInterface from './NgoWorkInterface'
import DisplayNgoWork from './DisplayNgoWork'
import NewsAgencyInterface from './NewsAgencyInterface'
import DisplayNewsAgency from './DisplayNewsAgency'
import NewsInterface from './NewsInterface'
import DisplayNews from './DisplayNews'
import SupplierCategoryInterface from './SupplierCategoryInterface'
import DisplaySupplierCategory from './DisplaySupplierCategory'
import SupplierInterface from './SupplierInterface';
import DisplaySupplier from './DisplaySupplier';
import SupplierProducts from './SupplierProducts'
import DisplaySupplierProducts from './DisplaySupplierProducts'
import Request from './Request'
import DisplayRequest from './DisplayRequest'





export default function ListItems(props){

const handleClick=(v)=>{

    props.setComponent(v)

}

return(
<div>

  <div>
 
    
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="State Interface"  onClick={()=>handleClick(<StateInterface/>)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Display State"  onClick={()=>handleClick(<DisplayState/>)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="City Interface"  onClick={()=>handleClick(<CityInterface/>)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Display City"  onClick={()=>handleClick(<DisplayCity/>)} />
    </ListItem>


    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Hospital Interface"  onClick={()=>handleClick(<HospitalInterface/>)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Display Hospital"  onClick={()=>handleClick(<DisplayHospital/>)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Food Provider Interface"  onClick={()=>handleClick(<FoodProviderInterface/>)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Display Food Provider"  onClick={()=>handleClick(<DisplayFoodProvider/>)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Food Types Interface"  onClick={()=>handleClick(<FoodTypesInterface/>)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Display All FoodTypes"  onClick={()=>handleClick(<DisplayAllFoodTypes/>)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Days Interface"  onClick={()=>handleClick(<DaysInterface/>)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Display All Days"  onClick={()=>handleClick(<DisplayAllDays/>)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Rooms Interface"  onClick={()=>handleClick(<RoomsInterface/>)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Display Rooms"  onClick={()=>handleClick(<DisplayRooms/>)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Room Types Interface"  onClick={()=>handleClick(<RoomTypesInterface/>)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Display Room Types"  onClick={()=>handleClick(<DisplayRoomTypes/>)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
      <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Ngo Interface" onClick={()=>handleClick(<NgoInterface />)} />
    </ListItem> 
     
    <ListItem button>
      <ListItemIcon>
      <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Ngo " onClick={()=>handleClick(<DisplayNgo/>)} />
    </ListItem>


    <ListItem button>
      <ListItemIcon>
      <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Ngo Work Interface" onClick={()=>handleClick(<NgoWorkInterface />)} />
    </ListItem> 
     
    <ListItem button>
      <ListItemIcon>
      <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Ngo work" onClick={()=>handleClick(<DisplayNgoWork/>)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
      <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="News Agency Interface" onClick={()=>handleClick(<NewsAgencyInterface/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List News Agency" onClick={()=>handleClick(<DisplayNewsAgency/>)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
      <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="News" onClick={()=>handleClick(<NewsInterface/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List News" onClick={()=>handleClick(<DisplayNews/>)} />
    </ListItem> 

    <ListItem button>
      <ListItemIcon>
      <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Supplier Category Interface" onClick={()=>handleClick(<SupplierCategoryInterface/>)} />
    </ListItem>



    <ListItem button>
      <ListItemIcon>
      <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Display Supplier Category" onClick={()=>handleClick(<DisplaySupplierCategory/>)} />
    </ListItem>


    <ListItem button>
      <ListItemIcon>
      <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Supplier Interface" onClick={()=>handleClick(<SupplierInterface/>)} />
    </ListItem>



    <ListItem button>
      <ListItemIcon>
      <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Display Supplier" onClick={()=>handleClick(<DisplaySupplier/>)} />
    </ListItem> 

    <ListItem button>
      <ListItemIcon>
      <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Supplier Products" onClick={()=>handleClick(<SupplierProducts/>)} />
    </ListItem> 

    <ListItem button>
      <ListItemIcon>
      <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Display Supplier Products" onClick={()=>handleClick(<DisplaySupplierProducts/>)} />
    </ListItem> 

    <ListItem button>
      <ListItemIcon>
      <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Request Interface" onClick={()=>handleClick(<Request/>)} />
    </ListItem> 

    <ListItem button>
      <ListItemIcon>
      <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Display Request" onClick={()=>handleClick(<DisplayRequest/>)} />
    </ListItem> 


    
  


</div>



  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
  </div>
);
}