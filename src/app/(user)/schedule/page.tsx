import { authOptions } from "@/app/api/auth/auth.options"
import ScheduleApp from "@/components/schedule/schedule.app"
import { sendRequest } from "@/utils/api"
import { getServerSession } from "next-auth/next"

const Schedule=async()=>{
    const session = await getServerSession(authOptions)
    const semester = await sendRequest<IBackendRes<ISemester>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Semester/one`,
      method: "GET",
      nextOption: {
          cache: 'no-store',
    }
   })
   const subjects = await sendRequest<IBackendRes<ISemesterSubject_1[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Student/subject`,
    method: "POST",
    body:{
      majorsId: session?.user.majorsId,
      studentId: session?.user.studentId
    },
    nextOption: {
        cache: 'no-store',
  }
    })
    const classes = await sendRequest<IBackendRes<IMyClass[]>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Student/${session?.user.studentId}`,
      method: "GET",
      nnextOption: {
        next : {tags: ['classlist_1']},
        cache: 'no-store'
     }
    })
    return(
        <div>
          <ScheduleApp semester={semester.data}
                       subjects={subjects.data ? subjects.data : []}
                       classes={classes.data ? classes.data : []}
          />
        </div>
    )
}
export default Schedule