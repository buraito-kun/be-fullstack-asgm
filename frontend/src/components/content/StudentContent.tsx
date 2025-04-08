import { useEffect, useState } from "react";
import { deletes, edit } from "../Icon";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { Pagination } from 'antd';

type Props = {
  search: string;
};

export default function StudentContent({ search }: Props) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1)
  const [allPage, setAllPage] = useState(1)
  const [data, setData] = useState<
    [
      {
        student: {
          studentid: number;
          prefixid: number;
          genderid: number;
          gradelevelid: number;
          firstname: string;
          lastname: string;
          birthdate: string;
        };
        prefix: {
          prefixid: number;
          prefixname: string;
        };
        gender: {
          genderid: number;
          gendername: string;
        };
        gradelevel: {
          gradelevelid: number;
          levelname: string;
        };
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
          students(search: "${search}", limit: 10, page: ${page}) {
            prefix {
              prefixid
              prefixname
            }
            gradelevel {
              gradelevelid
              levelname
            }
            gender {
              genderid
              gendername
            }
            student {
              studentid
              firstname
              lastname
              birthdate
            }
            allPage
          }
        }
        `,
      }),
    });
    const json = await res.json();
    setData(json.data.students);
    setAllPage(json.data.students[0]?.allPage)
  };

  return (
    <div className="w-full h-full p-5">
      <div
        id="header"
        className="w-full h-[9%] flex rounded-t-full border bg-[#BDBEFF]"
      >
        <div className="w-2/12 h-full flex place-items-center place-content-center">
          <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
            รหัส
          </h1>
        </div>
        <div className="w-1/12 h-full flex place-items-center place-content-center">
          <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
            คำนำหน้า
          </h1>
        </div>
        <div className="w-3/12 h-full flex place-items-center place-content-center">
          <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
            ชื่อ-นามสกุล
          </h1>
        </div>
        <div className="w-1/12 h-full flex place-items-center place-content-center">
          <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
            เพศ
          </h1>
        </div>
        <div className="w-2/12 h-full flex place-items-center place-content-center">
          <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
            วันเกิด
          </h1>
        </div>
        <div className="w-1/12 h-full flex place-items-center place-content-center">
          <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
            ชั้นเรียน
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
        {data?.map((student) => {
          return (
            <div
              key={student.student.studentid}
              className="w-full h-[10%] flex hover:bg-[#D9D9D9]"
            >
              <div className="w-2/12 h-full flex place-items-center place-content-center">
                <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
                  {student.student.studentid}
                </h1>
              </div>
              <div className="w-1/12 h-full flex place-items-center place-content-center">
                <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
                  {student.prefix.prefixname}
                </h1>
              </div>
              <div className="w-3/12 h-full flex place-items-center place-content-center">
                <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
                  {student.student.firstname} {student.student.lastname}
                </h1>
              </div>
              <div className="w-1/12 h-full flex place-items-center place-content-center">
                <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
                  {student.gender.gendername}
                </h1>
              </div>
              <div className="w-2/12 h-full flex place-items-center place-content-center">
                <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
                  {student.student.birthdate.split("T")[0]}
                </h1>
              </div>
              <div className="w-1/12 h-full flex place-items-center place-content-center">
                <h1 className="text-ellipsis overflow-hidden text-xl text-nowrap">
                  {student.gradelevel.levelname}
                </h1>
              </div>
              <div className="w-1/12 h-full flex place-items-center place-content-center">
                <div
                  className="hover:cursor-pointer"
                  onClick={() => {
                    navigate(`/editStudent/${student.student.studentid}`);
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
                                mutation RemoveStudent {
                                    removeStudent(studentid: ${student.student.studentid}) {
                                        studentid
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
        <Pagination simple defaultCurrent={page} total={allPage} pageSizeOptions={[]} onChange={e=>setPage(e)} />
      </div>
    </div>
  );
}
