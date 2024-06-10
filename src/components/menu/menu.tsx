'use client'

import Menu, { MenuProps } from "antd/es/menu/menu"
import HomeOutlined from '@ant-design/icons/HomeOutlined'
import ScheduleOutlined from '@ant-design/icons/ScheduleOutlined'
import CalendarOutlined from '@ant-design/icons/CalendarOutlined'
import ZoomInOutlined from '@ant-design/icons/ZoomInOutlined'
import RightOutlined from '@ant-design/icons/RightOutlined'
import LeftOutlined from '@ant-design/icons/LeftOutlined'
import Button from "antd/es/button/button"
import Link from "next/link"
import { useCheckContext } from "@/lib/check.wrapper"
const MenuApp=()=>{
    const {checked,setChecked} = useCheckContext() as IChecked
    const onClick: MenuProps['onClick'] = (e) => {
      console.log('click ', e);
    };     
    return(
      <div style={{position:"relative"}}>
          <Button
            size="small"
            shape="circle"
            icon={!checked ? <LeftOutlined style={{fontSize:10,color:"#BEBEBE"}}/> : <RightOutlined style={{fontSize:10,color:"#BEBEBE"}}/>}
            onClick={() => setChecked(!checked)}
            style={{
              position:"absolute",
              display:'flex',
              alignItems:"center",
              justifyContent:'center',
              top:30,
              left:checked ? 67 : 242,
              border:"none",
            }}
          />
          <Menu
            onClick={onClick}
            inlineCollapsed={checked}
            style={{background:"#F0F0F0",border:"none",paddingTop:9,paddingRight:10}}
            mode="inline"
            items={[
              {
                key: '1',
                icon: <HomeOutlined style={{fontSize:16}}/>,
                label: <div>
                  <Link href={"/home"} style={{fontSize:17}}>
                     Trang chủ        
                  </Link>
                </div>,
              },
              {
                key: '2',
                icon: <CalendarOutlined style={{fontSize:16}}/>,
                label: <div>
                  <Link href={"/check"} style={{fontSize:17}}>
                     Xem lịch và môn        
                  </Link>
                </div>,
              },
              {
                key: '3',
                icon: <ZoomInOutlined style={{fontSize:16}}/>,
                label: <div>
                  <Link href={"/calendar"} style={{fontSize:17}}>
                     Xem thời khóa biểu        
                  </Link>
                </div>,
              },
              {
                key: '4',
                icon: <ScheduleOutlined style={{fontSize:16}}/>,
                label: <div>
                  <Link href={"/schedule"} style={{fontSize:17}}>
                     Đăng ký môn học        
                  </Link>
                </div>,
              }
            ]}
          />
      </div>
    )
}
export default MenuApp