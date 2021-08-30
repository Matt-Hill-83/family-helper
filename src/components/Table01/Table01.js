import React, { useEffect, useRef, useState } from "react"
import "./styles.css"

import "react-tabulator/lib/styles.css" // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css" // use Theme(s)

// import DateEditor from "react-tabulator/lib/editors/DateEditor"
// import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter"
// import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";

import { ReactTabulator } from "react-tabulator"

const Table01 = (props) => {
  const [data, setData] = useState([])
  const { onCellEditted } = props

  useEffect(() => {
    setData(props.rowData)
  }, [props.rowData])

  const tableRef = useRef(null)

  const onCellEditted2 = (newData) => {
    // const tableData = tableRef?.current?.state?.data || []
    onCellEditted(newData)
  }

  const transformData = ({ data = [] }) => {
    const output = []
    data.forEach((row) => {
      const newRow = { ...row }
      newRow.type = newRow.type === null ? "none" : newRow.type
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

  const transformedData = transformData({ data })

  const options = {
    // height: 150,
    movableRows: true,
    cellEdited: onCellEditted2,
  }

  return (
    <div>
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
