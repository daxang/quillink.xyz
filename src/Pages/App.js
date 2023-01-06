import React, { useEffect, useState } from 'react'
import {  Route, Link,Redirect  } from "react-router-dom";
import { Divider,  Layout,  Button,Card, Col, Row,List,Image } from 'antd'
import { Orbis } from "@orbisclub/orbis-sdk"
import 'antd/dist/antd.min.css'
import moment from "moment"
import {
    LoadingOutlined,
  } from '@ant-design/icons';
  import { createFromIconfontCN } from '@ant-design/icons';
  import {Space} from "antd"
let orbis = new Orbis();

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_3700195_2mfesu7gopw.js',
  });

const { Header, Footer, Sider, Content } = Layout
const { Meta } = Card;

export default function App() {
    const[infos,setInfos]=useState()
    const infos0=[]

    const[voices,setVoices]=useState()

    async function getinfos(){
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
                    var content=data[i].content.data.infodes
                    infos0.push({id:id,title:title,content:content,date:time001})
                }
                
            }
            console.log(infos0)
            if(infos0.length>data.length){
            var list= infos0.slice(0,data.length)
            setInfos(list.slice(0.2))
            }else{
                setInfos(infos0.slice(0.2))
            }

        //let time03 =time02.toLocaleDateString().replace(/\//g, "-") + " " + time01.toTimeString().substr(0, 8)
        // setCatalog(data)

        }else(
            console.log("wrong")
        )
    }
    async function getvoices(){
        let { data, error } = await orbis.getPosts({
            context:"kjzl6cwe1jw14a065xxotcdmg9scw5il1gl6cqcg7wd2rwlflzqxy08z6c54882"
        })
        console.log("voices are"+data)
        if(data){
            console.log()
            var list= data.slice(0,8)
            setVoices(list)
                console.log(list)
            }else(
            console.log("wrong")
        )
    }    
    useEffect(()=>{
        getinfos()
        getvoices()
    
      //  getCataLog()
        },[])



        return (
                   <div  className="content-col" style={{width:"100%",margin:"0 auto"}}  >
                              <div className='bigwords' style={{width:"100%",minWidth:"1014px",minHeight:"452px",margin:"0 auto",textAlign:"center",backgroundColor:"#333D30",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                                <div style={{width:"62%",margin:"0 auto",textAlign:"center",paddingTop:"30PX"}}>
                                    <p style={{fontSize:"40px",fontWeight:"bolder",color:"white"}}>STORY TELLERS ARE LORDS OF CREATION</p>
                                    <p style={{fontSize:"18px",color:"white",}}>maybe you guys would like to ask:  
                                        </p>
                                        <p style={{fontSize:"18px",color:"white",}}> what is quillink?</p>
                                    <div style={{fontSize:"26px",color:"white",fontWeight:"bolder"}}>
                                        A Free Oasis For <span style={{fontSize:"30px",fontStyle:"italic",fontWeight:"bolder",color:"#55bb8a",padding:"5px",borderRadius:"3PX"}}>Unchained StoryTellers</span> and <span  style={{fontSize:"30px",fontStyle:"italic",fontWeight:"bolder",color:"#55bb8a",padding:"5px",borderRadius:"3PX"}}> True Fans</span> 
                                    </div>
                                </div> 
                                <div style={{width:"100%",display:"flex",justifyContent:"center",marginBottom:"30px"}}>
                                    <div style={{width:"50%",height:"50px",lineHeight:"50px ",minWidth:"860px",marginTop:"45PX",paddingLeft:"10PX",paddingRight:"10px",display:"flex",justifyContent:"space-between",background:"",borderRadius:"5PX "}}>
                                        <Image width={30} src="https://s3.bmp.ovh/imgs/2022/12/12/88113d52f23c4b88.png" > </Image>
                                        <Image width={30} src="https://s3.bmp.ovh/imgs/2022/12/12/75b2be6b7f2ff38f.png"> </Image>
                                        <Image width={30} src="https://s3.bmp.ovh/imgs/2022/12/12/ee1689e0861f3cb5.png"> </Image>
                                        <Image width={30} src="https://s3.bmp.ovh/imgs/2022/12/12/ddebff2064ea32ca.png"> </Image>
                                        <Image width={30} src="https://s3.bmp.ovh/imgs/2022/12/12/ba1ba3584370f005.png"> </Image>
                                        <Image width={30} src="https://s3.bmp.ovh/imgs/2022/12/12/a9163668ec493dbd.png"> </Image>
                                        <Image width={30} src="https://s3.bmp.ovh/imgs/2022/12/12/338277a4a3758496.png"> </Image>
                                        <Image width={30} src="https://s3.bmp.ovh/imgs/2022/12/12/519426a0a9fb97bf.png"> </Image>
                                        <Image width={30} src="https://s3.bmp.ovh/imgs/2022/12/12/ef1f0ca916270a5e.png"> </Image>
                                        <Image width={30} src="https://s3.bmp.ovh/imgs/2022/12/12/f7f583dc58302aab.png"> </Image>
                                        <Image width={30} src="https://s3.bmp.ovh/imgs/2022/12/12/3329913a179617b5.png"> </Image>
                                    </div>
                                    </div>
                         
                           </div>

                     <div className="worlds" style={{width:"70%",minWidth:"920px",marginBottom:"10px",paddingTop:"90PX",marginLeft:"15%"}}>
                        <div style={{textAlign:"center",marginBottom:"40px"}}>
                            <h3 className='headers' style={{fontWeight:"bold",fontSize:"36PX"}}>GENISIS WORLDS</h3></div>
                        <div style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
                            <div style={{width:"25%",paddingRight:"5px"}} >
                                <Divider style={{marginTop:"0px"}}></Divider>
                                    <Space wrap>
                                        <Button  shape="round">Romance </Button>
                                        <Button  shape="round">Horror </Button>
                                        <Button  shape="round">Fantasy </Button>
                                        <Button  shape="round">Science Fiction </Button>
                                        <Button  shape="round">Comics </Button>
                                        <Button  shape="round">Romance </Button>
                                        <Button  shape="round">Young Adult Fantasy </Button>
                                        <Button  shape="round">Humor </Button>
                                    </Space>
                                    <Divider></Divider>

                                    <div>
                                        <h4>Updates</h4>
                                        <p>
                                            <span style={{color:"#50616D",fontWeight:"bold"}}>0xlib just posted an new chapter on 2057:United Bunkers</span>&nbsp;&nbsp;&nbsp;
                                            <br></br>
                                            <span>2022/10/31 21:46:00</span>
                                        </p>
                                        <p>
                                            <span style={{color:"#50616D",fontWeight:"bold"}}>0xlib just posted an new chapter on 2057:United Bunkers</span>&nbsp;&nbsp;&nbsp;
                                            <br></br>
                                            <span>2022/10/31 21:46:00</span>
                                        </p>
                                        <p>
                                            <span style={{color:"#50616D",fontWeight:"bold"}}>0xlib just posted an new chapter on 2057:United Bunkers</span>&nbsp;&nbsp;&nbsp;
                                            <br></br>
                                            <span>2022/10/31 21:46:00</span>
                                        </p>
                                        <p>
                                            <span style={{color:"#50616D",fontWeight:"bold"}}>0xlib just posted an new chapter on 2057:United Bunkers</span>&nbsp;&nbsp;&nbsp;
                                            <br></br>
                                            <span>2022/10/31 21:46:00</span>
                                        </p>
                                    </div>

                             </div>
                             <br></br>
                             <div style={{width:"72%",display:"flex", flexWrap: "wrap",justifyContent:"flex-start"}}  >

                             <div style={{width:"23.5%",height:"345px",background:"#e6e6e6"}} >
                                    <div style={{width:"100%",height:"225px",textAlign:"center",paddingTop:"10px"}}> 
                                    <img src="https://s3.bmp.ovh/imgs/2023/01/05/0462de8595c6c4da.png" style={{width:"90%",height:"215px"}}></img> 
                                        </div>
                                        <div style={{height:"110px",textAlign:"center",display:"flex",justifyContent:"space-between",flexDirection:"column",marginTop:"10px"}}>  
                                            <Link to="/worlds/kjzl6cwe1jw14b3skiqsdxm8unj0nipgpq5488avykfeurpykbt0h6dinfzuu90" style={{fontSize:"13px",color:"#382110"}}>A Tale Of Guardians</Link>
                                            <h6 style={{color:"darkgray",fontWeight:"bold"}}>MS6085 </h6>
                                            <div style={{fontSize:"10px",height:"30px",color:"darkgray",textAlign:"center"}}>
                                                <button style={{paddingLeft:"5px",paddingRight:"5px",border:"0px",borderRadius:"3px",background:"#B0A4E3",color:"white",}}>Fantasy</button>
                                            </div>
                                       
                                    </div>                                         
                                </div>
                                <div style={{width:"23.5%",height:"345px",marginLeft:"10px",background:"#e6e6e6"}} >
                                    <div style={{width:"100%",height:"225px",textAlign:"center",paddingTop:"10px"}}> 
                                    <img src="https://s3.bmp.ovh/imgs/2023/01/05/8de8647f3c21195a.png" style={{width:"90%",height:"215px"}}></img> 
                                        </div>
                                        <div style={{height:"110px",textAlign:"center",display:"flex",justifyContent:"space-between",flexDirection:"column",marginTop:"10px"}}>  
                                            <Link to="/worlds/kjzl6cwe1jw147x91wf42fmo7x2glut25as6g2rtxgcm3n2ebnrsa9l36m286wt" style={{fontSize:"13px",color:"#382110"}}>2057:地堡联邦</Link>
                                            <h6 style={{color:"darkgray",fontWeight:"bold"}}>0xlib</h6>
                                            <div style={{fontSize:"10px",height:"30px",color:"darkgray",textAlign:"center"}}>
                                            <button style={{paddingLeft:"5px",paddingRight:"5px",border:"0px",borderRadius:"3px",background:"#70F3FF",color:"white",}}>Scifi</button>
                                                <button style={{paddingLeft:"5px",paddingRight:"5px",border:"0px",borderRadius:"3px",background:"#AFDD22",color:"white",marginLeft:"5PX"}}>Network State</button>
                                            </div>
                                       
                                    </div>                                         
                                </div>
                               
                                <div style={{width:"23.5%",height:"345px",marginLeft:"10px",background:"#e6e6e6"}} >
                                    <div style={{width:"100%",height:"225px",textAlign:"center",paddingTop:"10px"}}> 
                                         <img src="https://s3.bmp.ovh/imgs/2022/11/16/2756634e32990189.png" style={{width:"90%",height:"215px"}}></img> 
                                        </div>
                                      <div style={{height:"110px",textAlign:"center",display:"flex",justifyContent:"space-between",flexDirection:"column",marginTop:"10px"}}>  
                                            <Link to="/worlds/kjzl6cwe1jw14biu60oolhn37qcck3b88e5og9i3tpiha17rwuk90i5d5db4aun" style={{fontSize:"13px",color:"#382110"}}>昨日循环</Link>
                                            <h6 style={{color:"darkgray",fontWeight:"bold"}}>说得漂亮</h6>
                                            <div style={{fontSize:"10px",height:"30px",color:"darkgray",textAlign:"center"}}>
                                                <button style={{paddingLeft:"5px",paddingRight:"5px",border:"0px",borderRadius:"3px",background:"#70F3FF",color:"white",}}>Scifi</button>
                                            </div>
                                        </div>                                        
                                </div>
                                <div style={{width:"23.5%",height:"345px",marginLeft:"10px",background:"#e6e6e6"}} >
                                    <div style={{width:"100%",height:"225px",textAlign:"center",paddingTop:"10px"}}> 
                                    <img src="https://s3.bmp.ovh/imgs/2022/11/17/2a1038a0bb3f6ab4.jpg" style={{width:"90%",height:"215px"}}></img> 
                                        </div>
                                        <div style={{height:"110px",textAlign:"center",display:"flex",justifyContent:"space-between",flexDirection:"column",marginTop:"10px"}}>  
                                            <Link to="/worlds/kjzl6cwe1jw149stuyam24ppc4y2yo0ltvij97w2anrrzkqzheg4i882f2kjtnx" style={{fontSize:"13px",color:"#382110"}}>天下墨河往事悠</Link>
                                            <h6 style={{color:"darkgray",fontWeight:"bold"}}>莱咪紫墨</h6>
                                            <div style={{fontSize:"10px",height:"30px",color:"darkgray",textAlign:"center"}}>
                                                <button style={{paddingLeft:"5px",paddingRight:"5px",border:"0px",borderRadius:"3px",background:"#B0A4E3",color:"white",}}>Fantasy</button>
                                                <button style={{paddingLeft:"5px",paddingRight:"5px",border:"0px",borderRadius:"3px",background:"#7397AB",color:"white",marginLeft:"5PX"}}>Romance</button>
                                            </div>
                                       
                                        
                                    </div>                                         
                                </div>
                                <div style={{width:"23.5%",height:"345px",background:"white",background:"#e6e6e6",marginTop:"10PX"}} >
                                    <div style={{width:"100%",height:"225px",textAlign:"center",paddingTop:"10px"}}> 
                                    <img src="https://s3.bmp.ovh/imgs/2022/11/30/09bfd16560e9be44.png" style={{width:"90%",height:"215px"}}></img> 
                                        </div>
                                        <div style={{height:"110px",textAlign:"center",display:"flex",justifyContent:"space-between",flexDirection:"column",marginTop:"10px"}}>  
                                            <Link to="/worlds/kjzl6cwe1jw14ak1d1xl77wqwbivtfmy3qjuco6b7qatzh30s75nkq5qelnfqzf" style={{fontSize:"13px",color:"#382110"}}>山海异形图之窫窳</Link>
                                            <h6 style={{color:"darkgray",fontWeight:"bold"}}>fisher </h6>
                                            <div style={{fontSize:"10px",height:"30px",color:"darkgray",textAlign:"center"}}>
                                                <button style={{paddingLeft:"5px",paddingRight:"5px",border:"0px",borderRadius:"3px",background:"#70F3FF",color:"white",}}>Scifi</button>
                                                <button style={{paddingLeft:"5px",paddingRight:"5px",border:"0px",borderRadius:"3px",background:"#B0A4E3",color:"white",marginLeft:"5PX"}}>Fantasy</button>
                                            </div>
                                       
                                    </div>                                         
                                </div>

                            
                                <div style={{width:"23.5%",height:"345px",marginLeft:"10px",background:"#e6e6e6",marginTop:"10PX"}} >
                                    <div style={{width:"100%",height:"225px",textAlign:"center",paddingTop:"10px"}}> 
                                    <img src="https://s3.bmp.ovh/imgs/2022/12/12/5443f0fccb36e20b.jpeg" style={{width:"90%",height:"215px"}}></img> 
                                        </div>
                                        <div style={{height:"110px",textAlign:"center",display:"flex",justifyContent:"space-between",flexDirection:"column",marginTop:"10px"}}>  
                                            <Link to="" style={{fontSize:"13px",color:"#382110"}}>2057:United Bunkers</Link>
                                            <h6 style={{color:"darkgray",fontWeight:"bold"}}>0xlib</h6>
                                            <div style={{fontSize:"10px",height:"30px",color:"darkgray",textAlign:"center"}}>
                                                <button style={{paddingLeft:"5px",paddingRight:"5px",border:"0px",borderRadius:"3px",background:"#70F3FF",color:"white",}}>Scifi</button>
                                                <button style={{paddingLeft:"5px",paddingRight:"5px",border:"0px",borderRadius:"3px",background:"#AFDD22",color:"white",marginLeft:"5PX"}}>Network State</button>
                                            </div>
                                       
                                    </div>                                         
                                </div>

                                <div style={{width:"23.5%",height:"345px",marginLeft:"10px",background:"#e6e6e6",marginTop:"10PX"}} >
                                        <div style={{width:"100%",height:"225px",textAlign:"center",paddingTop:"10px"}}> 
                                            <img src="https://s3.bmp.ovh/imgs/2022/11/17/1e8d8ea3780a0f2f.jpg" style={{width:"90%",height:"215px"}}></img> 
                                            </div>
                                        <div style={{height:"110px",textAlign:"center",display:"flex",justifyContent:"space-between",flexDirection:"column",marginTop:"10px"}}>  
                                            <Link to="/worlds/kjzl6cwe1jw148rv8h8px30sxnlsiz36b5sshb76sdn9kp68qztemehlnkvop9o" style={{fontSize:"13px",color:"#382110"}}>春风重九有暗香</Link>
                                            <h6 style={{color:"darkgray",fontWeight:"bold"}}>莱咪紫墨</h6>
                                            <div style={{fontSize:"10px",height:"30px",color:"darkgray",textAlign:"center"}}>
                                                <button style={{paddingLeft:"5px",paddingRight:"5px",border:"0px",borderRadius:"3px",background:"#FF7500",color:"white",}}>Romance</button>
                                                <button style={{paddingLeft:"5px",paddingRight:"5px",border:"0px",borderRadius:"3px",background:"#75878A",color:"white",marginLeft:"5PX"}}>Minguo</button>
                                            </div>
                                        </div>                                         
                                    </div>
                                    <div style={{width:"23.5%",height:"345px",marginLeft:"10px",marginTop:"10PX"}} >
                                        
                                                                               
                                    </div>

                             
                                </div>
                        </div>
                       
                     
                      </div>

                      <div style={{width:"70%",minWidth:"920px",marginTop:"120px",marginLeft:"15%"}}>
                        <div style={{display:"flex",justifyContent:"space-between",textAlign:"center"}}>
                            <h3 className='headers' style={{fontWeight:"bold",fontSize:"30PX"}}>INFORMATION</h3>
                            <div style={{width:"70px",textAlign:"right",paddingRight:"5PX"}}>
                                <Link style={{color:"lightgray",fontWeight:"bold"}} to="/Information">more</Link> </div>
                        </div>
                        <div style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
                            <div style={{width:"31.5%",height:"300px",borderRadius:"5px",boxSizing:"border-box",overflow:"hidden",background:"#FFF",boxShadow:"2px 2px 32px #0f28461a, 2px 4px 4px #08233014"}}>
                                <div style={{height:"140px",boxSizing:"border-box",overflow:"hidden"}}>
                                    <img src="https://s3.bmp.ovh/imgs/2022/12/13/f6e86679316504a3.png" style={{width:"100%"}}></img>
                                </div>
                                <div style={{padding:"5px",lineHeight:"20px",background:""}}>
                                    <Link style={{fontSize:"16PX",fontWeight:"bold"}} to="/Information/kjzl6cwe1jw148ysk5gtav8w3x2229kvsxdws0qzuk2s1i24q8h4pl49xxfzczf">something you maybe would like to know about quillink</Link>
                                    <span style={{fontSize:"14px",color:"darkgray",fontWeight:"light"}}>Quillink is built for story creators and their fans.core members of quillink ourselves are both story creators and fans......</span>
                                    <br></br>
                                    <br></br>
                                    <span style={{color:"lightgray"}}>2022/10/31 21:46:00</span>
                                </div>
                            </div>
                            <div style={{width:"31.5%",height:"300px",borderRadius:"5px",boxSizing:"border-box",overflow:"hidden",background:"#FFF",boxShadow:"2px 2px 32px #0f28461a, 2px 4px 4px #08233014"}}>
                                <div style={{height:"140px",boxSizing:"border-box",overflow:"hidden"}}>
                                    <img src="https://149845544.v2.pressablecdn.com/wp-content/uploads/2016/04/blog_top-image_CoCreationHeader.jpg" style={{width:"100%"}}></img>
                                </div>
                                <div style={{padding:"5px",lineHeight:"20px",background:""}}>
                                    <p style={{fontSize:"16PX",fontWeight:"bold"}}>how to co-create something fantastic with community members in Quillink</p>
                                    <span style={{fontSize:"14px",color:"darkgray",fontWeight:"light"}}>token-gated community,vote to create, give every bit of contribution rewards......</span>
                                    <br></br>
                                    <br></br>
                                    <span style={{color:"lightgray"}}>2022/10/31 21:46:00</span>
                                </div>
                            </div>
                            <div style={{width:"31.5%",height:"300px",borderRadius:"5px",boxSizing:"border-box",overflow:"hidden",background:"#FFF",boxShadow:"2px 2px 32px #0f28461a, 2px 4px 4px #08233014"}}>
                                <div style={{height:"140px",boxSizing:"border-box",overflow:"hidden"}}>
                                    <img src="https://s3.bmp.ovh/imgs/2022/12/13/7ccc6b018106db9d.png" style={{width:"100%"}}></img>
                                </div>
                                <div style={{padding:"5px",lineHeight:"20px",background:""}}>
                                    <p style={{fontSize:"16PX",fontWeight:"bold"}}>offical fantasy series will be released soon</p>
                                    <span style={{fontSize:"14px",color:"darkgray",fontWeight:"light"}}>
                                        The gate to the new world has been opened,The group sleeping for centuries is waking up,everyone is tired .......</span>
                                    <br></br>
                                    <br></br>
                                    <span style={{color:"lightgray"}}>2022/10/31 21:46:00</span>
                                </div>
                            </div>
                        </div>
                        <div style={{width:"100%",display:"flex",justifyContent:"space-between",marginTop:"20PX"}}>
                        <div style={{width:"31.5%",height:"300px",borderRadius:"5px",boxSizing:"border-box",overflow:"hidden",background:"#FFF",boxShadow:"2px 2px 32px #0f28461a, 2px 4px 4px #08233014"}}>
                                <div style={{height:"140px",boxSizing:"border-box",overflow:"hidden"}}>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_3BqYiFVVn-mg5IEHMolCnV0RnZthKOGH7Q&usqp=CAU" style={{width:"100%"}}></img>
                                </div>
                                <div style={{padding:"5px",lineHeight:"20px",background:""}}>
                                    <p style={{fontSize:"16PX",fontWeight:"bold"}}>offical fantasy series will be released soon</p>
                                    <span style={{fontSize:"14px",color:"darkgray",fontWeight:"light"}}>
                                        The gate to the new world has been opened,The group sleeping for centuries is waking up,everyone is tired .......</span>
                                    <br></br>
                                    <br></br>
                                    <span style={{color:"lightgray"}}>2022/10/31 21:46:00</span>
                                </div>
                            </div>
                            <div style={{width:"31.5%",height:"300px",borderRadius:"5px",boxSizing:"border-box",overflow:"hidden"}}>
                             
                            </div>
                            <div style={{width:"31.5%",height:"300px",borderRadius:"5px",boxSizing:"border-box",overflow:"hidden"}}>
                              
                            </div>
                          
                        </div>
                    { /*   {infos?<List 
                            bordered={false}
                            dataSource={infos}
                            style={{height:"100px",padding:"0px",margin:"0px",}}
                            renderItem={(item) => (
                                <List.Item style={{display:"flex",flexDirection:"column",justifyContent:"flex-start"}}> 
                                    <div style={{width:"100%",display:"flex",justifyContent:"space-between",height:"60px",background:"white",fontSize:"15PX",fontWeight:"BOLD"}}>
                                        <a style={{width:"80%",height:"60px",lineHeight:"60px",textAlign:"left",paddingLeft:"10px",fontSize:"20px"}}><Link style={{color:"#685e48"}} to={ '/Information/'+item.id }>{item.title}</Link></a>
                                        <a style={{width:"20%",height:"60px",lineHeight:"60px",textAlign:"right",paddingRight:"10px",fontSize:"12PX",color:"lightgray"}}>{item.date}</a>
                                    </div>
                                    <div style={{fontSize:"18PX",padding:"0px 10px ",borderRadius:"5px",color:"#031b4e",lineHeight:"20PX",fontStyle:"italic"}}>{item.content}......</div>
                                    
                                </List.Item>
                            )}
                            />
                            :<div>
                                  <Space>
                                  <LoadingOutlined style={{color:"green",fontSize:"14PX",marginRight:"20px"}} ></LoadingOutlined>
                                </Space>
                          <span style={{fontStyle:"italic"}}>retrieving infos from blockchain......</span></div>}
                          */}
                      </div>
                            
                    

                      <div className="community" style={{marginTop:"120px",width:"70%",minWidth:"920px",marginLeft:"15%"}}>
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                            <h3 className='headers' style={{fontWeight:"bold",fontSize:"30PX"}}>VOICES</h3>
                            <div style={{width:"70px",textAlign:"right",paddingRight:"5PX"}}>
                                <Link style={{color:"lightgray",fontWeight:"bold"}} to="/Community">more</Link> </div>
                        </div>
                        
                        {voices?<List

                            grid={{
                                column: 3,
                                gutter: 16,
                              }}
                           
                            dataSource={voices}
                            renderItem={(item) => (
                                <List.Item style={{height:"270px",boxShadow:"2px 2px 32px #0f28461a, 2px 4px 4px #08233014",padding:"10px",background:"white"}} >
                                    <div>
                                        <div style={{height:"50px",padding:"10px",display:"flex",justifyContent:"space-between",background:"#f6f6f1",margin:"-10PX"}}>
                                           <div>
                                            <span style={{fontSize:"15PX"}}>{item.content.data.voiceman}</span></div> 
                                            <div>
                                           <a href={item.content.data.link} style={{color:"#69a794"}}>source</a>
                                            </div>
                                        </div>
                                    <div style={{height:"200px",display:"flex",flexDirection:"column",justifyContent:"space-between",marginTop:"30PX"}}>
                                        <div style={{width:"100%",fontSize:"14px",height:"140px",boxSizing:"border-box",overflow:"clip",color:"#50616D", whiteSpace: "pre-line ",lineHeight:"160%" }}>{item.content.body}</div>
                                        <div style={{height:"20px",lineHeight:"30px",fontStyle:"italic",marginBottom:"10PX",textAlign:"right",color:"darkgray"}}>
                                            <span>{item.content.data.date}</span>
                                    </div></div>
                                  
                                    </div>
                                </List.Item>
                            )}
                            />:<div>
                                  <Space>
                                  <LoadingOutlined style={{color:"green",fontSize:"14PX",marginRight:"20px"}} ></LoadingOutlined>
                                </Space>
                          <span style={{fontStyle:"italic"}}>retrieving community voices from blockchain data</span></div>}
                        </div>
            
                  </div>

                      
             
        )

}

