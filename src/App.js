import React, { useEffect, useState } from "react"

import Amplify, { API, graphqlOperation } from "aws-amplify"

import "semantic-ui-css/semantic.min.css"
import { Button, Container, Icon } from "semantic-ui-react"

import awsConfig from "./aws-exports"
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react"
import { listLists } from "./graphql/queries"
import MainHeader from "./components/headers/MainHeader"

Amplify.configure(awsConfig)

function App() {
  const [list, setlist] = useState([])

  async function fetchList() {
    console.log("fetch list") // zzz
    const test = await API.graphql(graphqlOperation(listLists)).catch(
      (error) => console.log("error", error) // zzz
    )
    console.log("test", test) // zzz
    // const { data } = await API.graphql(graphqlOperation(listLists))
    // console.log("data", data) // zzz
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <AmplifyAuthenticator>
      <AmplifySignOut />

      <div className="App">
        <MainHeader />
        test
      </div>
    </AmplifyAuthenticator>
  )
}

export default App
