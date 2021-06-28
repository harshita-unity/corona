import React,{useState,useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table"
import {ServerURL,postDataAndImage,getData,postData} from "./FetchNodeServices";

const useStyles = makeStyles((theme)=>({
    root:{
        justifyContent:'center',
        alignItems:'center',
        display:'flex',
        

    },
    subdiv:{
         width:750,
         marginTop:20,
         padding:10,
         border:'1px solid'
    }
 })
)



export default function Request(props){

    const[list,setList]=useState()

   
     const classes=useStyles()
     const[firstName,setFirstName]=useState('')
     const[lastName,setLastName]=useState('')
     const[patientName,setPatientName]=useState('')
     const[age,setAge]=useState('')
     const[address,setAddress]=useState('')
     const[city,setCity]=useState('')
     const[state,setState]=useState('')
     const [contactNo,setContactNo]=useState('')
     const [emailId,setEmailId]=useState('')
     const[remark,setRemark]=useState('')
     const[blood,setBlood]=useState([])
     const[status,setStatus]=useState('')
     
     const [listCity,setListCity]=useState([])
     const [listState,setListState]=useState([])
  
     const[plasma,setPlasma]=useState("NO")
     const[oxygen,setOxygen]=useState("NO")
     const[hospital,setHospital]=useState("NO")
     const[medical,setMedical]=useState("NO")
     const[ambulance,setAmbulance]=useState("NO")
    

        
          const fetchAllRequest=async()=>{
          var result=await getData("request/displayall")
          setList(result)
          }
          
      
          useEffect(function(){
              fetchAllRequest()
              
          },[])
      
      function displayall() {
          return (
            <div>
            <MaterialTable
              title="List of Request"
              columns={[
                  
                  { title: 'Id', field: 'requestid' },
                  { title: 'Name', field: 'name'},
                  { title: 'Patient Name', field: 'patientname' },
                  { title: 'Age', field: 'age'},
                  { title: 'Address', field:"sname",render:(rowData)=>(<div style={{flexDirection:"column"}}><div>{rowData.address}, {rowData.cname},{rowData.sname}</div></div>) },
                  { title: 'Contact', field: 'contactno',render:(rowData)=>(<div style={{flexDirection:"column"}}><div>{rowData.contactno}, {rowData.emailid}</div></div>) },
                  { title: 'Blood', field: 'blood'},
                  {title: 'Requirement', field: 'plasma',render:(rowData)=>(<div style={{flexDirection:"column"}}><div><div>{rowData.plasma}</div><div>{rowData.oxygen}</div><div>{rowData.hospital}</div><div>{rowData.medical}</div><div>{rowData.ambulance}</div></div></div>)},
                 // { title: 'Plasma', field: 'plasma'},
                 // { title: 'Oxygen', field: 'oxygen'},
                 // { title: 'Hospital', field: 'hospital'},
                 // { title: 'Medical', field: 'medical'},
                 // { title: 'Ambulance', field: 'ambulance'},
                  { title: 'Remark', field: 'remark'},
                  { title: 'Status', field: 'status'},
                          
                 
              ]}
              data={list}        
              
            />
         
            </div>
          )
        }
      
        return(<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
             <div style={{width:1150,marginTop:10,padding:3}}>
      {displayall()}
      </div>
          </div>)
      




















}