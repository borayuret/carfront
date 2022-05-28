import React, { Component } from "react";
import { SERVER_URL } from "../constants.js";

import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

class Carlist extends Component {
  constructor(props) {
    super(props);
    this.state = { arabalar: [] };
  }

  componentDidMount() {
    this.fetchCars();
  }

  fetchCars = () => {

    fetch(SERVER_URL + "/api/car")
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          arabalar: responseData._embedded.car,
        });
      })
      .catch((err) => console.error(err));

  }

  onDelClick = (link) => {
    fetch(link, {method: 'DELETE'})
    .then(res => this.fetchCars())
    .catch(err => console.error(err))
   }

  render() {

    const columns = [
      {
        Header: "Brand",
        accessor: "brand",
      },
      {
        Header: "Model",
        accessor: "model",
      },
      {
        Header: "Color",
        accessor: "color",
      },
      {
        Header: "Year",
        accessor: "year",
      },
      {
        Header: "Kayıt No",
        accessor: "registerNumber",
      },
      {
        Header: "Price €",
        accessor: "price",
      },
      {
        id: 'delbutton',
        sortable: false,
        filterable: false,
        width: 100,
        accessor: '_links.self.href',
        Cell: ({value}) => (<button onClick={()=>{this.onDelClick(value)}}>Delete</button>)
      }
    ];

    return (
      <div className="App">
        <ReactTable data={this.state.arabalar} 
                    columns={columns} 
                    filterable={true}/>


      </div>
    );
  }
}
export default Carlist;
