import React, { useState } from "react";

const Login = () => {


  let [num, setNum] = useState(200);

  const handleCountNumber = () => {

    setNum((prev)=>{
        console.log(prev, ">>>>>>>>>");
        return prev+1
       
    });
    console.log(num);
  };

  return (
    <div>
      <button onClick={handleCountNumber}>{num}</button>
    </div>
  );
};

export default Login;
