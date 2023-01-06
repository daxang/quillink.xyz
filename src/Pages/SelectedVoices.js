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

export default function SelectedVoices() {
    const[infos,setInfos]=useState()
    const infos0=[]

    const[voices,setVoices]=useState()


    async function getvoices(){
        let { data, error } = await orbis.getPosts({
            context:"kjzl6cwe1jw14a065xxotcdmg9scw5il1gl6cqcg7wd2rwlflzqxy08z6c54882"
        })
        console.log("voices are"+data)
        if(data){
            setVoices(data)
                console.log(data)
            }else(
            console.log("wrong")
        )
    }    
    useEffect(()=>{

        getvoices()
    
      //  getCataLog()
        },[])



        return (
                <div className="community" >
                {voices?<List
                    bordered={false}
                    grid={{
                        column: 2,
                    }}
                    split={true}
                    dataSource={voices}
                    style={{borderCollapse:"collapse",overflow:"hidden"}}
                    renderItem={(item) => (
                        <List.Item style={{border:"none",borderCollapse:"collapse",backgroundColor:"white",padding:"0",marginBottom:"0PX"}}>
                            <Card
                            type="inner"
                            title={item.content.data.voiceman}
                            extra={<a href={item.content.data.link} style={{color:"#69a794"}}>source</a>}
                            bordered={false}
                            style={{width:"100%",height:"180px",color:"gray",border:"1px solid lightgray",padding:"0px",fontWeight:"light"}}
                            >
                            <p style={{width:"100%",fontSize:"14px",height:"75px"}}>{item.content.body}</p>
                            <p style={{textAlign:"right",fontStyle:"italic"}}>{item.content.data.date}</p>
                            </Card>
                        </List.Item>
                    )}
                    />:<div>
                        <Space>
                        <LoadingOutlined style={{color:"green",fontSize:"14PX",marginRight:"20px"}} ></LoadingOutlined>
                        </Space>
                <span style={{fontStyle:"italic"}}>retrieving community voices from blockchain data</span></div>}
                </div>

                      
             
        )

}

