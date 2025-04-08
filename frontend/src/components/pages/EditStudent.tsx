import { Link, useParams } from "react-router";
import Button from "../Button";
import Title from "../Title";
import ViewScreen from "../ViewScreen";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function EditStudent() {
  const param = useParams();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [prefix, setPrefix] = useState("");
  const [gender, setGender] = useState("");
  const [gradelevel, setGradelevel] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const [prefixInit, setPrefixInit] = useState("");
  const [genderInit, setGenderInit] = useState("");
  const [gradelevelInit, setGradelevelInit] = useState("");

  const [genders, setGenders] = useState<
    [
      {
        value: number;
        label: string;
      }
    ]
  >();
  const [prefixs, setPrefixs] = useState<
    [
      {
        value: number;
        label: string;
      }
    ]
  >();
  const [gradelevels, setGradelevels] = useState<
    [
      {
        value: number;
        label: string;
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
          prefixs {
            prefixid
            prefixname
          }
          genders {
            genderid
            gendername
          }
          gradelevels {
            gradelevelid
            levelname
          }
          student(studentid: ${param.studentid}) {
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
            gradelevel {
              gradelevelid
              levelname
            }
            prefix {
              prefixid
              prefixname
            }
          }
        }
        `,
      }),
    });
    const json = await res.json();
    setPrefixs(
      json.data.prefixs.map(
        (prefix: { prefixid: number; prefixname: string }) => ({
          value: prefix.prefixid,
          label: prefix.prefixname,
        })
      )
    );
    setGenders(
      json.data.genders.map(
        (gender: { genderid: number; gendername: string }) => ({
          value: gender.genderid,
          label: gender.gendername,
        })
      )
    );
    setGradelevels(
      json.data.gradelevels.map(
        (gradelevel: { gradelevelid: number; levelname: string }) => ({
          value: gradelevel.gradelevelid,
          label: gradelevel.levelname,
        })
      )
    );
    setFirstname(json.data.student.student.firstname);
    setLastname(json.data.student.student.lastname);
    setPrefix(String(json.data.student.prefix.prefixid));
    setGender(String(json.data.student.gender.genderid));
    setGradelevel(String(json.data.student.gradelevel.gradelevelid));
    setBirthdate(json.data.student.student.birthdate.split("T")[0]);
    setPrefixInit(json.data.student.prefix.prefixname);
    setGenderInit(json.data.student.gender.gendername);
    setGradelevelInit(json.data.student.gradelevel.levelname);
  };

  const submit = async () => {
    if (
      firstname.length === 0 ||
      lastname.length === 0 ||
      prefix.length === 0 ||
      gender.length === 0 ||
      gradelevel.length === 0 ||
      birthdate.length === 0
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
            mutation UpdateStudent {
              updateStudent(
                updateStudentInput: {
                  studentid: ${param.studentid}
                  prefixid: ${prefix}
                  genderid: ${gender}
                  gradelevelid: ${gradelevel}
                  firstname: "${firstname}"
                  lastname: "${lastname}"
                  birthdate: "${birthdate}"
                }
              ) {
                studentid
              }
            }
          `,
        }),
      });
      if (!res.ok) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add student!",
        });
      } else {
        return Swal.fire({
          position: "top-end",
          icon: "success",
          title: "แก้ไขข้อมูลสำเร็จ",
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
          <Link to="/" className="w-60">
            <Button text="<= ย้อนกลับ" />
          </Link>
          <h1 className="font-sans text-2xl font-bold pl-20">
            แก้ไขข้อมูลนักเรียน
          </h1>
        </div>
        <div className="size-full pt-10 px-20">
          <div className="border border-black bg-white rounded-2xl px-10 pb-10 pt-5 flex flex-wrap place-content-between">
            <label className="pt-5 w-[48%]">
              <h1 className="text-xl pl-5">
                ชื่อจริง<span className="text-red-500">&nbsp;*</span>
              </h1>
              <input
                type="text"
                className="w-full border border-black rounded-full pl-5 py-2 text-xl"
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
              />
            </label>
            <label className="pt-5 w-[48%]">
              <h1 className="text-xl pl-5">
                นามสกุล<span className="text-red-500">&nbsp;*</span>
              </h1>
              <input
                type="text"
                className="w-full border border-black rounded-full pl-5 py-2 text-xl"
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
              />
            </label>
            <div className="w-[48%] flex place-content-between">
              <label className="pt-5 w-[48%]">
                <h1 className="text-xl pl-5">
                  คำนำหน้า<span className="text-red-500">&nbsp;*</span>
                </h1>
                {prefix && (
                  <Select
                    options={prefixs}
                    className="w-full rounded-full text-xl"
                    onChange={(e) => setPrefix(String(e?.value))}
                    defaultValue={{
                      value: parseInt(prefix),
                      label: prefixInit,
                    }}
                  />
                )}
              </label>
              <label className="pt-5 w-[48%]">
                <h1 className="text-xl pl-5">
                  เพศ<span className="text-red-500">&nbsp;*</span>
                </h1>
                {gender && (
                  <Select
                    options={genders}
                    className="w-full rounded-full text-xl"
                    onChange={(e) => setGender(String(e?.value))}
                    defaultValue={{
                      value: parseInt(gender),
                      label: genderInit,
                    }}
                  />
                )}
              </label>
            </div>
            <div className="w-[48%] flex place-content-between">
              <label className="pt-5 w-[48%]">
                <h1 className="text-xl pl-5">
                  ชั้นเรียน<span className="text-red-500">&nbsp;*</span>
                </h1>
                {gradelevel && (
                  <Select
                    options={gradelevels}
                    className="w-full rounded-full text-xl"
                    onChange={(e) => setGradelevel(String(e?.value))}
                    defaultValue={{
                      value: parseInt(gradelevel),
                      label: gradelevelInit,
                    }}
                  />
                )}
              </label>
              <label className="pt-5 w-[48%]">
                <h1 className="text-xl pl-5">
                  วันเกิด<span className="text-red-500">&nbsp;*</span>
                </h1>
                <input
                  type="date"
                  className="w-full border border-black rounded-full pl-5 py-2 text-xl"
                  onChange={(e) => setBirthdate(e.target.value)}
                  defaultValue={birthdate}
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
