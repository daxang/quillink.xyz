import React, { useState,useEffect } from 'react'
import { Layout,Collapse,Input,Button,Form,Modal,Tooltip,Space   } from 'antd'
import { BrowserRouter as Router, useLocation,Link,useNavigate  } from "react-router-dom";
import 'antd/dist/antd.min.css'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { DomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Orbis } from "@orbisclub/orbis-sdk"
import { i18nChangeLanguage } from '@wangeditor/editor'
import {
  LoadingOutlined,
} from '@ant-design/icons';





let orbis = new Orbis();
export default function Write() {
  let navigate = useNavigate()
  const[user,setUser]=useState()
  const [editor, setEditor] = useState(null) // 存储 editor 实例
  const [html, setHtml] = useState()

  const location=useLocation()
  const channelid=location.pathname.slice(7)
  const [channelname,setChannelname]=useState()
  const [open,setOpen]=useState(false)
  const [nocontent,setNocontent]=useState("<p><br></p>")

  async function getUserData(){
      let res = await orbis.isConnected()
      setUser(res.did)
  }
// 切换语言 - 'en' 或者 'zh-CN'
i18nChangeLanguage('en')
  useEffect(()=>{
    console.log(html)
      getUserData()
  },[])

const toolbarConfig = { }
toolbarConfig.excludeKeys = [
  'headerSelect',
  "blockquote",  
  "lineHeight",
  "emotion",
  "insertTable",
  "todo",
  "group-video",
  "group-image",
  'group-more-style' // 排除菜单组，写菜单组 key 的值即可
]
const editorConfig = {
    placeholder: 'content of your new chapter',
    MENU_CONF:{}
}
editorConfig.MENU_CONF['fontFamily'] = {
  fontFamilyList: [
      '微软雅黑',
      'Arial',
      'Tahoma',
      'Verdana'
  ]
}


useEffect(() => {
  console.log(channelid)
  getchannelname()
  return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
  }
}, [editor])

  async function getchannelname(){
    let { data, error } = await orbis.getChannel(channelid)
    console.log(data)
    if(data){
      setChannelname(data.content.name)
    }

  }
  async function createPosts(){
    setOpen(true)
    console.log("start to post")
    const title=document.getElementsByTagName("input")[0].value
    const token=document.getElementById("tokengate").value
    if(html&&token){
      console.log(token)
      console.log(typeof token)
        let res=  await orbis.createPost({
          body:html,
          title:title,
          context:channelid
        },
        {
          type: "token-gated",
          chain: "ethereum",
          contractType: "ERC721",
          contractAddress: token,
          minTokenBalance: "1"
        })
          console.log(res)
        if(res.status==200){
          setOpen(false)
          navigate("/worlds/"+channelid)
        }else{
          alert("failed to create a post")
        }}
    else if(html==nocontent){
      alert("no content")
      setOpen(false)
    }
    else{
      console.log(html)
      console.log("no contract address")
      let res= await orbis.createPost({
        body:html,
        title:title,
        context:channelid
      })
      console.log(res)
      if(res.status==200){
        navigate("/worlds/"+channelid)
      }else{
        console.log(html)
        alert("failed to create a post")
      }}
  
  }


  const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator' ]

        return (
            
                <div style={{width:"62%",marginLeft:"19%",}} >   

                 <div style={{fontSize:"16px"}}>
                   <span style={{color:"#55bb8a",fontWeight:"bold"}}>POST A NEW CHAPTER IN</span> 
                    <Button style={{marginLeft:"10px",background:"#55bb8a",borderRadius:"5PX",color:"white",fontWeight:"BOLD"}} disabled>
                      {channelname}
                      </Button>

                  <div className='input' style={{marginTop:"30PX"}}>
                    <div className='chapterTitle'>
                    <Input className="title"  placeholder="chapter title" />
                    </div>
                    </div>


                  <div style={{ border: '1px solid #ccc', zIndex: 100, marginTop: '15px'}}>
                    <Toolbar
                        editor={editor}
                        defaultConfig={toolbarConfig}
                        mode="default"
                        style={{ borderBottom: '1px solid #ccc' }}
                    />
                    <Editor
                        defaultConfig={editorConfig}
                        value={html}
                        onCreated={setEditor}
                        onChange={editor => setHtml(editor.getHtml())}
                        mode="default"
                        style={{ height: '500px' }}
                    />
                  </div>

              <div style={{ marginTop: '15px',marginBottom:"30PX" }}>
                <Tooltip title="optional" color="#55bb8a"> <span style={{color:"darkgray",fontWeight:"bold"}}>TOKEN GATE</span> </Tooltip>
                <span style={{marginLeft:"11px",fontSize:"10px",fontStyle:"italic",color:"gray"}}>only support ERC 721 & minTokenBalance is setted 1 by default</span>
                <Input placeholder='Input contract address' id="tokengate" />
              </div>

              <div style={{margin:"0",textAlign:"center"}}>
                <div style={{}}> 
                  <Button style={{background:"#55bb8a",width:"120px",height:"50px",fontSize:"16px",fontWeight:"BOLD",color:"white",borderRadius:"5px"}} onClick={()=>createPosts()}>
                    SUBMIT
                    </Button>
                    </div>
                  <Modal centered
                          open={open}
                          footer={null}
                          style={{textAlign:"center"}}
                          >
                          <Space>
                            <LoadingOutlined style={{color:"green",fontSize:"14PX",marginRight:"20px"}} ></LoadingOutlined>
                          </Space>
                    <span style={{fontStyle:"italic"}}>submitting your chapter</span>
                  </Modal>
                    </div>
                  </div>

                </div>  

             
        )
    }

