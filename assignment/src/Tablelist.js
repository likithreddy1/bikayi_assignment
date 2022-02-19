import React from "react";
export default function List(props){
    console.log(props.filterd[0]['laureates'])
    const Styles={
        color:"red"
    }
    return<>
   { props.filterd[0]['laureates']?
   props.filterd[0].laureates.length>1?props.filterd[0].laureates.map((item)=>{
       return(
        <tr>
        <td>{item.id}</td>
        <td>{item.firstname}</td>
        <td>{item.surname}</td>
        <td>{item.motivation}</td>
        <td>{item.share}</td>
      </tr>
       )
   }):<tr>
    <td>{props.filterd[0].laureates[0].id}</td>
    <td>{props.filterd[0].laureates[0].firstname}</td>
    <td>{props.filterd[0].laureates[0].surname}</td>
    <td>{props.filterd[0].laureates[0].motivation}</td>
    <td>{props.filterd[0].laureates[0].share}</td>
  </tr>:<tr>
    <th style={Styles}>
        No Data for particular selection
    </th>
  </tr>
}
    </>
}