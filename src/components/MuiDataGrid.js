import React, { useEffect, useMemo, useState } from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { Avatar } from '@mui/material';
import ActionButton from './ActionButton';

const MuiDataGrid = () => {


  const [data, setData] = useState([])
  const [rowId, setRowId] = useState()
  const [singleUser, setSingleUser] = useState({})

  const getFakeData = async () => {
    try {
      const { data } = await axios.get('https://fakestoreapi.com/users', {
        headers: {
          'Content-type': 'application/json'
        }
      })
      setData(data)

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getFakeData()
  }, [])


  var columns = useMemo(() => [
    { field: 'username', headerName: 'User Name', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    { field: 'phone', headerName: 'Phone Number', width: 200, editable: true },
    { field: 'actions', headerName: 'Action', width: 100, editable: true, type: 'actions', renderCell: params => <ActionButton {...{ params, rowId, setRowId }} /> }
  ], [rowId])

  return (
    <div style={{ height: 500, width: '100%' }}>
      <h1 style={{ textAlign: 'center' }}>Users Data</h1>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row.id}
        onCellEditCommit={params => { setRowId(params.id) }}
        
      />
    </div>
  )
}

export default MuiDataGrid
