import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { deletes } from "../Icon";
import Select from "react-select";
import Button from "../Button";

export default function StudentClassroomContent() {
  const param = useParams();

  const [student, setStudent] = useState<Number>();
  const [students, setStudents] = useState<
    [
      {
        value: number;
        label: string;
      }
    ]
  >();
  const [data, setData] = useState<
    [
      {
        studentClassroom: {
          student_classroom_id: number;
          studentid: number;
          classroomid: number;
        };
        classroom: {
          classroomid: number;
          homeroom_teacher: string;
          classname: string;
          academic_year: number;
        };
        student: {
          studentid: number;
          prefixid: number;
          genderid: number;
          gradelevelid: number;
          firstname: string;
          lastname: string;
          birthdate: string;
        };
      }
    ]
  >();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(process.env.REACT_APP_PUBLIC_API + "/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        {
          students(search: "", limit: 9999999, page: 1) {
            student {
              studentid
              firstname
              lastname
            }
          }
          studentClassroom(classroomid: ${param.classroomid}) {
            studentClassroom {
              student_classroom_id
              studentid
              classroomid
            }
            classroom {
              classroomid
              homeroom_teacher
              classname
              academic_year
            }
            student {
              studentid
              prefixid
              genderid
              gradelevelid
              firstname
              lastname
              birthdate
            }
          }
        }
        `,
      }),
    });
    const json = await res.json();
    setData(json.data.studentClassroom);
    setStudents(
      json.data.students.map(
        (student: {
          student: {
            studentid: number;
            firstname: string;
            lastname: string;
          };
        }) => ({
          value: student.student.studentid,
          label: `${student.student.firstname} ${student.student.lastname}`,
        })
      )
    );
  };

  const addStudent = async () => {
    const res = await fetch(process.env.REACT_APP_PUBLIC_API + "/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation CreateStudentClassroom {
            createStudentClassroom(
              createStudentClassroomInput: { studentid: ${student}, classroomid: ${param.classroomid} }
            ) {
              student_classroom_id
              studentid
              classroomid
            }
          }
        `,
      }),
    });
    if (!res.ok) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } else {
      fetchData();
      return Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="w-full p-5">
      <div
        id="header"
        className="w-full h-[50px] flex rounded-t-full border bg-[#BDBEFF]"
      >
        <div className="w-9/12 h-full flex place-items-center place-content-center">
          <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
            ชื่อ-นามสกุล นักเรียน
          </h1>
        </div>
        <div className="w-3/12 h-full flex place-items-center place-content-center">
          <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
            ลบนักเรียนจากห้องเรียน
          </h1>
        </div>
      </div>

      <div className="w-full h-4/5">
        {data?.map((dat) => {
          return (
            <div
              key={dat.studentClassroom.student_classroom_id}
              className="w-full h-[45px] flex hover:bg-[#D9D9D9]"
            >
              <div className="w-9/12 h-full flex place-items-center place-content-center">
                <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
                  {dat.student.firstname} {dat.student.lastname}
                </h1>
              </div>
              <div className="w-3/12 h-full flex place-items-center place-content-center">
                <div
                  className="hover:cursor-pointer"
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!",
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        await fetch(
                          process.env.REACT_APP_PUBLIC_API + "/graphql",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              query: `
                                mutation RemoveStudentClassroom {
                                  removeStudentClassroom(student_classroom_id: ${dat.studentClassroom.student_classroom_id}) {
                                    student_classroom_id
                                  }
                                }
                              `,
                            }),
                          }
                        );
                        fetchData();
                        Swal.fire({
                          title: "Deleted!",
                          text: "Your file has been deleted.",
                          icon: "success",
                        });
                      }
                    });
                  }}
                >
                  {deletes}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex place-content-end">
        <div className="w-1/2 flex place-items-center">
          <label className="w-full px-10">
            <h2 className="text-xl font-sans pl-5">เพิ่มนักเรียน</h2>
            <Select options={students} onChange={(e) => setStudent(e?.value)} />
          </label>
          <div className="w-48">
            <Button text="เพิ่มนักเรียน" onClick={addStudent} />
          </div>
        </div>
      </div>
    </div>
  );
}
