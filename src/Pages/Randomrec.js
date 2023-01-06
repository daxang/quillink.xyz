import React from 'react'
import { Link } from "react-router-dom";
import {List,} from 'antd'
import 'antd/dist/antd.css'


import reqwest from 'reqwest';


class Randomrec extends React.Component {

    state = {
        initLoading: true,
        loading:false,
    list: [],
        thisistrue:true,
        thisisfalse:false
    };

    componentDidMount() {
        this.getData(20);
    }

    getData = (index) => {
        reqwest({
            url: `https://lessreads.com/renren-admin/api/recomuser/getRandomUser/${index}`,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: res => {
                this.setState({
                        initLoading: false,
                        loading: false,
                        list: res.userEntities,
                    }
                );
            },
        });
    };

    render() {
        const {list}=this.state;
        return (
       
              <div >
                <div className="right-content-col" >
                    <span className="bolder font14px  gray">Get More By Reading Less!</span>
                    <div className="lessreads-introduce">
                        <p>书是人类智慧精髓的最大载体，也是最能启迪智慧的烛炬。几本好书，加上自己的思考和实践，才能让你真正体会到阅读的含义。</p>
                        <p>信息泛滥，草盛豆稀，希望我们每个人都停止去做算法世界的燃料。</p>
                        <p>而Lessreads，想给你找到那些豆苗，也想递给你一颗Red Pill !</p>
                    </div>
                </div>
                <List className="right-content-rol-imgs"
                    grid={{ gutter: 0, column: 4 }}
                    dataSource={list}
                    renderItem={item => (
                    <List.Item >
                        <Link to={'/recommender/'+item.id}>
                        <img height="65px" src={item.avatarUrl}
                                alt={item.name} style={{borderRadius:"5px"}} />
                            </Link>
                    </List.Item>
                    )}
                />
             </div>
        )
    }
}

export default Randomrec
