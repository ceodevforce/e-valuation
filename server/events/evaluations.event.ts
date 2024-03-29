import { H3Event, H3Error, defineEventHandler, createError, send } from 'h3'
import { serverSupabaseClient, serverSupabaseUser} from '#supabase/server'


interface SelectedDataItem {
  id: number;
  name: string;
  isSelected: boolean
}

interface DataWithSelectedDataItems<T extends SelectedDataItem> {
  items: T[];
}
interface LessonData extends DataWithSelectedDataItems<SelectedDataItem>{
  strength: DataWithSelectedDataItems<SelectedDataItem>
  weakness: DataWithSelectedDataItems<SelectedDataItem>
  wayForward: DataWithSelectedDataItems<any>
}

interface StudentData extends DataWithSelectedDataItems<SelectedDataItem> {
  studentStrength: DataWithSelectedDataItems<any>
  studentWeakness: DataWithSelectedDataItems<any>
  studentWayforward: DataWithSelectedDataItems<any>
}

interface TeacherData extends DataWithSelectedDataItems<any> {
  teacherStrength: DataWithSelectedDataItems<any>
  teacherWeakness: DataWithSelectedDataItems<any>
  teacherWayforward: DataWithSelectedDataItems<any>
}
interface IEvaluations {
  lessonData: LessonData[];
  studentData: StudentData[];
  teacherData: TeacherData[];
}


const createEvaluation = defineEventHandler(async (event) => {
  try {
    const body = await readBody<IEvaluations>(event)
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient(event)


    if (user) {
      const { data, error } = await client.from('evlauation_one').insert([
        {
          lesson_data: body.lessonData,
          student_data: body.studentData,
          teacher_data: body.teacherData
        }
      ])
    }
  } catch (e) {
    console.error(e)
    throw createError({
      statusCode: 400,
      statusMessage: 'Issue with creating evaluation'
    })
  }
})
