import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Leftside from '../FormatComponents/LeftSide/Leftside';
import Rightside from '../FormatComponents/RightSide/Rightside';


function HomeComponent() {

  const navigate = useNavigate();
  useEffect(() => {
    if (!(localStorage.getItem('token'))) {
      navigate('/unauthorize');
    }

  }, []);

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

export default HomeComponent