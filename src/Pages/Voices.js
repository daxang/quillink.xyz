import React, { useState,useEffect } from 'react'
import { List,Tabs,Input} from 'antd'
import 'antd/dist/antd.min.css'

import { Orbis } from "@orbisclub/orbis-sdk"
import { Routes, Route,Link } from 'react-router-dom';




let orbis = new Orbis();
export default function Voices() {
  const[user,setUser]=useState()
  const[group,setGroup]=useState("kjzl6cwe1jw147r71m6a0d4hbhx9vxnk7o8znqrwqc8ymvv0kr6ruby9d55mamn")
  const[channelList,setChannelList]=useState()
  const[channelId,setChannelId]=useState(0)
  const[posts,setPosts]=useState()


  const [channelTabs,setChannelTabs]=useState()
  const channeltabs0=[]

  async function getUserData(){
      let res = await orbis.isConnected()
      setUser(res.did)
  }
  useEffect(()=>{
    getUserData()
})
  async function getTheGroup(){
            let { data, error } = await orbis.getGroup(group)
            if(data){
                setGroup(data)
                const list=data.channels
                setChannelList(list)
                console.log(channelList)
                console.log(list)
                getDefaultPosts()

                for(var i=0;i<data.channels.length;i++){
                    var tabname=data.channels[i].content.name
                    var key0=i+1
                    var key=key0.toString()
                    var channelstreamid=data.channels[i].stream_id
                    channeltabs0.push({label:tabname,key:key,channelstreamid:channelstreamid})
                }
                setChannelTabs(channeltabs0)   
            }else{
                console.log(error)
            }

       
    }
  useEffect(()=>{ getTheGroup()
                    console.log("xunhuan")},[group]
    )

  async function getDefaultPosts(){
    let {data,error}=await orbis.getPosts({context:"kjzl6cwe1jw149vpum6qinsf96txtujyshvc05q3qj7u9sbejjjr81kmc7trxgw"})
    if(data){
        setPosts(data)
        console.log(data)
    }else{
        console.log(error)
 
    }
  }
 /* useEffect(()=>{
getDefaultPosts()
 console.log("post xunhuan")
},[channelId]) */

 async  function onChange(key){
    setChannelId(key-1)
    let {data,error}=await orbis.getPosts({context:channelList[key-1].stream_id})
    if(data){
        setPosts(data)
        console.log("切换点击成功")
    }
  }

  async function submit(){
    const comment0=document.getElementById("inputcomment").value
    console.log(comment0)
    if(comment0){
        console.log(channelId)
        console.log(channelTabs)
        let res = await orbis.createPost({body: comment0, context:channelTabs[channelId-1].channelstreamid })
        if(res){
            console.log("提交成功")
            console.log(res)
            document.getElementById("inputcomment").value=""

        }
    }
  }
    return (

        <div style={{background:"white",paddingLeft:"12px",paddingRight:"12px"}} >     
                              
            <div>
                <Tabs
                defaultActiveKey="1"
                onChange={onChange}
                items={channelTabs}
                />
            </div>
            <div style={{display:"flex",justifyContent: "space-between",}}>
                <Input id="inputcomment" style={{borderColor:"gray",borderTop:"none",borderLeft:"none",borderRight:"none"}} placeholder="post your comment here"></Input>
                <div><button onClick={()=>submit()}>submit</button></div>
            </div>
        
            <List  className='channels'
                dataSource={posts}
                itemLayout="vertical"
                renderItem={item => (
                    <List.Item >
                        <div style={{width:"100%"}}><a style={{fontSize:"12px",color:"gray"}}>{item.creator_details.profile.username}</a></div>
                        <div style={{fontSize:"14px",color:"#778087",marginTop:"10px"}}> {item.content.body}
                            </div>
                        
                        </List.Item>
                )}
            />  
            
            
        </div>  

        
)


    }        

