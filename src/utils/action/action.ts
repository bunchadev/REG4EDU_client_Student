"use server"

import { revalidateTag } from "next/cache"
import { sendRequest } from "../api"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/auth.options"
// interface IUser{
//   userId : string,
//   userName : string
// }
// export async function UpdateSubject(row :ISubject,key :string,check1 :boolean,check2 :boolean,id :string) {
//     const result = await sendRequest<IBackendRes<ISubject[]>>({
//         url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Subject/update`,
//         method: "POST",
//         body:{
//           majorsId:id,
//           subjectId:key,
//           subjectName: row.subjectName,
//           numberOfCredits: row.numberOfCredits,
//           majorName: row.majorName,
//           subjectCode: row.subjectCode,
//           check1:check1,
//           check2:check2,
//           category:row.category
//         },
//         nextOption: {
//           cache: 'no-store',
//         }
//     })
//     revalidateTag("subjectlistpagination")
//     return result
// }
// export async function CreateSubject(values :ICreateSubject) {
//     const result = await sendRequest<IBackendRes<ICreateSubject>>({
//       url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Subject/create`,
//       method: "POST",
//       body:values,
//       nextOption: {
//         cache: 'no-store',
//       }
//     })
//     revalidateTag("subjectlistpagination")
//     return result
// }
// export async function DeleteSubject(values :string[]) {
//   const result = await sendRequest<IBackendRes<ISubject>>({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Subject/delete`,
//     method: "POST",
//     body:values,
//     nextOption: {
//       cache: 'no-store',
//     }
//   })
//   revalidateTag("subjectlistpagination")
//   return result
// }
// export async function SemesterClassSubject(semesterId :string,subjectId :string) {
//   const result = await sendRequest<IBackendRes<ISemesterClass[]>>({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/SemesterClass`,
//     method: "POST",
//     body:{
//       semesterId: semesterId,
//       subjectId: subjectId
//     },
//     nextOption: {
//       cache: 'no-store',
//     }
//   })
//   return result
// }
// export async function GetSemesterSubject(
//   semesterName: string,
//   majorsCode: string,
//   category: string
// ) {
//   const result = await sendRequest<IBackendRes<ISemesterSubject_1[]>>({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Semester/subject`,
//     method: "POST",
//     body:{
//       semesterName: semesterName,
//       majorsCode: majorsCode,
//       category: category
//     },
//     nextOption: {
//       cache: 'no-store',
//     }
//   })
//   return result
// }
// export async function CreateSemesterSubject(
//   subjectId :string[],
//   semesterName:string
// ) {
//   const result = await sendRequest<IBackendRes<ISemesterSubject_1[]>>({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Semester/create`,
//     method: "POST",
//     body:{
//       subjectId: subjectId,
//       semesterName: semesterName
//     },
//     nextOption: {
//       cache: 'no-store',
//     }
//   })
//   revalidateTag("semesterClassList")
//   return result
// }
// export async function DeleteSemesterSubject(
//    id:string
// ) {
//   const result = await sendRequest<IBackendRes<ISemesterSubject_1[]>>({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Subject/semester/delete`,
//     method: "POST",
//     body:{
//       semesterSubject_Id: id
//     },
//     nextOption: {
//       cache: 'no-store',
//     }
//   })
//   revalidateTag("semesterClassList")
//   return result
// }
// export async function GetClassSubject(
//   subjectId:string,semesterId: string,userId:string
// ) {
//  const result = await sendRequest<IBackendRes<IClass[]>>({
//    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/User/subject/class`,
//    method: "POST",
//    body:{
//     subjectId: subjectId,
//     semesterId: semesterId,
//     userId: userId
//    },
//    nextOption: {
//     //  next : {tags: ['classlist']},
//      cache: 'no-store',
//    }
//  })
//  return result
// }
// export async function UpdateClassSubject(
//   subjectId:string,semesterId: string,userId:string,classNumber:number,isChecked:boolean
// ) {
//  const result = await sendRequest<IBackendClass>({
//    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/User/update/class`,
//    method: "POST",
//    body:{
//     subjectId: subjectId,
//     semesterId: semesterId,
//     userId: userId,
//     classNumber: classNumber,
//     isChecked: isChecked
//    },
//    nextOption: {
//      cache: 'no-store',
//    }
//  })
//  revalidateTag("classlist")
//  return result
// }
// export async function GetAllUsers() {
//  const result = await sendRequest<IBackendRes<IUser[]>>({
//    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/User/all`,
//    method: "GET",
//    nextOption: {
//      cache: 'no-store',
//    }
//  })
//  return result
// }
// export async function UpdateSemesterClass(key :string,data :ISemesterClass) {
//   const result = await sendRequest<IBackendClass>({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/SemesterClass/update`,
//     method: "POST",
//     body:{
//         "semesterClass_Id":key,
//         "name": data.name,
//         "classNumber": data.classNumber,
//         "classroom": data.classroom,
//         "weekDay": data.weekDay,
//         "onShift": data.onShift,
//         "endShift": data.endShift,
//         "numberStudent": data.numberStudent,
//         "number": data.number,
//         "describe": data.describe,
//         "semesterId": data.semesterId,
//         "subjectId": data.subjectId,
//         "userId": data.userName === "Chưa có" ? null : data.userName,
//         "userName": data.userName
//     },
//     nextOption: {
//       cache: 'no-store',
//     }
//   })
//   return result
//  }
//  export async function CreateSemesterClass(semesterName :string,subjectId :string,data :ICreateClass) {
//   const result = await sendRequest<IBackendClass>({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/SemesterClass/create`,
//     method: "POST",
//     body:{
//         "name": data.name,
//         "classNumber": data.classNumber,
//         "classroom": data.classroom,
//         "weekDay": data.weekDay,
//         "onShift": data.onShift,
//         "endShift": data.endShift,
//         "numberStudent": data.numberStudent,
//         "describe": data.describe,
//         "semesterName": semesterName,
//         "subjectId": subjectId
//     },
//     nextOption: {
//       cache: 'no-store',
//     }
//   })
//   return result
//  }
export async function GetClassSubject(
      subjectId:string,semesterId: string,studentId:string
    ) {
     const result = await sendRequest<IBackendRes<IClass[]>>({
       url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Student/group/class`,
       method: "POST",
       body:{
        subjectId: subjectId,
        semesterId: semesterId,
        studentId: studentId
       },
       nextOption: {
        //  next : {tags: ['classlist']},
         cache: 'no-store',
       }
     })
     return result
}
export async function UpdateClassSubject(
      subjectId:string,semesterId: string,studentId:string,classNumber:number,isChecked:boolean
    ) {
     const session = await getServerSession(authOptions);
     const result = await sendRequest<IBackendClass>({
       url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Student/update/class`,
       method: "POST",
       body:{
        subjectId: subjectId,
        semesterId: semesterId,
        userId: studentId,
        classNumber: classNumber,
        isChecked: isChecked
       },
       headers: {
        Authorization: `Bearer ${session?.access_token}`,
       },
       nextOption: {
         cache: 'no-store',
       }
     })
     revalidateTag("classlist_1")
     return result
}

