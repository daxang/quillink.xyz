import React, { useState,useEffect,useContext } from 'react'

import{Userinfo}from "../AppRouter"


import { Layout,Collapse,Input,Button,Modal, Divider,List,Space} from 'antd'
import {
    SettingOutlined 
  } from '@ant-design/icons';
import 'antd/dist/antd.min.css'
import { Orbis } from "@orbisclub/orbis-sdk";
import { Link,useNavigate  } from 'react-router-dom';
import { shortAddress } from './utils';


/** Initialize the Orbis class object */
let orbis = new Orbis()
const { TextArea } = Input
function Personal(){
    let navigate = useNavigate()
    const firstmen=["0xf940a19af21da9b77a134ddf4aa20453489d96f6","0xe680cd7ca1df50d6c644ac56f99a9c734cec2c58","0xae68c01a5b4b964554298d63e0ce8da7c59e3b42","0x6d84347bf42ab41b4f9086b003f425ea1ead712a","0x985a91d213a29a1377e1626b6d27f30368c1d8bb","0xbbf9848ac4d0a91646cd939a46696493bb02d4de"]

    const[user,setUser]=useState()
    const userinfos=useContext(Userinfo)
    const[show,setShow]=useState(false)
    const[showCreateWorld,setShowCreateWorld]=useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const[finalchannels,setFinalchannels]=useState()


    const [groupcreator,setGroupcreator]=useState(false)

    const [createdgroups,setCreatedgroups]=useState()
    const createdgroups01=[]

    const[ownuniverseid,setOwnuniverseid]=useState()
    const isShowModal = () => {
    setIsModalOpen(true);
    };

    const handleCancel = () => {
    setIsModalOpen(false);
    };

    async function isconnected(){
        let res=await orbis.isConnected()
        if(res.status==200){
            console.log("connected ")
        }else{
            navigate("/")
        }
    }
    async function getUserData(){
        if(userinfos&&firstmen.includes(userinfos.useradd)) {
            setShowCreateWorld(true)
            let{ data, error } = await orbis.getProfileGroups(userinfos.userid)
            console.log(data)
            if(data){
                for(var a=0;a<data.length;a++)
                {
                   getgroup(data[a].group_id)
                }
            }
        }
        
    }
    async function getgroup(id){ 
        let {data,error}=await orbis.getGroup(id)
        if(data.creator==userinfos.userid&&data.content.name=="testTwo"){
            console.log("data is")
            console.log(data)
            if(data.channels.length!=0){
                setCreatedgroups(data.channels)
                setOwnuniverseid(id)
            }
            setGroupcreator(true)
          //  createdgroups01.push({groupname:data.content.name,groupid:id})
          //getchannels(da)
        }
    }


    useEffect(()=>{
        isconnected()
        getUserData()
       // getchannels()
    },[userinfos])
/*useEffect(()=>{
    getchannels(createdgroups)
},[createdgroups])*/
    

    async function createUni(){
        let res = await orbis.createGroup({
            pfp: "",
            name: "testTwo"
        });
        if(res.status==200){
            setOwnuniverseid(res.doc)
        }else{
            console.log("failed")
        }
    }

    async function updatePersonal(){
        var username=document.getElementById("username").value
        var bio=document.getElementById("bio").value
        if(username||bio){
            let res = await orbis.updateProfile({
                username: username,
                description:bio
              });
              if(res){
                console.log(res)
                setShow(false)
              }else{
                console.log("更新失败")
              }
        }
    }
        
    async function createNewWorld(){
        if(ownuniverseid){
            var newworldname = document.getElementById("newworldname").value
            var newworldinfo=document.getElementById("newworldinfo").value
           if(newworldname){
            let res = await orbis.createChannel(
                ownuniverseid,
                {
                  group_id:ownuniverseid,
                  pfp: "",
                  name: newworldname,
                  description: newworldinfo
                }
              );
            if(res.status==200){
                console.log(res) 
                setIsModalOpen(false)
                getUserData()
            }else{
                console.log("failed")
            }
           }
        }else{
            createUni()
        console.log(ownuniverseid)
            var newworldname = document.getElementById("newworldname").value
            var newworldinfo=document.getElementById("newworldinfo").value
           if(newworldname){
            let res = await orbis.createChannel(
                ownuniverseid,
                {
                  group_id:ownuniverseid,
                  pfp: "",
                  name: newworldname,
                  description: newworldinfo
                }
              );
            if(res.status==200){
                console.log(res) 
                setIsModalOpen(false)
            }else{
                console.log("failed")
            }
           }
        }
       
    }

    const showModal = () => {
        setShow(true);
        };
    const showNoModal=()=>{
        setShow(false)
    }

    return (
        <div style={{width:"62%",marginLeft:"19%",background:"white",minHeight:"1200px",paddingLeft:"12px"}}>
            <div className='personalInfo' style={{width:"90%",marginBottom:"20PX",paddingTop:"20PX",display:"flex",justifyContent:"start"}}>
                <div style={{width:"60%",fontSize:"16PX"}}>
                    <span >{userinfos.username}</span>
                    <div style={{color:"#abc6cf",fontSize:"12px",marginTop:"5PX"}}>{userinfos.userdes}</div>
                </div>
                <div style={{width:"30%"}}>
                    <a onClick={()=>showModal()} style={{color:"lightgray"}} >
                        <Space><SettingOutlined /></Space>
                    </a>
                    <Modal title="Edit Your Profile" open={show} onOk={updatePersonal} onCancel={showNoModal}>
                        <Input className="input" id="username" placeholder='username'style={{marginBottom:"3px"}}></Input>
                        <TextArea placeholder='your personal description' id="bio" ></TextArea>
                    </Modal>
                </div>
            </div>
            <Divider></Divider>
             <div className='personalWorlds' style={{marginTop:"20px"}}>
                <div style={{width:"90%",display:"flex",justifyContent:"start"}}>
                    <h2 style={{width:"60%"}}>Worlds</h2>
                    <div style={{width:"20%",marginLeft:"10PX",marginBottom:"20PX"}}>
                        {showCreateWorld? <div><Button style={{background:"#EDF4EC",color:"#3fa156",width:"100%"}} shape="round" onClick={isShowModal} >create a new world</Button></div>:<div></div>}
                        <Modal title="Your New World" open={isModalOpen} onOk={createNewWorld} onCancel={handleCancel}>
                            <Input placeholder='name of the new world' style={{marginBottom:"10px"}} id="newworldname"></Input>
                            <TextArea placeholder='some info about this new world' id="newworldinfo" ></TextArea>
                        </Modal>
                       </div>
                       </div>
               
                <div style={{width:"90%"}}>
                    <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={createdgroups}
                        renderItem={item => (
                            <List.Item style={{display:"flex",justifyContent:"start",width:"100%",minWidth:"600px"}}>
                                     <div className="source" style={{width:"60%",borderRight:"1px dashed lightgray"}}>
                                        <div style={{height:"30px",fontSize:"14px",fontWeight:"bold"}}>
                                            <Link to={ '/worlds/'+item.stream_id} style={{color:"black",fontWeight:"lighter"}}>{item.content.name}</Link> 
                                            </div>
                                        <div style={{fontSize:"10px",color:"#abc6cf",fontWeight:"lighter"}}>{item.content.description}</div>
                                    </div>
                                
                                 <div style={{width:"20%",height:"27px",lineHeight:"27px",fontSize:"10px",textAlign:"center",border:"1px solid #3fa156",borderRadius:"5px",marginLeft:"10PX"}}>  
                                            <Link style={{width:"100%",color:"#3fa156"}} to={"/write/"+item.stream_id}>
                                                add a new chapter</Link>
                                    </div>
                                    
                            
                            </List.Item>
                        )}
                    />
                       <Divider></Divider> 
                    </div>
                </div>
  
            </div>




    )
}

export default Personal;
