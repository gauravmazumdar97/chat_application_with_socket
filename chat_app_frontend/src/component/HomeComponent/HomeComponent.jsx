import React, {useEffect} from 'react'
import Leftside from '../FormatComponents/LeftSide/Leftside';
import Rightside from '../FormatComponents/RightSide/Rightside';
import LoadingComponent from "../ReusableComponents/LoadingComponent/LoadingComponent";


function HomeComponent() {

  return (

    <div className="container-fluid">
    {/* <LoadingComponent /> */}


    {/* This is the ball that will follow the cursor */}
    <div className="ball"></div>

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

export default HomeComponent