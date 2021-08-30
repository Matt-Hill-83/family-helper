import React, { useCallback, useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"

import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator"

export default function MyMUIDataGrid01(props) {
  const { onDataChanged } = props

  const [editRowsModel, setEditRowsModel] = useState({})
  const [rows, setRows] = useState([])

  useEffect(() => {
    setRows(props.rows)
    console.log(
      "props.lists----------------------------------------",
      props.rows
    ) // zzz
  }, [props.rows])

  const handleEditRowsModelChange = useCallback((model) => {
    setEditRowsModel(model)
  }, [])

  const handleCellEditCommit = useCallback((model) => {
    console.log("model-------------", model) // zzz
  }, [])

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          editRowsModel={editRowsModel}
          onEditRowsModelChange={handleEditRowsModelChange}
          onCellEditCommit={handleCellEditCommit}
        />
      </div>
    </div>
  )
}

const columns = [
  { field: "name", headerName: "Name", width: 180, editable: true },
  { field: "age", headerName: "Age", type: "number", editable: true },
  {
    field: "dateCreated",
    headerName: "Date Created",
    type: "date",
    width: 180,
    editable: true,
  },
  {
    field: "lastLogin",
    headerName: "Last Login",
    type: "dateTime",
    width: 220,
    editable: true,
  },
]

const xxxrows = [
  {
    id: 1,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 2,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 3,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 4,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 5,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
]
