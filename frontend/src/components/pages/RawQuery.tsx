import { useNavigate } from "react-router";
import Button from "../Button";
import ContentBox from "../content/ContentBox";
import Controller from "../content/Controller";
import Searchbar from "../content/Searchbar";
import Layout from "../Layout";
import Sidebar from "../Sidebar";
import Title from "../Title";
import ViewScreen from "../ViewScreen";
import { useEffect, useState } from "react";
import ClassroomContent from "../content/ClassroomContent";
import Swal from "sweetalert2";

export default function RawQuery() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState<[{
    student: {
      studentid: number
      prefixid: number
      genderid: number
      gradelevelid: number
      firstname: string
      lastname: string
      birthdate: string
    }
    gender: {
      genderid: number
      gendername: string
    }
    classroom: {
      classroomid: number
      homeroom_teacher: string
      classname: string
      academic_year: number
    }
  }]>()

  useEffect(()=>{
    fetchData()
  }, [])

  const fetchData = async ()=>{
    const res = await fetch(process.env.REACT_APP_PUBLIC_API + "/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `
          query RawQuery {
            rawQuery {
              student {
                studentid
                prefixid
                genderid
                gradelevelid
                firstname
                lastname
                birthdate
              }
              gender {
                genderid
                gendername
              }
              classroom {
                classroomid
                homeroom_teacher
                classname
                academic_year
              }
            }
          }
        `
      })
    })
    const json = await res.json()
    setData(json.data.rawQuery)
  }

  return (
    <ViewScreen>
      <Title />
      <Layout>
        <Sidebar />
        <div className="size-full pt-20">
          <div className="w-full p-5">
            <div
              id="header"
              className="w-full h-[50px] flex rounded-t-full border bg-[#BDBEFF]"
            >
              <div className="w-3/12 h-full flex place-items-center place-content-center">
                <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
                  ชื่อ-นามสกุล นักเรียน
                </h1>
              </div>
              <div className="w-3/12 h-full flex place-items-center place-content-center">
                <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
                  เพศ
                </h1>
              </div>
              <div className="w-3/12 h-full flex place-items-center place-content-center">
                <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
                  วันเกิด
                </h1>
              </div>
              <div className="w-3/12 h-full flex place-items-center place-content-center">
                <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
                  ชื่อห้องเรียน
                </h1>
              </div>
            </div>

            <div className="w-full h-4/5 bg-white shadow-[16px_14px_24px_rgba(0,0,0,0.25)]">
              {data?.map((dat) => {
                return (
                  <div
                    key={dat.student.studentid}
                    className="w-full h-[45px] flex hover:bg-[#D9D9D9]"
                  >
                    <div className="w-3/12 h-full flex place-items-center place-content-center">
                      <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
                        {dat.student.firstname} {dat.student.lastname}
                      </h1>
                    </div>
                    <div className="w-3/12 h-full flex place-items-center place-content-center">
                      <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
                        {dat.gender.gendername}
                      </h1>
                    </div>
                    <div className="w-3/12 h-full flex place-items-center place-content-center">
                      <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
                        {dat.student.birthdate.split("T")[0]}
                      </h1>
                    </div>
                    <div className="w-3/12 h-full flex place-items-center place-content-center">
                      <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
                        {dat.classroom.classname}
                      </h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </ViewScreen>
  );
}
