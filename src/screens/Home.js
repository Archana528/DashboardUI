import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
import SelectCity from "./cardItems/BrandSelection";
import ShowMapView from "./cardItems/ShowMapView";
import ProdPriceTable from "./cardItems/ProdPriceTable";
import CategoryPriceTable from "./cardItems/CategoryPriceTable";
import Header from "../components/Header";
import "../App.css";
import "../assets/css/styles.css";
//mport CardAction from '@components/card-actions'

const Home = () => {
	const [cityList, setCityList] = useState("open");
	const [city, setCity] = useState("open");
	console.log(city.toString());

	return (
		<div style={{width:'100%', alignContent:"center"}}>      
      <Header/>    
      <Card className="selectionCard">
        <CardHeader>
          <CardTitle className="headingAlign">Select Your Market </CardTitle>
        </CardHeader>
        <CardBody>
          <SelectCity setCityList={setCityList} setCity={setCity} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className=""></CardTitle>
        </CardHeader>
        <CardBody>
          <ShowMapView cityList={cityList} city={city} setCity={setCity} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="headingAlign">Category Price Comparison</CardTitle>
        </CardHeader>
        <CardBody>
          <CategoryPriceTable city={city}  cityList={cityList}/>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="headingAlign">Product Price Comparison</CardTitle>
        </CardHeader>
        <CardBody>
          <ProdPriceTable city={city} />
        </CardBody>
      </Card>
      	
		</div>
	);
};

export default Home;
