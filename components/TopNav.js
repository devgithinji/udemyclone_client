import {Menu} from "antd";
import {AppstoreOutlined, LoginOutlined, UserAddOutlined, LogoutOutlined, CoffeeOutlined} from "@ant-design/icons"
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
            <Item key="1" icon={<AppstoreOutlined/>}>
                <Link href="/">
                    App
                </Link>
            </Item>
            {user == null && (
                <>
                    <Item key="2" icon={<LoginOutlined/>}>
                        <Link href="/login">
                            Login
                        </Link>
                    </Item>
                    <Item key="3" icon={<UserAddOutlined/>}>
                        <Link href="/register">
                            Register
                        </Link>
                    </Item>
                </>
            )}
            {user !== null && (
                <SubMenu key="10" icon={<CoffeeOutlined/>} title={user.name} style={{marginLeft: 'auto'}}>
                    <ItemGroup>
                        <Item key="4">
                           <Link href="/user" >
                               Dashboard
                           </Link>
                        </Item>
                        <Item onClick={logout} key="5" icon={<LogoutOutlined/>} className="float-right">
                            Logout
                        </Item>
                    </ItemGroup>
                </SubMenu>
            )}
        </Menu>
    );
};

export default TopNav;