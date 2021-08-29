import React, { useEffect, useState } from "react"
import "./styles.css"

import "react-tabulator/lib/styles.css" // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css" // use Theme(s)
import DateEditor from "react-tabulator/lib/editors/DateEditor"
import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter"
// import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";

import "react-tabulator/lib/styles.css" // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css" // use Theme(s)

import { ReactTabulator, reactFormatter } from "react-tabulator"

import { createList, createTool, updateList } from "../../graphql/mutations"

import { API, graphqlOperation } from "aws-amplify"

function SimpleButton(props) {
  const rowData = props.cell._cell.row.data
  const cellValue = props.cell._cell.value || "Edit | Show"
  return <button onClick={() => alert(rowData.name)}>{cellValue}</button>
}

function Table01(props) {
  const { lists } = props
  console.log("lists", lists) // zzzf
  const [data, setData] = useState([...lists])

  const [selectedName, setSelectedName] = useState("test")

  useEffect(() => {
    setData([props.lists])
    console.log("[props.lists]", [props.lists]) // zzz
  }, [props.lists])

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
          onSelect={(props) => {
            setSelectedName(props)
          }}
        />
      ),
    },
  ]

  const options = {
    // height: 150,
    // movableRows: true,
    cellEdited: function (component) {
      const cell = component._cell
      const { value } = cell
      console.log("value", value) // zzz
      const field = cell.column.definition.field
      console.log("field", field) // zzz
    },
    rowUpdated: function (row) {
      console.log("row", row) // zzz
    },
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

  // Editable Example:
  const colorOptions = {
    "": "&nbsp;",
    red: "red",
    green: "green",
    yellow: "yellow",
  }
  const petOptions = [
    { id: "cat", name: "cat" },
    { id: "dog", name: "dog" },
    { id: "fish", name: "fish" },
  ]

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
    {
      title: "Favourite Color",
      field: "color",
      editor: "select",
      editorParams: {
        allowEmpty: true,
        showListOnEmpty: true,
        values: colorOptions,
      },
      headerFilter: "select",
      headerFilterParams: { values: colorOptions },
    },
    {
      title: "Date Of Birth",
      field: "dob",
      sorter: "date",
      editor: DateEditor,
      editorParams: { format: "MM/DD/YYYY" },
    },
    {
      title: "Pets",
      field: "pets",
      sorter: (a, b) => a.toString().localeCompare(b.toString()),
      // editor: MultiSelectEditor,
      editorParams: { values: petOptions },
      formatter: MultiValueFormatter,
      formatterParams: { style: "PILL" },
    },
    {
      title: "Passed?",
      field: "passed",
      hozAlign: "center",
      formatter: "tickCross",
      editor: true,
    },
  ]

  async function changeList({ row }) {
    const { id, title, description } = row
    const result = await API.graphql(
      graphqlOperation(updateList, { input: { id, title, description } })
    )
    // dispatch({ type: "CLOSE_MODAL" })
    console.log("Edit data with result: ", result)
  }

  const transformedData = transformData({ data: lists })
  // const transformedData = transformData({ data: data1 })
  console.log("transformedData", transformedData) // zzz

  return (
    <div>
      {/* <ReactTabulator
        columns={columns}
        data={transformedData}
        // data={data}
        data-custom-attr="test-custom-attribute"
        options={options}
        className="custom-css-class"
      /> */}
      {/* <h3>Editable Table</h3> */}
      <ReactTabulator
        options={options}
        columns={editableColumns}
        data={transformedData}
        footerElement={<span>Footer</span>}
      />
    </div>
  )
}

export default Table01
