import React, { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Route, Redirect, Link, withRouter, useLocation, useNavigate } from "react-router-dom";
import {
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';
import { Col, Layout, Row, Input, List, Card, Divider, Tag, Space, Modal, Button, Alert } from 'antd'
import 'antd/dist/antd.min.css'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Orbis } from "@orbisclub/orbis-sdk"
import moment from "moment"
import { Userinfo } from "../AppRouter"

let orbis = new Orbis();
const { TextArea } = Input
export default function OneWorld() {
    let navigate = useNavigate()
    const location = useLocation()
    const worldId = location.pathname.slice(8)
    const [catalog, setCatalog] = useState()
    //   const localinfo=localStorage.getItem("ceramic-session")
    const postInfos = []
    const [showedit, setShowedit] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const arr02 = []
    // const[userid,setUserid]=useState(null)
    const userinfos = useContext(Userinfo)
    console.log("userinfos是" + userinfos)
    console.log(userinfos)
    const [worldname, setWorldname] = useState()
    const [worlddes, setWorlddes] = useState()
    const [universeid, setUniverseid] = useState()
    const [creator, setCreator] = useState()

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const [showCatalog, setShowCatalog] = useState()

    async function getUserData() {
        let res = await orbis.isConnected()
        if (res) {
            setShowCatalog(true)
        } else {
            setShowCatalog(false)
        }

    }
    useEffect(() => {
        getThisChannel()
        getCatalog()
        getUserData()

    }, [userinfos])

    async function getThisChannel() {
        let { data, error } = await orbis.getChannel(worldId)
        if (data) {
            console.log(data)
            setShowedit(data.creator == userinfos.userid)
            getcreator(data.creator)
            setWorldname(data.content.name)
            setWorlddes(data.content.description)
            setUniverseid(data.content.group_id)
        }
    }
    async function getcreator(creatorid) {
        let { data, error } = await orbis.getProfile(creatorid)
        console.log("getcreator")
        if (data) {
            console.log(data)
            if (data.username) { setCreator(data.username) }
            else {
                setCreator(data.did.slice(17, 59))
            }
        }
    }
    async function getCatalog() {
        let { data, error } = await orbis.getPosts({
            context: worldId
        })
        if (data) {
            console.log(data)
            console.log(data[0].timestamp)
            for (var i = 0; i < data.length; i++) {
                if (data[i].content.title) {
                    var time = data[i].timestamp
                    var time001 = moment(time * 1000).format('YYYY/MM/DD HH:mm:ss')
                    var id = data[i].stream_id
                    var title = data[i].content.title
                    //   var post =data[i].content.body.slice(0,200).replace(/<[^>]+>/g,"")
                    var post01 = data[i].content.body
                    var post02 = htmlDecode(post01).slice(0, 120).replace(/^\s+|\s+$/g, '')
                    //var time01=new Date(time)
                    postInfos.push({ id: id, title: title, post: post02, date: time001 })
                }

            }
            console.log(postInfos)
            console.log(ChangeArr(postInfos))
            const arr01 = ChangeArr(postInfos)
            console.log("ceshi")
            console.log(arr01.length)

            for (var a = 0; a < arr01.length; a++) {
                console.log("ceshi")
                arr02.push(JSON.parse(arr01[a]))
            }
            if (arr02.length > arr01.length) {
                setCatalog(arr02.slice(0, arr02.length / 2))
            } else {
                setCatalog(arr02)
            }

            console.log("postinfors的数量是：" + postInfos.length)
            /*if(postInfos.length>data.length){
              var list= postInfos.slice(0,postInfos.length/2)
              setCatalog(list)
                console.log(list)
            }else{
                setCatalog(postInfos)
            }*/

            //let time03 =time02.toLocaleDateString().replace(/\//g, "-") + " " + time01.toTimeString().substr(0, 8)
            // setCatalog(data)

        } else (
            console.log("wrong")
        )
    }

    function htmlDecode(text) {
        //1.首先动态创建一个容器标签元素，如DIV
        var temp = document.createElement("div");
        //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
        temp.innerHTML = text;
        //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    };
    //function unique(arr){
    // return Array.from(new Set(arr))
    // }
    const ChangeArr = (data) => {
        const newdata = data.map(item => (JSON.stringify(item)))
        return [...new Set(newdata)]
    }

    const isShowModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    async function submiteditworld() {
        console.log("开始提交世界更新")
        var editworldname = document.getElementById("editworldname").value
        var editworldinfo = document.getElementById("editworldinfo").value
        if (!editworldinfo && !editworldname) {
            alert("all are void")
        } else {
            console.log(universeid)
            let res = await orbis.updateChannel(
                worldId,
                {
                    group_id: universeid,
                    name: editworldname,
                    description: editworldinfo
                }
            )
            if (res) {
                console.log(res)
                setIsModalOpen(false)
            }
        }




    }

    async function deletepost(postid) {
        let res = await orbis.deletePost(postid)
        if (res.status == 200) {
            setOpen(false)
            window.location.reload()
        }
        console.log(res)
    }

    return (

            <div style={{ width: "70%", marginTop:"10PX", marginLeft: "15%", boxShadow: "0 0 5px #E9E7EF", background: "white", paddingTop: "30PX"}}>

                <div style={{ width: "100%", paddingTop: "40PX", boxSizing: "border-box", overflow: "hidden",marginTop:"30PX" }}>
                    <h2 style={{ height: "100px", fontSize: "24px", fontWeight: "bold", textAlign: "center", width: "100%", }}>
                        {worldname}
                    </h2>
                    <div style={{ textAlign: "right", paddingRight: "20px", marginTop: "-100PX", marginBottom: "20PX" }}>
                        {showedit ? <div><Button type="link" shape="round" onClick={isShowModal} style={{ color: "lightgray" }} ><Space><EditOutlined /></Space></Button></div> : <div></div>}
                    </div>

                    <Modal title={"edit  " + worldname} open={isModalOpen} onOk={submiteditworld} onCancel={handleCancel}>
                        <Input defaultValue={worldname} style={{ marginBottom: "10px" }} id="editworldname"></Input>
                        <TextArea defaultValue={worlddes} id="editworldinfo" ></TextArea>
                    </Modal>
                    <div
                        style={{
                            paddingLeft: "10px", paddingRight: "10px", paddingTop: "20PX", textAlign: 'center', marginTop: "40px", marginBottom: "40px", color: "#ff9e2c"
                        }}
                    >
                        <p style={{ height: "30px", textAlign: 'center', fontSize: 12, marginTop: "20px", marginBottom: "30PX" }}>
                            <a style={{ fontSize: "16px", fontWeight: "normal", color: "#3fa156" }}>{creator}</a>
                        </p>
                        <p style={{ height: "100px", textAlign: "center", color: "#777", fontSize: 12, marginTop: "15px", paddingLeft: "60px", paddingRight: "60PX" }}>
                            {worlddes}
                        </p>


                    </div>
                </div>


                <div style={{ minHeight: 1000, background: "white", marginTop: "30px" }}>
                    <div style={{ height: "30px", lineHeight: "30px", background: "lightgray", paddingLeft: "30px", fontSize: "14px", fontWeight: "BOLD", marginBottom: "30px" }} >CONTENTS
                    </div>
                    {userinfos ? <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={catalog}
                        renderItem={item => (
                            <List.Item >
                                <div className="content-list">
                                    <div className="source">
                                        <a >
                                            <Link to={'/chapter/' + item.id} style={{ color: "black",marginLeft:"25PX" }}>{item.title}</Link>
                                        </a>
                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyItems: "flex-start" }}>
                                        <div style={{ width: "80%", fontSize: "10px", paddingLeft: "10%", paddingRight: "30px", marginTop: "5px" }}>
                                            <Link to={'/chapter/' + item.id} style={{ color: "black" }}><a style={{ lineHeight: "15px", fontSize: "11px", fontWeight: "light", color: "#b9dec9" }} dangerouslySetInnerHTML={{ __html: item.post }}></a></Link>
                                            <span style={{ marginTop: "-7px", color: "#abc6cf" }}>.........</span>
                                            <br></br>
                                            <p style={{ color: "gray", marginTop: "5px" }}>posted at :&nbsp;&nbsp;{item.date}</p>
                                        </div>
                                        {showedit ? <div style={{ width: "3%", fontSize: "10px", textAlign: "right", marginLeft: "2%", color: "gray" }}>
                                            <Link style={{ width: "100%", textAlign: "right" }} to={"/edit/" + item.id}  >
                                                <Space style={{ width: "100%", textAlign: "right", color: "gray" }} >
                                                    <EditOutlined />
                                                </Space></Link>
                                            <br></br>
                                            <Link style={{ width: "100%", textAlign: "right" }} onClick={() => showModal()}>
                                                <Space style={{ width: "100%", textAlign: "right", color: "gray" }}>
                                                    <DeleteOutlined />
                                                </Space></Link>
                                        </div> : <div></div>}
                                        <Modal
                                            open={open}
                                            onOk={hideModal}
                                            onCancel={hideModal}
                                            footer={[
                                                <Button key="back" onClick={hideModal} style={{ fontSize: "12px" }}>
                                                    cancel
                                                </Button>,
                                                <Button key="submit" type="primary" onClick={() => deletepost(item.id)}>
                                                    delete
                                                </Button>,
                                            ]}
                                            style={{ fontSize: "14px" }}
                                        >Delete This Chapter ?
                                        </Modal>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    /> : <div style={{ width: "30%", height: "50px", lineHeight: "50px", margin: "10px auto", background: "red", textAlign: "center", borderRadius: "5px", color: "white" }}>
                        <Alert
                            message="DISCONNECTED"
                            description="please connect your wallet first !"
                            type="warning"
                            style={{ borderRadius: "5px", color: "darkgray" }}
                            showIcon
                        />
                    </div>}

                </div>
            </div>


    )

}

