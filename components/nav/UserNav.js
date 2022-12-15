import React from 'react';
import Link from "next/link";
import {checkActivePath} from "../../utils";
import {useRouter} from "next/router";

const UserNav = () => {
    const router = useRouter();
    return (
        <div className="nav flex-column nav-pills mt-2">
            <Link href="/user" className={checkActivePath(router.pathname, '/user')}>
                Dashboard
            </Link>
        </div>
    );
};

export default UserNav;