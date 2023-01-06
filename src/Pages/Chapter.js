import React, { useState, useEffect} from 'react'
import { BrowserRouter as Router, useLocation,Link,useNavigate  } from "react-router-dom";
import {Col, Layout, Row,Input,Space,Alert} from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import 'antd/dist/antd.min.css'
import { Orbis } from "@orbisclub/orbis-sdk"
import moment from "moment"
let orbis = new Orbis();

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_3700195_2mfesu7gopw.js',
  });

export default function Chapter () {
    let navigate = useNavigate()
    const[user,setUser]=useState()
    const[post,setPost]=useState()
    const[title,setTitle]=useState()
    const[date,setDate]=useState()
    const[channel,setChannel]=useState()
    const[channelname,setChannelname]=useState()
    const[prepost,setPrepost]=useState()
    const[prelink,setPrelink]=useState()
    const[laterpost,setLaterpost]=useState()
    const[laterlink,setLaterlink]=useState()
    const [status, setStatus] = useState();
    
    const[loading,setLoading]=useState(false)
    const[noAccess,setNoAccess]=useState(false)

    const[contract, setContract]=useState()
    const[explorerLink,setExplorerLink]=useState()

    const location=useLocation()
    const postId=location.pathname.slice(9)


    const postInfos =[]

    async function getUserData(){
        let res = await orbis.isConnected()
        if(res){
            setUser(res.did)
        }else{
            alert("you are disconnected")
            navigate("/")

        }

    }

    async function getChapter(){
        let {data,error}= await orbis.getPost(postId)
        if(data){
            console.log(data)
            var time=data.timestamp
            var time001 =moment(time*1000).format('YYYY/MM/DD HH:mm:ss')
            setTitle(data.content.title)
            setDate(time001)
            setChannel(data.context)
            setChannelname(data.context_details.channel_details.name)
            getCataLog(data.context)
            if(data.content?.body){
               // const rawpost=data.content.body
                setPost(data.content.body)
                setNoAccess(false)
        
            }
            else if(data.content?.encrypteBody?.encryptedString != {}){
                console.log("start to decrypt the Post")
                let res = await orbis.decryptPost(data.content);
                console.log(res)
                setLoading(true)
                let _access = JSON.parse(data.content.encryptedBody.accessControlConditions);
                if(_access && _access.length > 0) {
                let contract = _access[0].contractAddress;
                setContract(contract);
                setExplorerLink("https://etherscan.io/address/" + contract);
                }
            
                /** Save in state */
                if(res.status == 300) {
                setStatus(300)
                setLoading(false)
                setNoAccess(true)

                } else {
                setPost(res.result)
                setLoading(false)
                setNoAccess(false)
                }
            } else {
                return null;
            }

          }
            
        }
    
    async function getCataLog(channelid){
        let { data, error } = await orbis.getPosts({
            context: channelid
        })
        if(data){
            console.log("chapters:"+data)
            console.log(data)
            for(var i=0;i<data.length;i++){
                var id=data[i].stream_id
                var title1=data[i].content.title

                //var time01=new Date(time)
                postInfos.push({id:id,title:title1})
            }
            var keys=postInfos.findIndex((v)=>{
                return v.id == postId
            })

            if(keys!=0){
                setPrepost(postInfos[keys-1].title)
                setPrelink(postInfos[keys-1].id)
            }else{
                setPrepost(null)
            }

            if(keys!=postInfos.length-1){
                setLaterpost(postInfos[keys+1].title)
                setLaterlink(postInfos[keys+1].id)
            }else{
                setLaterpost(null)
            }
            
            console.log(prepost)
            console.log(laterpost)

        }else(
            console.log("wrong")
        )}

    useEffect(()=>{
        getUserData()
        getChapter()
      //  getCataLog()
        },[postId])

      
          return (
                  <div style={{width:"70%",marginLeft:"15%",minWidth:"920px",marginTop:"20px",background:"white",border:"1px solid lightgray",overflow:"hidden",boxShadow:"0 0 24px rgba(33,33,33,.2)"}} >  
                    <div style={{background:"#55bb8a",height:"40px",lineHeight:"40px",paddingLeft:"12px"}}>
                        <Link to={"/worlds/"+channel} style={{fontSize:"14px",color:"white"}}>Back to <span style={{color:"white",fontWeight:"bold"}}>&nbsp;&nbsp;{channelname}</span></Link>
                        </div>     


                   <div style={{display:"flex",justifyContent: "space-between",marginTop:"20px",paddingRight:"12px",paddingLeft:"12PX"}}>
                    {laterpost ?
                        <Link style={{color:"#778087"}} to={ '/chapter/'+laterlink}>{laterpost}</Link>
                        : <span></span>
                        }
                    
                    {prepost ?
                    <Link style={{color:"#778087"}} to={ '/chapter/'+prelink}>{prepost}</Link>
                    : <span></span>
                    }
                    </div>

                    <div style={{minHeight:"1000px",paddingBottom:"30px",margin:"0 auto"}}>
                        <div style={{fontSize:"24px",fontWeight:"bold",textAlign:"center"}}>{title} </div>
                        <div style={{textAlign:"center"}}>{date} </div>
                        {loading ? <div>decrypting the content of this chapter</div>:<div></div>}
                        {noAccess ?<div style={{width:"40%",height:"100px",marginLeft:"30%",borderRadius:"5px",color:"darkgray",textAlign:"center",marginTop:"100PX",backgroundColor:"#fffbe6",paddingTop:"20PX"}}>
                                        <a style={{fontSize:"16px",fontWeight:"bold",color:"#f1441d"}}>TOKEN GATED CONTENT</a><br></br>
                                        <br></br>
                                        <a style={{color:"#778087",marginTop:"15px"}} href={explorerLink}>token contract : {contract}</a>
                                        </div>:<p></p>}
                        <div  dangerouslySetInnerHTML={{__html: post}} style={{width:"90%",marginLeft:"5%",marginTop:"50px",paddingRight:"12px",textIndent:"0px",fontSize:"16px",fontFamily:"-moz-initial"}}></div>
                    </div>
                    
                    <div style={{height:"30px",marginTop:"20px",display:"flex",fontSize:"10px",background:"#b9dec9",color:"white",paddingLeft:"60px",paddingRight:"60PX",}}>
                        <div style={{width:"30%",lineHeight:"30px",paddingLeft:"10px",paddingRight:"10PX",textAlign:"center",borderRight:"1px solid white"}} >
                        <span>CERAMIC MAINNET</span>
                        </div>
                        <div style={{width:"70%",lineHeight:"30px",textAlign:"center"}}  >
                            <a href={"https://cerscan.com/mainnet/stream/"+postId} style={{color:"white"}}>{postId}</a></div>
                    </div>
                  </div>  
  
               
          )
}





