import React, { useEffect, useState } from "react"

import Amplify, { API, graphqlOperation } from "aws-amplify"

import "semantic-ui-css/semantic.min.css"
import { Button, Container, Icon } from "semantic-ui-react"

import awsConfig from "./aws-exports"
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react"
import { listLists } from "./graphql/queries"
import MainHeader from "./components/headers/MainHeader"
import ListItems from "./ListItems"
import Lists from "./components/Lists/Lists"

Amplify.configure(awsConfig)

function App() {
  const [lists, setLists] = useState([])

  async function fetchList() {
    console.log("fetch list") // zzz
    const data = await API.graphql(graphqlOperation(listLists)).catch(
      (error) => console.log("error", error) // zzz
    )
    console.log("data", data) // zzz
    const lists = data?.data?.listLists?.items || []
    console.log("lists", lists) // zzz
    setLists(lists)
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <AmplifyAuthenticator>
      <AmplifySignOut />

      <div className="App">
        <MainHeader />
        <Lists lists={lists} />
      </div>
    </AmplifyAuthenticator>
  )
}

export default App