export async function GetStudentWithClass(
  subjectId:string,semesterId:string,classNumber:number
) {
const session = await getServerSession(authOptions);
const result = await sendRequest<IBackendRes<IStudent_1[]>>({
  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Subject/class/student`,
  method: "POST",
  body:{
    semesterId: semesterId,
    subjectId: subjectId,
    classNumber: classNumber
  },
  headers: {
    Authorization: `Bearer ${session?.access_token}`,
  },
  nextOption: {
    cache: 'no-store',
  }
})
return result
}

export async function GetSemester(
  code:string
) {
const result = await sendRequest<IBackendRes<ISemester>>({
  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Semester/${code}`,
  method: "GET",
  nextOption: {
    cache: 'no-store',
  }
})
return result
}

export async function GetClassWithStudent(
  userId: string,
  semesterName: string
) {
const result = await sendRequest<IBackendRes<IMyClass[]>>({
  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Student/classes`,
  method: "POST",
  body:{
    userId: userId,
    semesterName: semesterName
  },
  nextOption: {
    cache: 'no-store',
  }
})
return result
}

export async function SemesterClassSubject(semesterId :string,subjectId :string) {
  const result = await sendRequest<IBackendRes<ISemesterClass[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/SemesterClass`,
    method: "POST",
    body:{
      semesterId: semesterId,
      subjectId: subjectId
    },
    nextOption: {
      cache: 'no-store',
    }
  })
  return result
}