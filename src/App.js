import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headNmae: 'Make',
          field: 'make',
          sortable: true,
          filter: true,
          // checkboxSelection: true,
        },
        { headNmae: 'Model', field: 'model', sortable: true, filter: true },
        { headNmae: 'Price', field: 'price', sortable: true, filter: true },
      ],
      // rowData: [
      //   { make: "Toyota", model: "Celica", price: 35000 },
      //   { make: "Fort", model: "Mondeo", price: 32000 },
      //   { make: "Porsche", model: "Boxter", price: 35000 },
      // ],
      rowData: null,
    };
  }

  fetchApi() {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then((res) => res.json())
      .then((rowData) => {
        this.setState({ rowData });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.fetchApi();
  }

  onButtonClick() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => node.make + ' ' + node.model)
      .join(',');
    alert(`Selected nodes: ${ selectedDataStringPresentation }`);
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={ {
          width: '600px',
          height: '600px',
        } }
      >
        <button onClick={ () => this.onButtonClick }>Fetch Api</button>
        <AgGridReact
          columnDefs={ this.state.columnDefs }
          rowData={ this.state.rowData }
          rowSelection="multiple"
          onGridReady={ (params) => (this.gridApi = params.api) }
        />
      </div>
    );
  }
}

export default App;
