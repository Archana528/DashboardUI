import React, {useEffect, useState} from 'react'
import ChoroMapView from "../../components/map/ChoroMapView"
import LocationMarker from '../../components/map/LocationMarker'
import '../../App.css'


const ShowMapView = ({cityList, city, setCity}) => {
  const [allStates, setAllStates] = useState([])
  //console.log("Inside ShowMapView component")
  //console.log(cityList)
  useEffect(() => {
    setCity(city)
  }, [city])
  function changeMapFlag(mapFlag, latLang) {
    //console.log("inside showMAp " + latLang)    
    setAllStates([mapFlag, latLang])
  }

  //const [mapFlag, setMapFlag] =  useState([]);
  let flag = [] 
  let latLang = []
  console.log(city.flag)
  if (city.latLang === undefined) {
    console.log("City is not defined")
    flag = allStates[0]
    latLang = allStates[1]     
  } else { 
    latLang = city.latLang
    flag = city.flag
  }
 
  if (!flag || flag.length === 0) {
    //console.log("inside true---")
    return (<ChoroMapView mapFlag={flag} changeMapFlag={changeMapFlag}/>)    
  } else {
    //console.log("inside false--" + latLang)
    return (<LocationMarker cityBrandList={cityList} latLang = {latLang} city = {city}/>)
  }

}

export default ShowMapView
