import React, { useState, useEffect} from 'react'
import { BrowserRouter as Router, useLocation,Link  } from "react-router-dom";
import {Col, Layout, Row,Input,Space, Divider} from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import 'antd/dist/antd.min.css'
import { Orbis } from "@orbisclub/orbis-sdk"
import moment from "moment"
let orbis = new Orbis();

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_3700195_2mfesu7gopw.js',
  });

export default function Oneinfo () {
    const[user,setUser]=useState()
    const[post,setPost]=useState()
    const[title,setTitle]=useState()
    const[date,setDate]=useState()
    const location=useLocation()
    const infoid=location.pathname.slice(13)


    const postInfos =[]

    async function getUserData(){
        let res = await orbis.isConnected()
        setUser(res.did)
    }

    async function getthisinfo(){

        console.log(infoid)
        let {data,error}= await orbis.getPost(infoid)
        if(data){
            console.log(data) 
            setTitle(data.content.title)
            setPost(data.content.body)
            var time=data.timestamp
            var time01 =moment(time*1000).format('YYYY/MM/DD HH:mm:ss')
            setDate(time01)
          }
            
        }

    useEffect(()=>{
        getUserData()
        getthisinfo()
      //  getCataLog()
        },[infoid])

      
          return (
                  <div style={{width:"70%",marginLeft:"15%",marginTop:"20px",background:"white",border:"1px solid lightgray"}} >  
                    <div style={{height:"40px",lineHeight:"40px",paddingLeft:"12px"}}>
                        <Link to={"/Information"} style={{fontSize:"14px",color:"gray"}}>Back to <span style={{color:"#685e48",fontWeight:"bold",fontStyle:"italic"}}>&nbsp;&nbsp;INFORMATION</span></Link>
                        </div>     
                    <Divider></Divider>
                    <div style={{marginTop:"40px",minHeight:"1000px",paddingBottom:"30px",paddingRight:"60px",paddingLeft:"60PX"}}>
                        <div style={{fontSize:"24px",fontWeight:"bold",textAlign:"center"}}>{title} </div>
                        <div style={{textAlign:"center",marginTop:"16PX",color:"lightgray",fontWeight:"bold"}}>{date} </div>
                        <div  dangerouslySetInnerHTML={{__html: post}} style={{marginTop:"30px"}}></div>
                    </div>
                    
                    <div style={{height:"30px",marginTop:"20px",display:"flex",fontSize:"10px",background:"#e5e7eb",color:"darkgray",paddingLeft:"60px",paddingRight:"60PX",}}>
                        <div style={{width:"23%",lineHeight:"30px",textAlign:"center",borderRight:"1px solid white"}} >
                        <span>CERAMIC MAINNET</span></div>
                        <div style={{width:"70%",lineHeight:"30px",textAlign:"center"}} >
                            <a href={"https://cerscan.com/mainnet/stream/"+infoid} style={{color:"darkgray"}}>{infoid}</a></div>
                    </div>
                  </div>  
  
               
          )
}





