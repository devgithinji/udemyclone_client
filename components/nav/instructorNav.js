import React from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import {checkActivePath} from "../../utils";

const InstructorNav = () => {
    const router = useRouter();

    return (
        <div className="nav flex-column nav-pills mt-2">
            <Link href="/instructor" className={checkActivePath(router.pathname, '/instructor')}>
                Dashboard
            </Link>
            <Link href="/instructor/course/create"
                  className={checkActivePath(router.pathname, '/instructor/course/create')}>
                Course Create
            </Link>
        </div>
    );
};

export default InstructorNav;