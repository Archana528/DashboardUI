import React from 'react'
import {
  MapContainer,
  TileLayer,
  GeoJSON
} from "react-leaflet"
import statesData from '../../assets/us-states'
import "leaflet/dist/leaflet.css"
import '../../App.css'


const ChoroMapView = ({changeMapFlag}) => {
  const zoomMapView = (e) => {
    console.log(e.latlng)
    const x = e.latlng
    //console.log(x.lng)
    const latLang = [x.lat, x.lng]    
    //const layer = e.target 
    return changeMapFlag(true, latLang)    
  }
  const mapPolygonColorToDensity = (density => {
    return density > 3023 ? '#414C6B' : density > 676 ? '#414C6B' : density > 428  ? '#414C6B' : density > 236 ? '#253D5B' : density > 23 ? '#1E80C1' : '#253D5B'
  })
const style = (feature => {
    return ({
        fillColor: mapPolygonColorToDensity(feature.properties.density),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '2',
        fillOpacity: 0.5
    })
})

const features = statesData.features

const feature = features.map(feature => { return (feature) })

const onEachFeature = (feature, layer) => {
  //console.log(feature)
  layer.on({
      click: zoomMapView
  })
}

  return (
    <MapContainer center={[37.8, -96]} zoom={5} scrollWheelZoom={true} style = {{height:'400px'}}>
      <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
      />
      {feature && (
        <GeoJSON data={feature} style={style} onEachFeature={onEachFeature}/>
        )}
    </MapContainer>
  )
}


export default ChoroMapView
