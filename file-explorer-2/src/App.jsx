import { useState } from "react"

import { useStoreContext } from "./StoreContext/StoreContext"
import FileExplorer from "./Components/FileExplorer"

const App=()=>{
  const {nodes}= useStoreContext()
  const id=1
  

  return <div className="ml-5 mt-5">
    <FileExplorer id={id}/>
  </div>
}

export default App;