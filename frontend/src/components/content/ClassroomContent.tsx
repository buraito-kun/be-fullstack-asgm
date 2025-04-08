import { useEffect, useState } from "react";
import { deletes, edit } from "../Icon";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { Pagination } from "antd";

type Props = {
  search: string;
};

export default function ClassroomContent({ search }: Props) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [allPage, setAllPage] = useState(1);
  const [data, setData] = useState<
    [
      {
        classroom: {
          classroomid: number;
          homeroom_teacher: string;
          classname: string;
          academic_year: number;
        };
        allPage: number;
      }
    ]
  >();

  useEffect(() => {
    fetchData();
  }, [search, page]);

  const fetchData = async () => {
    const res = await fetch(process.env.REACT_APP_PUBLIC_API + "/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        {
          classrooms(search: "${search}", limit: 10, page: ${page}) {
            classroom {
              classroomid
              homeroom_teacher
              classname
              academic_year
            }
            allPage
          }
        }
        `,
      }),
    });
    const json = await res.json();
    setData(json.data.classrooms);
    setAllPage(json.data.classrooms[0]?.allPage);
  };

  return (
    <div className="w-full h-full p-5">
      <div
        id="header"
        className="w-full h-[9%] flex rounded-t-full border bg-[#BDBEFF]"
      >
        <div className="w-2/12 h-full flex place-items-center place-content-center">
          <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
            เลขที่ห้อง
          </h1>
        </div>
        <div className="w-3/12 h-full flex place-items-center place-content-center">
          <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
            ชื่อห้อง
          </h1>
        </div>
        <div className="w-3/12 h-full flex place-items-center place-content-center">
          <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
            ชื่อครูประจำชั้น
          </h1>
        </div>
        <div className="w-2/12 h-full flex place-items-center place-content-center">
          <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
            ปีการศึกษา
          </h1>
        </div>
        <div className="w-1/12 h-full flex place-items-center place-content-center">
          <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
            แก้ไข
          </h1>
        </div>
        <div className="w-1/12 h-full flex place-items-center place-content-center">
          <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
            ลบ
          </h1>
        </div>
      </div>

      <div className="w-full h-4/5">
        {data?.map((classroom) => {
          return (
            <div
              key={classroom.classroom.classroomid}
              className="w-full h-[10%] flex hover:bg-[#D9D9D9]"
            >
              <div className="w-2/12 h-full flex place-items-center place-content-center">
                <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
                  {classroom.classroom.classroomid}
                </h1>
              </div>
              <div className="w-3/12 h-full flex place-items-center place-content-center">
                <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
                  {classroom.classroom.classname}
                </h1>
              </div>
              <div className="w-3/12 h-full flex place-items-center place-content-center">
                <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
                  {classroom.classroom.homeroom_teacher}
                </h1>
              </div>
              <div className="w-2/12 h-full flex place-items-center place-content-center">
                <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
                  {classroom.classroom.academic_year}
                </h1>
              </div>
              <div className="w-1/12 h-full flex place-items-center place-content-center">
                <div
                  className="hover:cursor-pointer"
                  onClick={() => {
                    navigate(
                      `/editClassroom/${classroom.classroom.classroomid}`
                    );
                  }}
                >
                  {edit}
                </div>
              </div>
              <div className="w-1/12 h-full flex place-items-center place-content-center">
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
                                mutation RemoveClassroom {
                                  removeClassroom(classroomid: ${classroom.classroom.classroomid}) {
                                    classroomid
                                  }
                                }
                              `,
                            }),
                          }
                        );
                        fetchData();
                        Swal.fire({
                          title: "Deleted!",
                          text: "ลบข้อมูลสำเร็จ.",
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
      <div className="w-full h-[11%] flex place-items-center place-content-end">
        <Pagination
          simple
          defaultCurrent={page}
          total={allPage}
          pageSizeOptions={[]}
          onChange={(e) => setPage(e)}
        />
      </div>
    </div>
  );
}
