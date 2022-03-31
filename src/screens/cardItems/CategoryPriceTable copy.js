/* eslint-disable */
import '../../App.css'
import React, {useEffect, useState} from 'react'
import { PivotViewComponent, Inject, Toolbar, PDFExport, ExcelExport, GroupingBar, PivotChart} from '@syncfusion/ej2-react-pivotview'
//import { ButtonComponent } from '@syncfusion/ej2-react-buttons'


export default function CategoryPriceTable({city}) {  
  const [data, setData] = useState([])
  let pivotObj = ''
  const toolbarOptions =  ['Grid', 'Chart', 'Export']
  const chartTypes = ['Column', 'Bar']
  const chartSettings={ 
    title: 'Category Price Comparison', 
    chartSeries: { type: "Column",  marker: { dataLabel: { visible: true} },} ,
    tooltip: {enable: false },
    primaryXAxis: { title: 'Major Category/ Minor Category' },
    primaryYAxis: { title: 'Average Price' }
  }

 

   

  useEffect(() => {
    //console.log("before fetch data")   
    let url =  "http://localhost:3000/data/summaryall"
    let params  = {
      state : city.state,
      city : city.label
    }
    url += '?' + ( new URLSearchParams( params ) ).toString();
    console.log(url)
    fetch(url,
    {
      mode: 'cors',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(response => response.json())
      .then(responseJson => {
        setData(responseJson)   
        
      })
  }, [city])


const style_css = `
  .e-pivotview .e-headercell {
    text-align: center !important;
  }
`
  const dataSourceSettings = {
    enableSorting: true,
    columns: [{ name: 'brand' }],
    valueSortSettings: { headerDelimiter: ' - ' },
    values: [{ name: 'avg', caption: 'Avg Price', type:'Avg' }, { name: 'min', caption: 'Min price', type:'Min' }, { name: 'max', caption: 'Max Price', type:'Max' }],
    dataSource: data,
    rows: [{ name: 'major_category', caption: "Major Category" }, { name: 'minor_category', caption: "Minor Category" }],
    formatSettings: [{ name: 'avg', format: 'C2' }, { name: 'min', format: 'C2' }, { name: 'max', format: 'C2' }],
    expandAll: false,
    filters: [],
    showGrandTotals: false,
    
  }
  
  return (
    <div className='control-pane'>
      <div className='control-section' style={{ overflow: 'auto' }}>
      <style>{style_css}</style>          
          <div>
            <PivotViewComponent ref={d => pivotObj = d} id='PivotView' dataSourceSettings={dataSourceSettings} 
            width={'100%'} height={"600px"} gridSettings={{columnWidth: 140 }} showTooltip={false} 
            allowExcelExport={true} allowPdfExport={true} chartTypes = {chartTypes} chartSettings = {chartSettings}
            showToolbar={true} toolbar={toolbarOptions} showGroupingBar={false}  displayOption={{ view: 'Both' }} 
            >
              <Inject services={[Toolbar, PDFExport, ExcelExport, GroupingBar, PivotChart]}/>
            </PivotViewComponent>
          </div>
      </div>
    </div>
  )
}


/*
  this.chartSettings = {
            chartSeries: {
                type: 'Column'
            },
            tooltip: {
                enableMarker: true,
                textStyle: { color: '#000' },
                fill: '#FFF',
                opacity: 1,
                border: { color: '#000' }
            }
        };*/
