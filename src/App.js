import React, { useState, useEffect } from "react";
import "./App.css";
import MaterialTable from "material-table";
import * as XLSX from "xlsx";   //when the import is not exported default
import Chart from "./components/Chart";
// import {BrowserRouter as Router, Link} from 'react-router-dom';
// import { Button } from "@material-ui/core";
// import  {browserHistory}  from 'react-router';
// import { createBrowserHistory } from 'history'



const EXTENSIONS=['xlsx','xls','csv']

function App() {
  const [colDefs, setColDefs] = useState();
  const [data, setData] = useState();

  const datediffer = (checkoutTime, checkinTime) => {
    //
    if(checkinTime && checkoutTime == "-"){
      return "-"
    }

    return (Math.random() * (12 - 9) + 9).toFixed(2);
  }

  const getExtension= (file)=> {
    const parts = file.name.split('.')
    const extension = parts[parts.length-1]
    return EXTENSIONS.includes(extension)
  }

  const convertToJson = (headers,data) =>{
    const rows=[]
    data.forEach(row => {
      let rowData={}
      row.forEach((element,index)=>{
        rowData[headers[index]] = element;
      })
      rows.push(rowData);
    });
    rows.map(r => {
      r.diff = datediffer(r["First-In"],r["Last-Out"])
    })
    console.log("rows in map", rows)
    return rows;
  }

  const importExcel = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      //parse data

      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, { type: "binary" });

      //getting first sheet
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];

      //covert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      // console.log(fileData);
      const headers = fileData[0]
      // const heads= headers.map(head=>({title:head,field:head}))
      // setColDefs(heads);
      
      //removing header
      fileData.splice(0,1)
      setData(convertToJson(headers,fileData));

    
      console.log(fileData);
    };
    if(file){
      if(getExtension(file)){
        reader.readAsBinaryString(file);
      }
      else{
        alert("Invalid file Input, Select Excel, CSV Files")
      }
    }else{
      setData([])
      setColDefs([])
    }
  };

  // class App extends Component
  console.log("data>>>>", data)
  return (
    <div className="App">
      <h1 align="center">Excel File Uploader</h1>
      <h4 align="center">Upload Your File</h4>
      <input type="file" onChange={importExcel} />
      <Chart
        data={data}  
      />
      {/* <Button type="button" onClick={()=>{
       browserHistory.push("/Chart")  */}
      {/* }}>Create-Chart</Button> */}
      
      {/* <MaterialTable title="Excel File Data" data={data} columns={colDefs} /> */}
    </div>
  );
}

export default App;
