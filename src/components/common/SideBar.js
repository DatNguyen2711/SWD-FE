import React, { useEffect, useState } from "react";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import ClassIcon from "@mui/icons-material/Class";
import {
  AppstoreOutlined,
  MailOutlined,
  ProjectFilled,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth";
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "1", <MailOutlined />),
  getItem("Subjects", "2", <WorkspacesIcon />),
  getItem("Class", "3", <ClassIcon />),
  getItem("Project", "4", <ProjectFilled />),
  getItem("System Setting", "systemSetting", <AppstoreOutlined />, [
    getItem("All System Settings", "100"),
    getItem("Create System Setting", "101"),
  ]),
  getItem("Issue", "sub1", <AppstoreOutlined />, [
    getItem("All Issue", "5"),
    getItem("Issue board", "6"),
    getItem("Submenu", "sub1-2", null, [
      getItem("Option 5", "7"),
      getItem("Option 6", "8"),
    ]),
  ]),
  getItem("Setting", "sub2", <SettingOutlined />, [
    getItem("Issue setting", "9"),
    getItem("Project setting", "10"),
    getItem("Subject setting", "11"),
    getItem("Class setting", "12"),
  ]),
];
const SideBar = () => {
  const role = useAuthStore.getState().role;
  const navigate = useNavigate();
  const [current, setCurrent] = useState("1");

  const onClick = (e) => {
    if (e.key === "5") {
      navigate("/issue");
    } else if (e.key === "6") {
      navigate("/issue-board");
    } else if (e.key === "1") {
      navigate("/dashboard");
    } else if (e.key === "2") {
      navigate("/subject");
    } else if (e.key === "4") {
      navigate("/project");
    } else if (e.key === "9") {
      navigate("/issues-setting");
    } else if (e.key === "100") {
      navigate("/system-setting");
    } else if (e.key === "101") {
      navigate("/system-setting/create");
    } else if (e.key === "3") {
      navigate("/class");
    }
    setCurrent(e.key);
  };
  const [mode, setMode] = useState("inline");
  const [windowHeight, setWindowWidth] = useState(window.innerHeight);
  const mytheme = "dark";
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerHeight);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <div className="block">
      <>
        <Menu
          style={{
            width: 256,
            height: "100vh",
            overflowY: "auto",
          }}
          onClick={onClick}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode={mode}
          theme={mytheme}
          items={items.filter((item) => {
            if (role === "STUDENT") {
              return item.key === "4" || item.key === "sub1";
            } else if (role === "ADMIN") {
              return true;
            } else if (role === "MANAGER") {
            return ["2", "4", "5", "9", "3", "6", "sub2"].includes(item.key);
            }
          })}
        />
      </>
    </div>
  );
};
export default SideBar;
