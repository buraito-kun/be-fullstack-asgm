import { useNavigate } from "react-router";
import Button from "../Button";
import ContentBox from "../content/ContentBox";
import Controller from "../content/Controller";
import Searchbar from "../content/Searchbar";
import Layout from "../Layout";
import Sidebar from "../Sidebar";
import Title from "../Title";
import ViewScreen from "../ViewScreen";
import { useState } from "react";
import ClassroomContent from "../content/ClassroomContent";

export default function Classroom() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <ViewScreen>
      <Title />
      <Layout>
        <Sidebar />
        <ContentBox>
          <Controller>
            <Searchbar
              setSearch={setSearch}
              text="ค้นหาข้อมูลห้องเรียน (เลขที่ห้อง, ชื่อห้อง, ครูประจำชั้น)"
            />
            <Button
              text="เพิ่มห้องเรียน"
              onClick={() => navigate("/addClassroom")}
            />
          </Controller>
          <ClassroomContent search={search} />
        </ContentBox>
      </Layout>
    </ViewScreen>
  );
}
