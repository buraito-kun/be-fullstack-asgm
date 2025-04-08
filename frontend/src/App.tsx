import { useNavigate } from "react-router";
import Button from "./components/Button";
import ContentBox from "./components/content/ContentBox";
import Controller from "./components/content/Controller";
import Searchbar from "./components/content/Searchbar";
import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import Title from "./components/Title";
import ViewScreen from "./components/ViewScreen";
import { useState } from "react";
import StudentContent from "./components/content/StudentContent";

function App() {
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
              text="ค้นหาข้อมูลนักเรียน (เลขประจำตัวนักเรียน, ชื่อหรือนามสกุล, ระดับชั้น)"
            />
            <Button
              text="เพิ่มนักเรียน"
              onClick={() => navigate("/addStudent")}
            />
          </Controller>
          <StudentContent search={search} />
        </ContentBox>
      </Layout>
    </ViewScreen>
  );
}

export default App;
