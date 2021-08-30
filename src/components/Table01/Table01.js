import React, { useEffect, useRef, useState } from "react"
import "./styles.css"

import "react-tabulator/lib/styles.css" // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css" // use Theme(s)

// import DateEditor from "react-tabulator/lib/editors/DateEditor"
// import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter"
// import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";

import { ReactTabulator, reactFormatter } from "react-tabulator"

const Table01 = (props) => {
  const [data, setData] = useState([])

  const { onCellEditted } = props

  console.log("data", data) // zzz

  useEffect(() => {
    setData(props.rowData)
  }, [props.rowData])
  const tableRef = useRef(null)

  const onCellEditted2 = (newData) => {
    const tableData = tableRef?.current?.state?.data || []

    console.log("onCellEditted", newData) // zzz
    console.log("tableData", tableData) // zzz

    onCellEditted(newData, tableData)
  }

  const options = {
    // height: 150,
    // movableRows: true,
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
      title: "Description",
      field: "description",
      hozAlign: "left",
      editor: "input",
      headerFilter: "input",
    },
    {
      title: "Location",
      field: "location",
      hozAlign: "left",
      editor: "input",
      headerFilter: "input",
    },
    {
      title: "Type",
      field: "type",
      hozAlign: "left",
      editor: "input",
      headerFilter: "input",
    },
  ]

  const transformedData = [...data]
  // const transformedData = transformData({ data })
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
