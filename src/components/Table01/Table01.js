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

const data1 = [
  {
    id: 1,
    name: "Oli Bob",
    description: "12",
    location: "red",
    qty: "01/01/1980",
    user: 5,
    type: true,
    pets: ["cat", "dog"],
  },
  {
    id: 2,
    name: "Oli Bob",
    description: "12",
    location: "red",
    qty: "01/01/1980",
    user: 5,
    type: true,
    pets: ["cat", "dog"],
  },
  {
    id: 3,
    name: "Oli Bob",
    description: "12",
    location: "red",
    qty: "01/01/1980",
    user: 5,
    type: true,
    pets: ["cat", "dog"],
  },
  {
    id: 4,
    name: "Oli Bob",
    description: "12",
    location: "red",
    qty: "01/01/1980",
    user: 5,
    type: true,
    pets: ["cat", "dog"],
  },
  {
    id: 5,
    name: "Oli Bob",
    description: "12",
    location: "red",
    qty: "01/01/1980",
    user: 5,
    type: true,
    pets: ["cat", "dog"],
  },
  {
    id: 6,
    name: "Oli Bob",
    description: "12",
    location: "red",
    qty: "01/01/1980",
    user: 5,
    type: true,
    pets: ["cat", "dog"],
  },
]
console.log("data1", data1) // zzz
function Table01(props) {
  const { lists } = props
  console.log("lists", lists) // zzzf
  const [data, setData] = useState(data1)

  const [selectedName, setSelectedName] = useState("test")

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  const columns = [
    { title: "Name", field: "name", width: 150 },
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
