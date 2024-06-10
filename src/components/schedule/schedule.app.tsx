'use client'

import { GetClassSubject, GetStudentWithClass, UpdateClassSubject } from "@/utils/action/action";
import Checkbox from "antd/es/checkbox";
import notification from "antd/es/notification";
import Popover from "antd/es/popover";
import Spin from "antd/es/spin";
import Table from "antd/es/table";
import theme from "antd/es/theme";
import { useSession } from "next-auth/react";
import { useState } from "react";
import DrawerSchedule from "./drawer.schedule";
import { useCheckContext } from "@/lib/check.wrapper";

interface Iprops{
    semester:ISemester | undefined,
    subjects:ISemesterSubject_1[],
    classes:IMyClass[]
}
const columns = [
    {
        title: 'Ca',
        dataIndex: 'key',
        width:'4%'
    },
    {
        title: <div style={{display:"flex",justifyContent:'center'}}>Thứ 2</div>,
    },
    {
        title: <div style={{display:"flex",justifyContent:'center'}}>Thứ 3</div>,
    },
    {
        title: <div style={{display:"flex",justifyContent:'center'}}>Thứ 4</div>,
    },
    {
        title: <div style={{display:"flex",justifyContent:'center'}}>Thứ 5</div>,
    },
    {
        title: <div style={{display:"flex",justifyContent:'center'}}>Thứ 6</div>,
    },
    {
        title: <div style={{display:"flex",justifyContent:'center'}}>Thứ 7</div>,
    },
    {
        title: <div style={{display:"flex",justifyContent:'center'}}>Chủ nhật</div>,
        width:'14%'
    },
];
const data = [
    {
      key: '1',
    },
    {
      key: '2',
    },
    {
      key: '3',
    },
    {
      key: '4',
    },
    {
      key: '5',
    },
    {
      key: '6',
    },
    {
      key: '7',
    },
    {
      key: '8',
    },
    {
      key: '9',
    },
    {
      key: '10',
    },
    {
      key: '11',
    },
    {
      key: '12',
    },
    {
      key: '13',
    },
    {
      key: '14',
    },
];
const shiftClass: { [key: number]: number } = {
   1:95,2:148,3:203,4:258,6:368,8:478,9:533,10:587
}
const heightClass: { [key: number]: number } = {
  1:103,2:158,4:268
}
const weekDay1: { [key: number]: number } = {
  2:58,3:244,4:429,5:614,6:800,7:984,8:1170
}
const weekDay2: { [key: number]: number } = {
  2:54,3:215,4:375,5:535,6:695,7:855,8:1016
}
const ScheduleApp=(props :Iprops)=>{
    const{data:session} = useSession()
    const {semester,subjects,classes} = props
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [openDrawerStudent, setOpenDrawerStudent] = useState(false);
    const {checked} = useCheckContext() as IChecked
    const [loading, setLoading] = useState<boolean>(false);
    const [subjectClass,setSubjectClass] = useState<IClass[]>([])
    const [subjectId,setSubjectId] = useState<string>()
    const [dataStudent,setDataStudent] = useState<IStudent_1[]>([])
    const [dataItem,setDataItem] = useState<IMyClass>()
    const showDrawerSubject = async (value :IMyClass) => {
      setDataItem(value)
      console.log(value.subjectId,semester?.semesterId ?? '',value.classNumber)
      const result = await GetStudentWithClass(value.subjectId,semester?.semesterId ?? '',value.classNumber)
      if(result.statusCode === "200"){
         setDataStudent(result.data ?? [])
      }
      setOpenDrawerStudent(true);
    };
    const onCloseDrawerSubject = () => {
      setDataStudent([])
      setOpenDrawerStudent(false);
    };
    const onChange = async (classNumber:number,e:boolean) => {
        setLoading(true)
          const result = await UpdateClassSubject(
            subjectId ?? "",semester?.semesterId ?? "",session?.user.studentId ?? '',
            classNumber,e)
          if(result.statusCode === "200" || result.statusCode === "201"){
            notification.success({
                message:"Thành công!!!",
                description: result.message + ` ${result.subjectName ?? result.subjectName ?? ""}`,
                duration:2,
                placement:"topRight"
            })
          }else if(result.statusCode === "400" || result.statusCode === "401"){
            notification.error({
                message:"Thất bại!!!",
                description: result.message + ` ${result.subjectName ?? result.subjectName ?? ""}`,
                duration:5,
                placement:"topRight"
            })
          }
        await handleGetSubjectClass(subjectId ?? "")
        setLoading(false)
    };
    const handleGetSubjectClass = async (id: string) => {
        setSubjectId(id)
        const result = await GetClassSubject(id,semester?.semesterId ?? "",session?.user.studentId ?? '')
        if(result.statusCode === "200"){
            setSubjectClass(result.data ?? [])
        }
    }
    return(
        <div style={{width:'100%'}}>
            <div style={{display:'flex',gap:7}}>
                <div style={{fontFamily:"monospace",fontSize:15,opacity:0.5}}>Đăng ký</div>
                <div style={{marginTop:-3}}>/</div>
                <div style={{fontFamily:"monospace",fontSize:15,opacity:0.9,color:'red'}}>Đăng ký học</div>
            </div>
            {
              semester?.name
              ?
              <>
                  <div style={{display:'flex',gap:8,marginTop:15}}>
                <div style={{fontSize:25,fontWeight:"bolder",fontStyle:"italic",opacity:0.8}}>
                  Bạn đang đăng ký học kì : 
                </div>
                <div style={{marginTop:-4,fontSize:30,fontStyle:"italic",opacity:0.8,fontWeight:'bold'}}>
                   {semester?.semesterName}
                </div>
            </div>
            <div style={{background:colorBgContainer,borderRadius:borderRadiusLG,marginTop:15,marginBottom:10}}>
               <div style={{
                  background: colorBgContainer,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)', 
                  gap: '20px', 
                  padding: '30px',
                  borderRadius:borderRadiusLG
               }}>
                  {subjects.map((item, index) => (
                      <Popover 
                          key={index}
                          content={
                              <div>
                                  <div>Môn mà bạn có thể học</div>
                              </div>
                          } 
                          trigger="hover"
                      >
                          <div onClick={() => handleGetSubjectClass(item.subjectId)} 
                              style={{
                                  height: 40,
                                  boxSizing: "border-box",
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: borderRadiusLG,
                                  background: "whitesmoke",
                                  fontSize: 17,
                                  wordWrap: 'break-word',
                                  cursor: 'pointer',
                                  fontFamily: 'initial',
                                  color: 'blue',

                              }}
                          >
                              {item.subjectName}
                          </div>
                      </Popover>
                  ))}
               </div>
            </div>
            {
                subjectClass.length > 0 
                ?
                  <Spin spinning={loading}>
                    <div style={{background:colorBgContainer,
                        borderRadius:borderRadiusLG,marginTop:15,marginBottom:10,
                        display:'flex',flexDirection:"column",gap:15,
                        padding:"10px 0 10px 50px"
                        }}>
                        {subjectClass.map((item,index)=>{
                            return(
                                <div key={index} style={{display:'flex',gap:20}}>
                                    <Checkbox onChange={(e)=>onChange(item.classNumber,e.target.checked)} checked={item.isChecked}/>
                                    <div style={{fontSize:17,fontFamily:"monospace",color:'#2F4F4F'}}>{item.name}</div>
                                </div>
                            )
                        })}
                    </div>
                  </Spin>
                :
                <></>
            }
            <div style={{background:colorBgContainer,
                        borderRadius:borderRadiusLG,position:'relative',marginBottom:20
                        }}>
              <div style={{display:'flex',
                   justifyContent:'center',
                   padding:"10px 0 0px 0",fontSize:19,fontWeight:'bold',
                   fontFamily:"revert-layer",
                   color:'#B22222'
                   }}>Danh sách các môn đã đăng ký</div>
              <Table columns={columns} dataSource={data} bordered={true} pagination={false} />
              {
                classes.map((item,index)=>{
                  const myTop = shiftClass[item.onShift]
                  const myHeight = heightClass[item.endShift-item.onShift]
                  const myLeft = checked ? weekDay1[item.weekDay] : weekDay2[item.weekDay]
                  return(
                    <div key={index} style={{position:"absolute",display:"flex",
                       flexDirection:'column',alignItems:"center",justifyContent:'center',background:"#FF7F50",
                       gap:5,width:checked ? 177 : 150,height:myHeight,top:myTop,left:myLeft,
                       borderRadius:borderRadiusLG,fontSize:16,cursor:"pointer"
                       }} onClick={()=>showDrawerSubject(item)}>
                       <div>{`${item.name}.${item.classNumber}${item.describe ? `_${item.describe}` : ""}`}</div>
                       <div>{item.classroom}</div>
                    </div>
                  )
                })
              }
            </div>
              </>
              :
              <div style={{fontSize:25,fontWeight:"bolder",fontStyle:"italic",opacity:0.8,marginBottom:600,marginTop:10}}>Bạn chưa đăng ký học học</div>
            }
            
            <DrawerSchedule
                open={openDrawerStudent}
                onClose={onCloseDrawerSubject}
                data={dataStudent}
                dataItem={dataItem}           
            />
        </div>
    )
}
export default ScheduleApp