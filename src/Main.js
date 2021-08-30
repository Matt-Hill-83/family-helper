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

import { listTools } from "./graphql/queries"
import { updateTool } from "./graphql/mutations"

import MainHeader from "./components/headers/MainHeader"
import Lists from "./components/Lists/Lists"
import ListItems from "./ListItems"
import ListModal from "./components/modals/ListModal"
import Table01 from "./components/Table01/Table01"

import "semantic-ui-css/semantic.min.css"
import "./App.css"

Amplify.configure(awsConfig)

const getDummyData = () => {
  return [{ name: "foo", id: 99 }]
}

function Main() {
  const [rowData, setRowData] = useState(getDummyData)

  useEffect(() => {
    fetchList()
  }, [])

  async function fetchList() {
    const { data } = await API.graphql(graphqlOperation(listTools))
    setRowData(data?.listTools?.items || [])
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

  const onCellEditted = async (component) => {
    const cell = component._cell
    if (!cell) {
      return
    }

    const { row } = cell
    const rowData = row.data
    const newData = pick(rowData, ["id", "name", "description"])

    API.graphql(graphqlOperation(updateTool, { input: newData }))
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
                <Table01 rowData={rowData} onCellEditted={onCellEditted} />
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
