import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

import SupplierCategoryInterface from './SupplierCategoryInterface'
import DisplaySupplierCategory from './DisplaySupplierCategory'
import SupplierInterface from './SupplierInterface';
import DisplaySupplier from './DisplaySupplier';
import SupplierProducts from './SupplierProducts'
import DisplaySupplierProducts from './DisplaySupplierProducts'

export default function ListNews(props){

   const handleClick=(v)=>{
       props.setComponent(v)
   } 

    return(
<div>
  <div>

  <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Supplier Category Interface" onClick={()=>handleClick(<SupplierCategoryInterface/>)} />
    </ListItem>



    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Display Supplier Category" onClick={()=>handleClick(<DisplaySupplierCategory/>)} />
    </ListItem>


    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Supplier Interface" onClick={()=>handleClick(<SupplierInterface/>)} />
    </ListItem>



    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Display Supplier" onClick={()=>handleClick(<DisplaySupplier/>)} />
    </ListItem> 

    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Supplier Products" onClick={()=>handleClick(<SupplierProducts/>)} />
    </ListItem> 

    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Display Supplier Products" onClick={()=>handleClick(<DisplaySupplierProducts/>)} />
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