import { AllCommunityModule } from 'ag-grid-community';
import { AgGridProvider } from 'ag-grid-react';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';


const SimpleDataTable: React.FC<{ data: any[] }> = ({ data }) => {
  const modules = [AllCommunityModule];

  // Row Data: The data to be displayed.
  // const [rowData, setRowData] = useState([
  //   { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  //   { make: "Ford", model: "F-Series", price: 33850, electric: false },
  //   { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  // ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState<any[]>([
    { field: "name" },
    { field: "age" },
    { field: "city" },
    { field: "state" },
    { field: "pincode" },
    { field: "profession" }
  ]);



  return (
    <AgGridProvider modules={modules}>
      <div style={{ height: 200, width:700 }}>
        <AgGridReact
          rowData={data}
          columnDefs={colDefs}
          pagination
          paginationPageSize={20}
          rowDragEntireRow
          rowDragManaged
        />
      </div>
    </AgGridProvider>
  );
};

export default SimpleDataTable;
