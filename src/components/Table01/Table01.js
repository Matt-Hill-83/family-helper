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
    age: "12",
    color: "red",
    dob: "01/01/1980",
    rating: 5,
    passed: true,
    pets: ["cat", "dog"],
  },
  {
    id: 2,
    name: "Mary May",
    age: "1",
    color: "green",
    dob: "12/05/1989",
    rating: 4,
    passed: true,
    pets: ["cat"],
  },
  {
    id: 5,
    name: "Margret Marmajuke",
    age: "16",
    color: "yellow",
    dob: "07/01/1999",
    rating: 4,
    passed: false,
  },
  {
    id: 6,
    name: "Van Ng",
    age: "37",
    color: "green",
    dob: "06/10/1982",
    rating: 4,
    passed: true,
    pets: ["dog", "fish"],
  },
  {
    id: 7,
    name: "Duc Ng",
    age: "37",
    color: "yellow",
    dob: "10/10/1982",
    rating: 4,
    passed: true,
    pets: ["dog"],
  },
]

function Table01(props) {
  const [data, setData] = useState(data1)
  const [selectedName, setSelectedName] = useState("test")

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  const columns = [
    { title: "Name", field: "name", width: 150 },
    { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
    { title: "Favourite Color", field: "color" },
    { title: "Date Of Birth", field: "dob" },
    { title: "Rating", field: "rating", hozAlign: "center", formatter: "star" },
    {
      title: "Passed?",
      field: "passed",
      hozAlign: "center",
      formatter: "tickCross",
    },
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

  return (
    <div>
      <ReactTabulator
        columns={columns}
        data={data}
        data-custom-attr="test-custom-attribute"
        options={options}
        className="custom-css-class"
      />
    </div>
  )
}

export default Table01
