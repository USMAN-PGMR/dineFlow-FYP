import React from 'react'


// import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Profile from '../../copmonents/Dashbord/Profile';
import { items } from './SidesItems/Items';
import  Routes  from './Routes';
const { Header, Content, Footer, Sider } = Layout;

export default function Dashhome() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider className='text-white'
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Profile/>
        <Menu
        className=''
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={['4']}
          items={items
          //   [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
          //   (icon, index) => ({
          //     key: String(index + 1),
          //     icon: React.createElement(icon),
          //     label: `nav ${index + 1}`,
          //   }),
          // )
        }
        />
      </Sider>
      <Layout>
        <Header
            theme="dark" 
            className='text-white pt-3 ps-3'
        >
          <h4>Dashboard</h4>
          </Header>
        <Content className='d-block'
          
        >
          <Routes/>
          {/* <div
            style={{
              padding: 24,
              minHeight: 360,
              // background: colorBgContainer,
            }}
          >
            content
          </div> */}
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            background:'#001529',
            color:'white',
            padding:10,
          }}
        >
           ©2023 Powered By Muhammad Usman Ali
        </Footer>
      </Layout>
    </Layout>
  );
}
