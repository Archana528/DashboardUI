import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import '../../App.css'
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import icon from 'leaflet/dist/images/marker-icon.png'
//import redIcon from 'leaflet/dist/images/redPin.jpg'
const LocationMarker = ({latLang, cityBrandList}) => {
  console.log(latLang)
  const greenIcon = L.icon({
    iconUrl: icon, //'./support/qdoba.jpg',
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
  })
  //console.log("inside marker "+latLang)
  //console.log(cityBrandList)
  console.log(cityBrandList)
  const positions = [cityBrandList ? cityBrandList.map(positionsList => {
    //console.log(positionsList)
    return (
      [positionsList.latitude, positionsList.longitude, positionsList]
    )
  }) : null]
  console.log(positions)


  return (
    <MapContainer center={[latLang[0], latLang[1]]} zoom={6} scrollWheelZoom={true} style = {{height:'400px'}}>
    <TileLayer      
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {positions ? positions[0].map(position => {
      //console.log(position)  
      return (
      <Marker position={[position[0], position[1]]} icon={greenIcon} >         
        <Popup>
                <h3> Brands </h3>
        </Popup>
      </Marker>)
      
    }) : null }   
      </MapContainer>
  )    
}

export default  LocationMarker
