import React, { useEffect, useState } from 'react'
import {  Route, Link,Redirect  } from "react-router-dom";
import { Divider,  Layout,  Button,Card, Col, Row,List} from 'antd'
import { Orbis } from "@orbisclub/orbis-sdk"
import 'antd/dist/antd.min.css'
import moment from "moment"
import {
    LoadingOutlined,
  } from '@ant-design/icons';
  import { Space } from 'antd';
let orbis = new Orbis();


const { Header, Footer, Sider, Content } = Layout
const { Meta } = Card;

export default function Information() {
    const[infos,setInfos]=useState()
    const infos0=[]

    const[voices,setVoices]=useState()

    async function getinfos(){
        console.log("start to get infos")
        let { data, error } = await orbis.getPosts({
            context:"kjzl6cwe1jw1485xa3hjfy963ul2esbndf0wh95wz1xok0nxho18rq1a7o42oml"
        })
        console.log(data)
        if(data){
            for(var i=0;i<data.length;i++){
                if(data[i].content.title){
                    var time=data[i].timestamp
                    var time001 =moment(time*1000).format('YYYY/MM/DD HH:mm:ss')
                    var id=data[i].stream_id
                    var title=data[i].content.title
                    var infodes=data[i].content.data.infodes
                    if(infodes){
                        infos0.push({id:id,title:title,date:time001,infodes:infodes})
                    }else{
                        infos0.push({id:id,title:title,date:time001,infodes:null})
                    }
                   
                }
                
            }
            console.log(infos0)
            if(infos0.length>data.length){
            var list= infos0.slice(0,infos0.length/2)
            setInfos(list)
                console.log(list)
            }else{
                setInfos(infos0)
            }

        //let time03 =time02.toLocaleDateString().replace(/\//g, "-") + " " + time01.toTimeString().substr(0, 8)
        // setCatalog(data)

        }else(
            console.log("wrong")
        )
    }
 
    useEffect(()=>{
        getinfos()
    
      //  getCataLog()
        },[])



        return (
                   <div  className="content-col" style={{width:"70%",marginLeft:"15%",}} >

                    <div style={{width:"100%",height:"200px",display:"flex",justifyContent:"center",marginTop:"60PX"}}>
                        <div style={{width:"70%",minWidth:"900px",textAlign:"center"}}>
                           <span style={{fontSize:"36px",fontWeight:"bold"}}>the latest news from quillink</span>
                           <br></br>
                           <br></br>
                           <span style={{fontSize:"18PX",fontWeight:"bold",fontStyle:"italic",color:"#685e48"}}>quillink will be leaded to be a total web3 platform. every of you is one bricklayer of quillink. talk with us,share your thoughts with us, and let's make the future news of quillink together!</span>
                        </div>

                    </div>
                    <div className="news" style={{width:"100%",marginTop:"40px",boxShadow:"0 0 24px rgba(33,33,33,.2)",overflow:"hidden"}}>
                        {infos?<List 
                            bordered
                            itemLayout="horizontal"
                            dataSource={infos}
                            renderItem={(item) => (
                                <List.Item style={{background:"white",fontSize:"15px"}}> 
                                <div style={{display:"flex",justifyContent:"flex-start",height:"100px"}}>
                                    <div style={{width:"75%"}}>
                                        <div style={{height:"25px",textAlign:"left",paddingLeft:"0px",fontSize:"18px",fontStyle:"italic",fontWeight:"bold",color:"#685e48"}}><Link style={{color:"black"}} to={"/Information/"+item.id}>{item.title}</Link></div>
                                        <div style={{heihgt:"75px",lineHeight:"1.2em",width:"100%",color:"gray",marginTop:"10PX"}}> {item.infodes}</div>
                                    </div>   
                                     <div style={{width:"25%",height:"100px",lineHeight:"100px",textAlign:"right"}}><span >{item.date}</span></div> 
                                </div>
                                
                                </List.Item>
                            )}
                            />:<div>
                                  <Space>
                                  <LoadingOutlined style={{color:"green",fontSize:"14PX",marginRight:"20px"}} ></LoadingOutlined>
                                </Space>
                          <span style={{fontStyle:"italic"}}>retrieving data......</span></div>}
                    </div>
                    

                
            
                    </div>

                      
             
        )

}

