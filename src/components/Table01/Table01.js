import React, { useEffect, useRef, useState } from "react"
import "./styles.css"

import "react-tabulator/lib/styles.css" // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css" // use Theme(s)

import DateEditor from "react-tabulator/lib/editors/DateEditor"
import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter"
// import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";

import { ReactTabulator, reactFormatter } from "react-tabulator"

import { createList, createTool, updateList } from "../../graphql/mutations"

import { API, graphqlOperation } from "aws-amplify"

function SimpleButton(props) {
  const rowData = props.cell._cell.row.data
  const cellValue = props.cell._cell.value || "Edit | Show"
  return <button onClick={() => alert(rowData.name)}>{cellValue}</button>
}

const Table01 = (props) => {
  const [data, setData] = useState([])

  const { onCellEditted, onDataChanged, onChangeRow } = props

  console.log("data", data) // zzz

  useEffect(() => {
    setData(props.lists)
    console.log(
      "props.lists----------------------------------------",
      props.lists
    ) // zzz
  }, [props.lists])
  const tableRef = useRef(null)

  const onDataChanged2 = (newData) => {
    console.log("newData", newData) // zzz
    onDataChanged(newData, data)
  }

  const onCellEditted2 = (newData) => {
    const tableData = tableRef?.current?.state?.data || []
    onCellEditted(newData, tableData)

    console.log("onCellEditted", newData) // zzz
    console.log("tableData", tableData) // zzz
  }

  const options = {
    // height: 150,
    // movableRows: true,
    dataChanged: onDataChanged2,
    // onChangeRow: onChangeRow2,
    cellEdited: (newData) => onCellEditted2(newData),
  }

  const transformData = ({ data = [] }) => {
    const output = []
    data.forEach((row) => {
      const newRow = { ...row }
      newRow.type = newRow.type === null ? "test" : newRow.type
      output.push(newRow)
    })
    return output
  }

  const editableColumns = [
    {
      title: "Name",
      field: "name",
      width: 150,
      editor: "input",
      headerFilter: "input",
    },
    {
      title: "Type",
      field: "type",
      hozAlign: "left",
      formatter: "progress",
      editor: "progress",
    },
  ]

  const transformedData = [...data]
  // const transformedData = transformData({ data: lists })
  console.log("transformedData", transformedData) // zzz

  console.log("tableRef", tableRef) // zzz

  return (
    <div>
      <button
        onClick={(newData) => onCellEditted(newData)}
        // dataChanged={(newData) => console.log("dataChanged", newData)}
      />
      <ReactTabulator
        ref={tableRef}
        options={options}
        columns={editableColumns}
        data={transformedData}
      />
    </div>
  )
}

export default Table01
