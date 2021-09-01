import { useEffect, useState } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Button, Container, Icon } from "semantic-ui-react"

import pick from "lodash.pick"

import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react"
import Amplify, { API, graphqlOperation } from "aws-amplify"
import awsConfig from "./aws-exports"

import {
  onCreateList,
  onDeleteList,
  onUpdateList,
  onUpdateTool,
} from "./graphql/subscriptions"

import { listTools, listToolTypes } from "./graphql/queries"
import { updateTool } from "./graphql/mutations"

import MainHeader from "./components/headers/MainHeader"
import ListItems from "./ListItems"

import Table01 from "./components/Table01/Table01"
import Table02 from "./components/Table02/Table02"

import "semantic-ui-css/semantic.min.css"
import "./App.css"

Amplify.configure(awsConfig)

const getDummyData = () => {
  return [{ name: "foo", id: 99 }]
}

function Main() {
  const [rowData, setRowData] = useState(getDummyData)
  const [toolTypes, setToolTypes] = useState([])

  useEffect(() => {
    fetchList()
    fetchToolTypes()
  }, [])

  async function fetchList() {
    const { data } = await API.graphql(graphqlOperation(listTools))
    setRowData(data?.listTools?.items || [])
  }

  async function fetchToolTypes() {
    const { data } = await API.graphql(graphqlOperation(listToolTypes))
    console.log("data", data) // zzz
    setToolTypes(data?.listToolTypes?.items || [])
  }

  useEffect(() => {
    // const createListSub = API.graphql(graphqlOperation(onCreateList)).subscribe(
    //   {
    //     next: ({ _, value }) => {
    //       dispatch({ type: "UPDATE_LISTS", value: [value.data.onCreateList] })
    //     },
    //   }
    // )
    const updateToolSub = API.graphql(graphqlOperation(onUpdateTool)).subscribe(
      {
        next: ({ _, value }) => {
          console.log("value", value) // zzz
          fetchList()
          // dispatch({
          //   type: "UPDATE_LIST_RESULT",
          //   value: value.data.onUpdateList,
          // })
        },
      }
    )
    // const deleteListSub = API.graphql(graphqlOperation(onDeleteList)).subscribe(
    //   {
    //     next: ({ _, value }) => {
    //       dispatch({
    //         type: "DELETE_LIST_RESULT",
    //         value: value.data.onDeleteList.id,
    //       })
    //     },
    //   }
    // )
    return () => {
      // createListSub.unsubscribe()
      // deleteListSub.unsubscribe()
      updateToolSub.unsubscribe()
    }
  }, [])

  const getToolTypes = () => {
    let toolTypes
    setToolTypes((currentState) => {
      // Do not change the state by getting the updated state
      toolTypes = currentState
      return currentState
    })
    return toolTypes
  }
  const onCellEditted = async (component) => {
    const cell = component._cell
    // if (!cell) {
    //   return
    // }

    const { row } = cell

    console.log("row", row) // zzz
    const rowData = row.data
    const newData = pick(rowData, ["id", "name", "description"])
    const type = getToolTypeId(rowData.type)
    console.log("type", type) // zzz
    newData.toolTypeId = type
    console.log("newData", newData) // zzz

    API.graphql(graphqlOperation(updateTool, { input: newData }))
  }

  const toolTypeNames = {}
  toolTypes.forEach((item) => {
    if (item.name) {
      toolTypeNames[item.name] = item.name
    }
  })

  const getToolTypeId = (name) => {
    const toolTypes = getToolTypes()
    console.log("toolTypes", toolTypes) // zzz
    const item = toolTypes.find((item) => item.name === name)
    console.log("item", item) // zzz
    // return item
    return item.id
  }

  const table01Props = {
    toolTypes: toolTypes,
    toolTypeNames: toolTypeNames,
  }

  return (
    <AmplifyAuthenticator>
      <Container style={{ height: "100vh" }}>
        <AmplifySignOut />
        <Button
          className="floatingButton"
          // onClick={() => dispatch({ type: "OPEN_MODAL" })}
        >
          <Icon name="plus" className="floatingButton_icon" />
        </Button>
        <div className="App">
          <MainHeader />

          <BrowserRouter>
            <Switch>
              <Route
                path="/list/:slug"
                render={(props) => {
                  return (
                    <ListItems
                      {...rowData.filter(
                        (i) => i.slug === props.match.params.slug
                      )[0]}
                    />
                  )
                }}
              />
              <Route path="/">
                <Table01
                  rowData={rowData}
                  onCellEditted={onCellEditted}
                  {...table01Props}
                />
                <Table02 rowData={rowData} onCellEditted={onCellEditted} />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </Container>
      {/* <ListModal state={state} dispatch={dispatch} /> */}
    </AmplifyAuthenticator>
  )
}

export default Main
