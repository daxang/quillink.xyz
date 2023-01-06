import React, { useState,useEffect } from 'react'
import { BrowserRouter as Router, useLocation,Link,withRouter,useNavigate} from "react-router-dom";
import { Layout,Collapse,Input,Button,Form,Modal,Tooltip,Space   } from 'antd'
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
export default function Edit() {
  let navigate = useNavigate()
  const[user,setUser]=useState()
  const [editor, setEditor] = useState(null) // 存储 editor 实例
  const [html, setHtml] = useState()
  const[title,setTitle]=useState()
  const [open,setOpen]=useState(false)
  const [nocontent,setNocontent]=useState("<p><br></p>")
  async function getUserData(){
      let res = await orbis.isConnected()
      setUser(res.did)
  }
// 切换语言 - 'en' 或者 'zh-CN'
i18nChangeLanguage('en')
  useEffect(()=>{
      getUserData()
  })

  const location=useLocation()
  const postId=location.pathname.slice(6)
  console.log(postId)

  async function getChapter(){
    let {data,error}= await orbis.getPost(postId)
    if(data){
      console.log(data)
      console.log(data.content.title)
        setTitle(data.content.title)
        if(data.content?.body){
            setHtml(data.content.body)
        }
        else if(data.content?.encrypteBody?.encryptedString != {}){
            let res = await orbis.decryptPost(data.content);
            /** Save in state */
            if(res.status == 300) {
            console.log(res)

            } else {
            setHtml(res.result)
            }
        } else {
            return null;
        }

      }
        
    }
useEffect(()=>{
    getChapter()

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


useEffect(() => {
  return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
  }
}, [editor])
const editorConfig = {
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

  async function editPost(){
    console.log("start to post")
    console.log(html)
    console.log(title)

    const title1=document.getElementsByClassName("title")[0].value
    const token=document.getElementById("tokengate").value
    if(html&&token){
      console.log(token)
      console.log(typeof token)
        let res=  await orbis.editPost(postId,{
          body:html,
          title:title,
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
          navigate("/chapter/"+res.doc)
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
      let res= await orbis.editPost(postId,{
        body:html,
        title:title,
      })
      console.log(res)
      if(res.status==200){
        navigate("/chapter/"+res.doc)
      }else{
        console.log(html)
        alert("failed to create a post")
      }}
  
  
  }


        return (
            
                <div style={{width:"62%",marginLeft:"19%",}}>                                      
                 <div>
                  <span style={{fontSize:"12px",color:"lightgray",fontWeight:"bold"}}>EDIT YOUR CHAPTER</span> </div>
                    <input style={{width:"100%",height:"36px",border:"1px solid lightgray"}} className="title"  defaultValue={title} />

                  <div style={{ border: '1px solid #ccc', zIndex: 100, marginTop: '15px'}}>
                    <Toolbar
                        editor={editor}
                        defaultConfig={toolbarConfig}
                        mode="default"
                        style={{ borderBottom: '1px solid #ccc' }}
                    />
                    <Editor
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
                  <Button style={{background:"#55bb8a",width:"120px",height:"50px",fontSize:"16px",fontWeight:"BOLD",color:"white",borderRadius:"5px"}} onClick={()=>editPost()}>
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
        )
    }

