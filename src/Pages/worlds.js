import React, { useState,useEffect } from 'react'
import { Layout,Collapse,Input,Button } from 'antd'
import 'antd/dist/antd.min.css'

import { Orbis } from "@orbisclub/orbis-sdk"


let orbis = new Orbis();
export default function Worlds() {
  const[post,setPost]=useState()
  const[world,setWorld]=useState() 
  const[user,setUser]=useState()

  async function getUserData(){
      let res = await orbis.isConnected()
      setUser(res.did)
  }

  useEffect(()=>{
      getUserData()
  })

  async function getPosts(){
    console.log("start to post")
    let { data, error } = await orbis.getPosts({ context: "kjzl6cwe1jw148fg1h9lbi0kseyif24zzegoipd3k9ra7vdk7otfz6iqc3awba0" })

    if(data){
        console.log(data)
        setPost(data[0].content.body)
    }else{
        console.log("cuowu ")
    }
    
}
    
        return (
            
                <div >                                      
                 <div>let us write</div>

                  <div className='input'>
                    <div className='title'>
                    {post}
                    </div>
                    <div>
                        <Button onClick={()=>getPosts()}>get</Button>
                    </div>
                  </div>
                </div>  

             
        )
    }

