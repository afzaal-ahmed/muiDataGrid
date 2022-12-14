import React, { useEffect, useState } from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';

const MuiDataGrid = () => {


  const [data, setData] = useState([])
  const [fieldName, setfieldName] = useState([])

  const getFakeData = async () => {
    try {
      const { data } = await axios.get('https://dummyapi.io/data/v1/user', {
        headers: {
          'app-id': '63998bee5a21f6ecea606ca0'
        }
      })
      setData(data.data)
      setfieldName(Object.keys(data.data[0]))

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFakeData()
  }, [])


  var columns: GridColDef[] = fieldName.map((v, i) =>
    ({ field: v, headerName: v, width: 150 })
  )

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid 
      columns={columns} 
      rows={data} 
      getRowId={(row)=> row.id}/>
    </div>
  )
}

export default MuiDataGrid
