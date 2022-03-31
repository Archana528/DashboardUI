import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css'
import allStates from '../../assets/statesTitle'

export default function SelectCity({setCityList, setCity}) {  
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState([])
  const [data, setData] = useState([])
  const [state, setState] = useState("")
  const states = allStates.states
  let citiesInState = []
  

  useEffect(() => {
    console.log("before fetchdata")    
    fetch("http://localhost:3000/data/locations",  {mode:'cors'})
    .then(response => response.json())
    .then(responseJson => {  
      //console.log(responseJson)    
      setData(responseJson)
         
    })
   
    setCityList(data)  
    
    //console.log(data)
  }, [])
  

   // eslint-disable-next-line  
  /*useEffect( () => {   
    if (allCities) {
      setCities(allCities)
      setCityList(allCities)  
    }   
  }, [])*/
  //console.log(allCities) 

  const handleStateChange = (selectedState) => {
   setSelectedCity("Select...")
    console.log("Inside handle state change" + cities)  
   
    data.map(row => {   
     
      if (row.state === selectedState.value) {
        console.log(row.state + "*****************" + row.city)      
        console.log(selectedState.value)      
        citiesInState = [...citiesInState,       
          {
            label : row.city,
            value : row.location_id,
            latLang : [row.latitude, row.longitude]         
          }
        ] 
      }
      setState(selectedState.value)
      
    })
    setCities(citiesInState)
    setCityList(data)
    console.log(state)
    setCity({flag:true, state:selectedState.value, value:"", })
    console.log(cities)
  }

  const handleCityChange = (selectedC) => {  
    setSelectedCity(selectedC)  
    console.log(selectedCity)
    selectedC.flag = true
    selectedC.state = state        
    console.log(selectedC)
    setCity(selectedC)
  }  

  return (
  <div style={{display: "flex", alignContent:'space-around'}}>
    <div style={ { width:"50%", padding:"10px", zIndex:1000} }>
      <label className="selectionLabel">{ "State:  " }</label>
      <Select options={ states } onChange = {handleStateChange}/>      
    </div>
    <div style={ { width:"50%", padding:"10px", zIndex:1000 } }>
      <label className="selectionLabel">{ "City: " }</label>
      <Select value={selectedCity}  options={ cities } onChange = {handleCityChange}/>  
    </div>
    
  </div>
  )
}
