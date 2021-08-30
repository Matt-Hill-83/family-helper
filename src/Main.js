import { useEffect, useReducer, useState } from "react"
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
} from "./graphql/subscriptions"

import { listTools } from "./graphql/queries"
import { updateTool, updateToolType } from "./graphql/mutations"

import MainHeader from "./components/headers/MainHeader"
import Lists from "./components/Lists/Lists"
import ListItems from "./ListItems"
import ListModal from "./components/modals/ListModal"
import Table01 from "./components/Table01/Table01"

import "semantic-ui-css/semantic.min.css"
import "./App.css"

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
//       return state
//   }
// }

// async function deleteListById(id) {
//   const result = await API.graphql(
//     graphqlOperation(deleteList, { input: { id } })
//   )
// }

const getDummyData = () => {
  return [{ name: "foo", id: 99 }]
}

function Main() {
  // const [state, dispatch] = useReducer(listReducer, intialState)

  const [test, setTest] = useState(getDummyData)

  async function fetchList() {
    const { data } = await API.graphql(graphqlOperation(listTools))

    const freshList = data.listTools.items
    setTest(freshList)
  }

  useEffect(() => {
    fetchList()
  }, [])

  // useEffect(() => {
  //   const createListSub = API.graphql(graphqlOperation(onCreateList)).subscribe(
  //     {
  //       next: ({ _, value }) => {
  //         dispatch({ type: "UPDATE_LISTS", value: [value.data.onCreateList] })
  //       },
  //     }
  //   )
  //   const updateListSub = API.graphql(graphqlOperation(onUpdateList)).subscribe(
  //     {
  //       next: ({ _, value }) => {
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
    // setTest([...component])
  }

  const onCellEditted = async (component, oldData) => {
    if (!component) {
      return
    }

    const cell = component._cell
    if (!cell) {
      return
    }

    const { row } = cell
    const rowData = row.data
    const newData = pick(rowData, ["id", "name", "description"])

    await API.graphql(graphqlOperation(updateTool, { input: newData }))
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
                      {...test.filter(
                        (i) => i.slug === props.match.params.slug
                      )[0]}
                    />
                  )
                }}
              />
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
