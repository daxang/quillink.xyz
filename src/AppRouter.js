import React, { useEffect, useState, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";



import 'antd/dist/antd.min.css'
import { Orbis } from "@orbisclub/orbis-sdk"
import { shortAddress } from './Pages/utils/index';
import App from "./Pages/App"
import Write from './Pages/Write'
import OneWorld from './Pages/OneWorld'
import Chapter from './Pages/Chapter'
import Personal from './Pages/Personal'
import Worlds from './Pages/worlds'
import Community from './Pages/Community'
import Edit from './Pages/Edit'
import Information from "./Pages/Information"
import Oneinfo from "./Pages/Oneinfo"
import { Col, Layout, Row, Space, Image } from 'antd'
import {
    ExportOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css'
import './App.css'

let orbis = new Orbis();


const { Footer } = Layout;

export const Userinfo = createContext()
export const Userinfos = () => useContext(Userinfo)

export default function AppRouter() {
    // const [user, setUser] = useState()
    // const[ensName,setEnsName]=useState()
    // const[address,setAddress]=useState()
    const [userinfos, setUserinfos] = useState({})
    const [showusername, setShowusername] = useState()

    /** Calls the Orbis SDK and handle the results */
    async function connect() {
        let res = await orbis.connect();

        /** Check if connection is successful or not */
        if (res.status === 200) {
            console.log("连接成功")
            console.log(res)
            let add = res.did.slice(17, 59)
            console.log(add)
            let add_ = shortAddress(add)
            // setAddress(add_)
            if (res.details.profile) {
                setUserinfos({ username: res.details.profile.username, userid: res.did, userens: res.details.metadata.ensName, userdes: res.details.profile.description, useradd: add, usershortadd: add_ })
                setShowusername(true)
            }
            else {
                setUserinfos({ userid: res.did, userens: res.details.metadata.ensName, useradd: add, usershortadd: add_ })
                setShowusername(false)
            }
            let { data, error } = await orbis.getIsGroupMember("kjzl6cwe1jw14b2my0k7e8gi526fd2xjdy63iavdue06c39yvoi5u79p7kqcq6u", res.did)
            if (!data) {
                console.log("加入quillink")
                joinquillink()
            }
        } else {
            console.log("Error connecting to Ceramic: ", res);
        }
    }

    async function joinquillink() {
        let res = await orbis.setGroupMember("kjzl6cwe1jw14b2my0k7e8gi526fd2xjdy63iavdue06c39yvoi5u79p7kqcq6u", true);
        console.log(res)
    }
    async function getUserData() {
        let res = await orbis.isConnected()
        if (res.status === 200) {
            console.log("连接成功")
            console.log(res)
            let add = res.did.slice(17, 59)
            console.log(add)
            let add_ = shortAddress(add)
            // setAddress(add_)
            if (res.details.profile) {
                setUserinfos({ username: res.details.profile.username, userid: res.did, userens: res.details.metadata.ensName, userdes: res.details.profile.description, useradd: add, usershortadd: add_ })
                setShowusername(true)
            }
            else {
                setUserinfos({ userid: res.did, userens: res.details.metadata.ensName, useradd: add, usershortadd: add_ })
                setShowusername(false)
            }

        } else {
            console.log("Error connecting to Ceramic: ", res);
            setUserinfos(false)

        }


    }
    useEffect(() => {
        getUserData()
    }, []
    )
    async function leave() {
        let res = await orbis.logout()
        setShowusername(false)
        console.log(res)
        getUserData()

    }

    return (
        <Router>
            <Userinfo.Provider value={userinfos}>
                <div style={{ width: "100%",background:"white"}}>
                    <div className="head" style={{ width: "70%",marginLeft:"15%", minWidth: "920px",paddingLeft:"0",paddingRight:"0"}}>
                        <div className="logo" style={{ width: "15%",padding:"none",marginLeft:"0" }}>
                            <Link to="/" style={{ fontSize: "18px", color: "#55bb8a", fontWeight: "bold" }}>
                                QUILLINK  </Link>
                        </div>
                        <div className="write" style={{ width: "70%", color: "lightgray", fontSize: "16px", fontWeight: "bold", textAlign: "right"}}>
                            <Link style={{ color: "lightgray", marginRight: "40px" }}>WORLDS</Link>
                            <Link style={{ color: "lightgray", marginRight: "40px" }} >MINT&thinsp;&&thinsp;STORE</Link>
                            <Link style={{ color: "#66c18c", marginRight: "40px" }} to="/Community">COMMUNITY</Link>
                            <Link style={{ color: "#66c18c", }} to="/Information">INFORMATION</Link>
                        </div>

                        <div className="wallet " style={{ width: "15%", textAlign: "right"}}>
                            <div>
                                {showusername ? <p> <Link to="/Personal" style={{ color: "#3fa156" }}> {userinfos.username} &nbsp;</Link> <a onClick={() => leave()} style={{ border: "none", background: "none", color: "lightgray" }}><Space>
                                    <ExportOutlined /></Space> </a>
                                </p> : <span></span>}
                                {userinfos && !userinfos.username ? <p>  <Link to="/Personal" style={{ color: "#3fa156" }}>{userinfos.usershortadd}</Link ><a onClick={() => leave()} style={{ border: "none", background: "none" }}><Space>
                                    <ExportOutlined /></Space></a>
                                </p> : <span></span>}

                                {!userinfos ? <button onClick={() => connect()}>Connect</button> : <span></span>
                                }
                            </div>
                        </div>
                    </div>
                </div>


                <main style={{ width: "100%", background: "#edf4ec",}}>
                    <div style={{ width: "100%", minWidth: "920px", minHeight: "1024px", margin: "0 auto" }}>
                        <Routes>
                            <Route path="/" exact element={<App />}></Route>
                            <Route path="/write/:channel_id" element={<Write />} />
                            <Route path="/worlds/:world_id" element={<OneWorld />} />
                            <Route path="/Chapter/:post_id" element={<Chapter />} />
                            <Route path="/Personal" element={<Personal />} />
                            <Route path="/Worlds" element={<Worlds />} />
                            <Route path="/Community" element={<Community />} />
                            <Route path="/Information" element={<Information />} />
                            <Route path="/Information/:info_id" element={<Oneinfo />} />

                            <Route path="/Edit/:post_id" element={<Edit />} />
                        </Routes>

                    </div>
                </main>
                <footer style={{ textAlign: 'center', fontWeight: "bold", fontSize: "10px", marginTop: "30px", paddingTop: "30px", paddingBottom: "30px", background: "#545652", color: "gray" }}>
                    <p style={{ fontSize: "14px" }}>quillink.eth@mail3.me  </p>
                    <p>ANYTHING & ANYTIME</p>
                    <p >STORY TELLERS ARE LORDS OF CREATION</p>
                </footer>
            </Userinfo.Provider>
        </Router>
    )

}


