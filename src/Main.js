import { cloneElement, useEffect, useReducer, useState } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Button, Container, Icon } from "semantic-ui-react"

import clone from "lodash.clone"

import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react"
import Amplify, { API, graphqlOperation } from "aws-amplify"
import awsConfig from "./aws-exports"

import pick from "lodash.pick"

import {
  onCreateList,
  onDeleteList,
  onUpdateList,
} from "./graphql/subscriptions"
import { listLists, listTools } from "./graphql/queries"
import {
  deleteList,
  updateList,
  updateTool,
  updateToolType,
} from "./graphql/mutations"

import MainHeader from "./components/headers/MainHeader"
import Lists from "./components/Lists/Lists"
import ListItems from "./ListItems"
import ListModal from "./components/modals/ListModal"

import "semantic-ui-css/semantic.min.css"
import "./App.css"
import Table01 from "./components/Table01/Table01"
import MyMUITable01 from "./components/MyMUITable01/MyMUITable01"
import MyMUIDataGrid01 from "./components/MyMUIDataGrid01/MyMUIDataGrid01"

Amplify.configure(awsConfig)

// const intialState = {
//   id: "",
//   title: "",
//   description: "",
//   lists: [],
//   isModalOpen: false,
//   modalType: "",
// }

// function listReducer(state = intialState, action) {
//   let newList

//   switch (action.type) {
//     case "DESCRIPTION_CHANGED":
//       return { ...state, description: action.value }
//     case "TITLE_CHANGED":
//       return { ...state, title: action.value }
//     case "UPDATE_LISTS":
//       return { ...state, lists: [...action.value, ...state.lists] }
//     case "OPEN_MODAL":
//       return { ...state, isModalOpen: true, modalType: "add" }
//     case "CLOSE_MODAL":
//       return {
//         ...state,
//         isModalOpen: false,
//         title: "",
//         description: "",
//         id: "",
//       }
//     case "DELETE_LIST":
//       console.log(action.value)
//       deleteListById(action.value)
//       return { ...state }
//     case "DELETE_LIST_RESULT":
//       newList = state.lists.filter((item) => item.id !== action.value)
//       return { ...state, lists: newList }
//     case "UPDATE_LIST_RESULT":
//       const index = state.lists.findIndex((item) => item.id === action.value.id)
//       newList = [...state.lists]
//       delete action.value.listItems
//       newList[index] = action.value
//       return { ...state, lists: newList }
//     case "EDIT_LIST": {
//       const newValue = { ...action.value }
//       delete newValue.children
//       delete newValue.listItems
//       delete newValue.dispatch
//       console.log(newValue)
//       return {
//         ...state,
//         isModalOpen: true,
//         modalType: "edit",
//         id: newValue.id,
//         title: newValue.title,
//         description: newValue.description,
//       }
//     }
//     default:
//       console.log("Default action for: ", action)
//       return state
//   }
// }

// async function deleteListById(id) {
//   const result = await API.graphql(
//     graphqlOperation(deleteList, { input: { id } })
//   )
//   console.log("deleted", result)
// }

const getDummyData = () => {
  console.log("getDummyData+++++++++++++++++++++++++++++++++++++++++") // zzz
  return [{ name: "foo", id: 99 }]
}

function Main() {
  // const [state, dispatch] = useReducer(listReducer, intialState)

  const [test, setTest] = useState(getDummyData)
  console.log(
    "--------------------------------------test---------main Render",
    test
  ) // zzz

  async function fetchList() {
    console.log("fetchList--------------------------------------") // zzz
    // const { data } = await API.graphql(graphqlOperation(listLists))
    // dispatch({ type: "UPDATE_LISTS", value: data.listLists.items })

    const { data } = await API.graphql(graphqlOperation(listTools))

    // dispatch({ type: "UPDATE_LISTS", value: data.listTools.items })
    const freshList = data.listTools.items
    console.log("freshList", freshList) // zzz
    setTest(freshList)
  }

  useEffect(() => {
    fetchList()
  }, [])

  // useEffect(() => {
  //   const createListSub = API.graphql(graphqlOperation(onCreateList)).subscribe(
  //     {
  //       next: ({ _, value }) => {
  //         console.log("onCreateList called")
  //         dispatch({ type: "UPDATE_LISTS", value: [value.data.onCreateList] })
  //       },
  //     }
  //   )
  //   const updateListSub = API.graphql(graphqlOperation(onUpdateList)).subscribe(
  //     {
  //       next: ({ _, value }) => {
  //         console.log("onUpdateList called", value)
  //         dispatch({
  //           type: "UPDATE_LIST_RESULT",
  //           value: value.data.onUpdateList,
  //         })
  //       },
  //     }
  //   )
  //   const deleteListSub = API.graphql(graphqlOperation(onDeleteList)).subscribe(
  //     {
  //       next: ({ _, value }) => {
  //         console.log("onDeleteList called")
  //         dispatch({
  //           type: "DELETE_LIST_RESULT",
  //           value: value.data.onDeleteList.id,
  //         })
  //       },
  //     }
  //   )
  //   return () => {
  //     createListSub.unsubscribe()
  //     deleteListSub.unsubscribe()
  //     updateListSub.unsubscribe()
  //   }
  // }, [])

  const cloneData = (data) => {
    return data.map((item) => {
      return { ...item }
    })
  }
  const clonedData = test
  // const clonedData = cloneData(test)

  const onDataChanged = async (component, oldData) => {
    // console.log("-------DC----------------oldData", oldData) // zzz
    // console.log("-------DC----------------component", component) // zzz
    // console.log("-------DC----------------test", test) // zzz
    // setTest([...component])
  }

  const onCellEditted = async (component, oldData) => {
    console.log("component", component) // zzz
    if (!component) {
      return
    }
    const cell = component._cell
    console.log("cell", cell) // zzz
    if (!cell) {
      return
    }
    console.clear()

    const { row, column } = cell
    console.log("row", row) // zzz

    console.log("-------CE----------------oldData", oldData) // zzz
    console.log("-------CE----------------component", component) // zzz

    const rowData = row.data
    const { id, name, description } = rowData
    const newData = pick(rowData, ["id", "name", "description"])
    console.log("newData", newData) // zzz

    const result = await API.graphql(
      graphqlOperation(updateTool, { input: newData })
    )
    console.log("result", result) // zzz
  }

  console.log("+_+_+_test", test) // zzz

  return (
    <AmplifyAuthenticator>
      <Container style={{ height: "100vh" }}>
        <AmplifySignOut />
        {/* <Button
          className="floatingButton"
          onClick={() => dispatch({ type: "OPEN_MODAL" })}
        >
          <Icon name="plus" className="floatingButton_icon" />
        </Button> */}
        <div className="App">
          <MainHeader />

          <BrowserRouter>
            <Switch>
              {/* <Route
                path="/list/:slug"
                render={(props) => {
                  return (
                    <ListItems
                      {...state.lists.filter(
                        (i) => i.slug === props.match.params.slug
                      )[0]}
                    />
                  )
                }}
              /> */}
              <Route path="/">
                <Table01
                  rowData={test}
                  onCellEditted={onCellEditted}
                  onDataChanged={onDataChanged}
                />
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
