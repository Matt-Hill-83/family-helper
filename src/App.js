import React from "react"

import Amplify from "aws-amplify"
import awsConfig from "./aws-exports"
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react"

Amplify.configure(awsConfig)

function App() {
  return (
    <AmplifyAuthenticator>
      <AmplifySignOut />

      <div className="App"></div>
    </AmplifyAuthenticator>
  )
}

export default App
