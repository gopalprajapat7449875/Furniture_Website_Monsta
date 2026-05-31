import axios from "axios";

 let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL



  let Componydata=()=>{
     return axios.get(`${apibaseurl}home/compony`)
      .then((res) => res.data)
      .then((finalres) =>finalres)
     
  }

  export {Componydata}