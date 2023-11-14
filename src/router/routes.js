import ViewUserProfile from "../pages/ManageUsers/ViewUserProfile";
import VerifyEmailCode from "../pages/Authservice/VerifyEmailCode";
import Verifymail from "../pages/Authservice/Verifymail";
import PhoneAuth from "../pages/Authservice/PhoneAuth";
import PhoneInput from "../pages/Authservice/PhoneInput";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Issues from "../pages/ManageIssue/Issues";
import Issueboard from "../pages/ManageIssue/Issueboard";
import SubjectManage from "../pages/SubjectsManage/SubjectManage";
import IssueDetail from "../pages/ManageIssue/IssueDetail";
import SubjectDetail from "../pages/SubjectsManage/SubjectDetail";
import Semester from "../pages/ManageSemester/Semester";
import UserProfile from "../pages/UserProfile";
import SendCodeToEmail from "../pages/Authservice/SendCodeToEmail";
import ForgotPassword from "../pages/Authservice/ForgotPassword";
import SystemSettingDetail from "../pages/ManageSystemSetting/SystemSettingDetail";
import SystemSettings from "../pages/ManageSystemSetting/ListSystemSettings";
import CreateSystemSetting from "../pages/ManageSystemSetting/CreateSystemSetting";
import ChangePassword from "../pages/Authservice/ChangePassword";
import Editprofile from "../pages/Editprofile";
import IssueSettings from "../pages/ManageIssueSetting/IssueSettings";
import ProjectDetail from "./../pages/ProjectManage/ProjectDetail";
import Project from "../pages/ProjectManage/Project";
import Class from "../pages/ManageClass/Class";
import NoPermission from "../pages/Unauthorized/NoPermission";
import ClassDetails from "../pages/ManageClass/ClassDetails";
const AllRolesPermission = () => ["ADMIN", "TEACHER", "STUDENT", "MANAGER"];

const routes = [
  {
    path: "/login",
    component: LoginPage,
    permission: AllRolesPermission(),
    isPrivate: false,
  },
  {
    path: "/register",
    component: RegisterPage,
    permission: AllRolesPermission(),
    isPrivate: false,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    isPrivate: true,
    permission: AllRolesPermission(),
  },
  {
    path: "/dashboard/:id",
    component: UserProfile,
    isPrivate: true,
    permission: AllRolesPermission(),
  },
  {
    path: "/sendcodetoemail",
    component: SendCodeToEmail,
    permission: AllRolesPermission(),
    isPrivate: false,
  },
  {
    path: "/forgotpassword",
    permission: AllRolesPermission(),
    component: ForgotPassword,
    isPrivate: false,
  },
  {
    path: "/change-password",
    component: ChangePassword,
    isPrivate: true,
    permission: AllRolesPermission(),
  },
  {
    path: "/issue",
    component: Issues,
    isPrivate: true,
    permission: AllRolesPermission(),
  },
  {
    path: "/dashboard/edit-profile/:id",
    component: Editprofile,
    permission: AllRolesPermission(),
    isPrivate: true,
  },
  {
    path: "/issue/:id",
    component: IssueDetail,
    permission: AllRolesPermission(),
    isPrivate: true,
  },
  {
    path: "issue-board",
    component: Issueboard,
    permission: AllRolesPermission(),
    isPrivate: true,
  },
  {
    path: "/profile",
    component: ViewUserProfile,
    isPrivate: true,
    permission: AllRolesPermission(),
  },
  {
    path: "/",
    component: Home,
    isPrivate: true,
    permission: AllRolesPermission(),
  },
  {
    path: "/verifymail",
    component: VerifyEmailCode,
    permission: AllRolesPermission(),
    isPrivate: false,
  },
  {
    path: "/issues-setting",
    component: IssueSettings,
    isPrivate: true,
    permission: AllRolesPermission(),
  },
  {
    path: "/system-setting/:id",
    component: SystemSettingDetail,
    isPrivate: true,
    permission: ["ADMIN"],
  },
  {
    path: "/system-setting",
    component: SystemSettings,
    isPrivate: true,
    permission: ["ADMIN"],
  },
  {
    path: "/system-setting/create",
    component: CreateSystemSetting,
    isPrivate: true,
    permission: AllRolesPermission(),
  },
  {
    path: "/verify",
    component: Verifymail,
    isPrivate: false,
    permission: AllRolesPermission(),
  },
  {
    path: "/phoneverifycode",
    component: PhoneAuth,
    permission: AllRolesPermission(),
    isPrivate: false,
  },
  {
    path: "/phoneinputverify",
    component: PhoneInput,
    permission: AllRolesPermission(),
    isPrivate: false,
  },
  {
    path: "/subject",
    component: SubjectManage,
    isPrivate: true,
    permission: AllRolesPermission(),
  },
  {
    path: "/subject/:id",
    component: SubjectDetail,
    isPrivate: true,
    permission: AllRolesPermission(),
  },
  {
    path: "/semesters",
    component: Semester,
    isPrivate: true,
    permission: AllRolesPermission(),
  },
  {
    path: "/project",
    component: Project,
    isPrivate: true,
    permission: AllRolesPermission(),
  },
  {
    path: "/project/:id",
    component: ProjectDetail,
    isPrivate: true,
    permission: AllRolesPermission(),
  },
  {
    path: "/class",
    component: Class,
    isPrivate: true,
    permission: AllRolesPermission(),
  },
  {
    path: "/class/:id",
    component: ClassDetails,
    isPrivate: true,
    permission: AllRolesPermission(),
  },
  {
    path: "/no-permission",
    component: NoPermission,
    isPrivate: true,
    permission: AllRolesPermission(),
  },
];

export default routes;
