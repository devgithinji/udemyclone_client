import {Menu} from "antd";
import {
    AppstoreOutlined,
    LoginOutlined,
    UserAddOutlined,
    LogoutOutlined,
    CoffeeOutlined,
    CarryOutOutlined,
    TeamOutlined
} from "@ant-design/icons"
import {useRouter} from "next/router";
import {useContext} from "react";
import {Context} from "../context";
import {LOGOUT} from "../context/actions";
import axios from "axios";
import {toast} from "react-toastify";
import Link from "next/link";

const {Item, SubMenu, ItemGroup} = Menu

const TopNav = () => {
    const router = useRouter();
    const {state: {user}, dispatch} = useContext(Context);


    const logout = async () => {
        dispatch({type: LOGOUT})
        localStorage.removeItem("user")
        const data = await axios.get("/api/auth/logout")
        toast.success(data.message)
        router.push("/login")
    }


    return (
        <Menu mode="horizontal">
            <Item key="/" icon={<AppstoreOutlined/>}>
                <Link href="/">
                    App
                </Link>
            </Item>
            {user && user.role && user.role.includes("instructor") ? (
                <Item key="/instructor/course/create" icon={<CarryOutOutlined/>}>
                    <Link href="/instructor/course/create">
                        Create Course
                    </Link>
                </Item>
            ) : (
                <Item key="/user/become-instructor" icon={<TeamOutlined/>}>
                    <Link href="/user/become-Instructor">
                        Become Instructor
                    </Link>
                </Item>
            )}
            {user == null && (
                <>
                    <Item key="/login" icon={<LoginOutlined/>}>
                        <Link href="/login">
                            Login
                        </Link>
                    </Item>
                    <Item key="/register" icon={<UserAddOutlined/>}>
                        <Link href="/register">
                            Register
                        </Link>
                    </Item>
                </>
            )}
            {user !== null && (
                <SubMenu key="10" icon={<CoffeeOutlined/>} title={user.name} style={{marginLeft: 'auto'}}>
                    <ItemGroup>
                        <Item key="/user">
                            <Link href="/user">
                                Dashboard
                            </Link>
                        </Item>
                        {user && user.role && user.role.includes("instructor") && (
                            <Item key="/instructor" style={{marginLeft: 'auto'}} icon={<TeamOutlined/>}>
                                <Link href="/instructor">
                                    Instructor
                                </Link>
                            </Item>

                        )}
                        <Item onClick={logout} key="logout" icon={<LogoutOutlined/>} className="float-right">
                            Logout
                        </Item>
                    </ItemGroup>
                </SubMenu>
            )}
        </Menu>
    );
};

export default TopNav;