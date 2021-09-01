import React, { useEffect, useRef, useState } from "react"
import css from "./Table01.module.scss"

import "react-tabulator/lib/styles.css" // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css" // use Theme(s)

// import DateEditor from "react-tabulator/lib/editors/DateEditor"
// import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter"
// import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";

import { ReactTabulator } from "react-tabulator"

const Table01 = (props) => {
  const [data, setData] = useState([])
  const { onCellEditted, toolTypes } = props
  // const { onCellEditted, toolTypes, toolTypeNames } = props

  useEffect(() => {
    setData(props.rowData)
  }, [props.rowData])

  const transformData = ({ data = [] }) => {
    const output = []
    data.forEach((row) => {
      const newRow = { ...row }
      newRow.type = newRow.type === null ? "" : newRow?.type?.name
      output.push(newRow)
    })
    return output
  }

  const toolTypeNames = {}
  toolTypes.forEach((item) => {
    if (item.name) {
      toolTypeNames[item.name] = item.name
    }
  })

  // const toolTypeNames = {
  //   "": "&nbsp;",
  //   red: "red",
  //   green: "green",
  //   yellow: "yellow",
  // }

  const editableColumns = [
    // {
    //   title: "Type",
    //   field: "type",
    //   hozAlign: "left",
    //   editor: "input",
    //   headerFilter: "input",
    // },
    {
      title: "Type",
      field: "type",
      editor: "select",
      editorParams: {
        allowEmpty: true,
        showListOnEmpty: true,
        values: toolTypeNames,
      },
      headerFilter: "select",
      headerFilterParams: { values: toolTypeNames },
    },
    {
      title: "Name",
      field: "name",
      // width: 150,
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
  ]

  const transformedData = transformData({ data })

  const options = {
    // height: 150,
    movableRows: true,
    cellEdited: (newData) => onCellEditted(newData),
  }

  return (
    <div className={css.main}>
      <ReactTabulator
        options={options}
        columns={editableColumns}
        data={transformedData}
      />
    </div>
  )
}

export default Table01
