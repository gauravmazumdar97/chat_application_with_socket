import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css' // Ensure Bootstrap is globally imported
import Leftside from './component/FormatComponents/LefttSide/Leftside'
import Rightside from './component/FormatComponents/RightSide/Rightside'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-12 col-sm-3 left_side_styles">
          <Leftside />
        </div>
        <div className="col-12 col-sm-9 right_side_styles">
          <Rightside />
        </div>
      </div>
    </div>
  )
}

export default App
