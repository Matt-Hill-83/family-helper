import React, { useEffect, useState } from "react"
import "./styles.css"

import "react-tabulator/lib/styles.css" // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css" // use Theme(s)

import { ReactTabulator, reactFormatter } from "react-tabulator"

function SimpleButton(props) {
  const rowData = props.cell._cell.row.data
  const cellValue = props.cell._cell.value || "Edit | Show"
  return <button onClick={() => alert(rowData.name)}>{cellValue}</button>
}

function Table01(props) {
  const { lists } = props
  console.log("lists", lists) // zzzf
  const [data, setData] = useState([])

  const [selectedName, setSelectedName] = useState("test")

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  const columns = [
    { title: "Name", field: "name", width: 150 },
    { title: "Type", field: "type", width: 150 },
    // { title: "Desc", field: "desc", hozAlign: "left", formatter: "progress" },
    { title: "Desc", field: "description", hozAlign: "left" },
    { title: "Location", field: "location" },
    // { title: "Qty", field: "qty" },
    // { title: "User", field: "user", hozAlign: "center", formatter: "star" },
    // {
    //   title: "Passed?",
    //   field: "type",
    //   hozAlign: "center",
    //   formatter: "tickCross",
    // },
    {
      title: "Custom",
      field: "custom",
      hozAlign: "center",
      editor: "input",
      formatter: reactFormatter(
        <SimpleButton
          onSelect={(name) => {
            setSelectedName(selectedName)
            alert(name)
          }}
        />
      ),
    },
  ]

  const options = {
    // height: 150,
    // movableRows: true,
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

  const transformedData = transformData({ data: lists })
  // const transformedData = transformData({ data: data1 })
  console.log("transformedData", transformedData) // zzz
  return (
    <div>
      <ReactTabulator
        columns={columns}
        data={transformedData}
        // data={data}
        data-custom-attr="test-custom-attribute"
        options={options}
        className="custom-css-class"
      />
    </div>
  )
}

export default Table01
