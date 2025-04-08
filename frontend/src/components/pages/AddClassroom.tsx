import { Link } from "react-router";
import Button from "../Button";
import Title from "../Title";
import ViewScreen from "../ViewScreen";
import Swal from "sweetalert2";
import { useState } from "react";

export default function AddClassroom() {
  const [homeroomTeacher, setHomeroomTeacher] = useState("");
  const [className, setClassName] = useState("");
  const [academicYear, setAcademicYear] = useState("2000");

  const submit = async () => {
    if (
      homeroomTeacher.length === 0 ||
      className.length === 0 ||
      academicYear.length === 0
    ) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "กรุณากรอกข้อมูลให้ครบทุกช่อง!",
      });
    } else {
      const res = await fetch(process.env.REACT_APP_PUBLIC_API + "/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation CreateClassroom {
              createClassroom(
                createClassroomInput: { homeroom_teacher: "${homeroomTeacher}", classname: "${className}", academic_year: ${academicYear} }
              ) {
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
          text: "Failed to add classroom!",
        });
      } else {
        return Swal.fire({
          position: "top-end",
          icon: "success",
          title: "เพิ่มห้องเรียนสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <ViewScreen>
      <Title />
      <div className="w-full h-full pt-20 flex flex-col">
        <div className="w-full flex place-items-center pt-10 pl-20">
          <Link to="/classroom" className="w-60">
            <Button text="<= ย้อนกลับ" />
          </Link>
          <h1 className="font-sans text-2xl font-bold pl-20">เพิ่มห้องเรียน</h1>
        </div>
        <div className="size-full pt-10 px-20">
          <div className="border border-black bg-white rounded-2xl px-10 pb-10 pt-5 flex flex-wrap place-content-between">
            <div className="w-full flex place-content-between">
              <label className="pt-5 w-[30%]">
                <h1 className="text-xl pl-5">
                  ชื่อห้อง<span className="text-red-500">&nbsp;*</span>
                </h1>
                <input
                  type="text"
                  className="w-full border border-black rounded-full pl-5 py-2 text-xl"
                  onChange={(e) => setClassName(e.target.value)}
                />
              </label>
              <label className="pt-5 w-[30%]">
                <h1 className="text-xl pl-5">
                  ชื่อครูประจำชั้น<span className="text-red-500">&nbsp;*</span>
                </h1>
                <input
                  type="text"
                  className="w-full border border-black rounded-full pl-5 py-2 text-xl"
                  onChange={(e) => setHomeroomTeacher(e.target.value)}
                />
              </label>
              <label className="pt-5 w-[30%]">
                <h1 className="text-xl pl-5">
                  ปีการศึกษา (ค.ศ.)<span className="text-red-500">&nbsp;*</span>
                </h1>
                <input
                  type="number"
                  min={1900}
                  max={5000}
                  defaultValue={2000}
                  className="w-full border border-black rounded-full pl-5 py-2 text-xl"
                  onChange={(e) => setAcademicYear(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="w-full pt-10 flex place-content-end">
            <div className="w-48">
              <Button text="ยืนยัน" onClick={submit} />
            </div>
          </div>
        </div>
      </div>
    </ViewScreen>
  );
}
