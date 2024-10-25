import { AccountType } from '../../utils/constnt'

export const Menu = [
    {
        "tag": "Home",
        "link": "/"
    },
    {
        "tag": "Catalog",
    },
    {
        "tag": "About us",
        "link": "/AboutUs"
    },
    {
        "tag": "Contact us",
        "link": "/Contactus"
    }
]


export const ProfileData = [
    {
        "tag": "View Profile",
        "img": "https://res.cloudinary.com/dlgm6g3gn/image/upload/v1721922890/viewprofile_f9t9gl.png",
        "nav": "/dashboard/view Profile"
    },
    {
        "tag": "Settings",
        "img": "https://res.cloudinary.com/dlgm6g3gn/image/upload/v1721922892/setting_an1a70.png",
        "nav": "/dashboard/Setting"
    },
    {
        "tag": "Help/Support",
        "img": "https://res.cloudinary.com/dlgm6g3gn/image/upload/v1721922889/help-desk_fukzua.png",
        "nav": "/Contactus"
    },
    {
        "tag": "Logout",
        "img": "https://res.cloudinary.com/dlgm6g3gn/image/upload/v1721922889/logout_jyrwsa.png",
    }
]


export const Sidebardata = [
    {
        icon: "https://res.cloudinary.com/dlgm6g3gn/image/upload/v1721922890/viewprofile_f9t9gl.png",
        name: "view Profile",
        auth: null,
        link: "/dashboard/view Profile"
    },
    {
        icon: "https://res.cloudinary.com/dlgm6g3gn/image/upload/v1721922890/editprofile_bzlx8w.png",
        name: "Edit Profile",
        auth: null,
        link: "/dashboard/Edit Profile"
    },
    {
        icon: "https://res.cloudinary.com/dlgm6g3gn/image/upload/v1722603621/enroll_uxc3gb.png",
        name: "Enroll Courses",
        auth: AccountType[0],
        link: "/dashboard/Enroll Courses"
    },
    {
        icon: "https://res.cloudinary.com/dlgm6g3gn/image/upload/v1722605830/cloud-computing_mryevy.png",
        name: "Add Course",
        auth: AccountType[1],
        link: "/dashboard/Add Course"
    },
    {
        icon: "https://res.cloudinary.com/dlgm6g3gn/image/upload/v1722604001/webinar_dajbap.png",
        name: "My Courses",
        auth: AccountType[1],
        link: "/dashboard/My Courses"
    },
    {
        icon: "https://res.cloudinary.com/dlgm6g3gn/image/upload/v1722604231/invoice_ulw55n.png",
        name: "Invoice Details",
        auth: AccountType[0],
        link: "/dashboard/Invoice Details"
    },
    {
        icon: "https://res.cloudinary.com/dlgm6g3gn/image/upload/v1722602809/notification_ohsuhw.png",
        name: "Notification",
        auth: null,
        link: "/dashboard/Notification"
    },
    {
        icon: "https://res.cloudinary.com/dlgm6g3gn/image/upload/v1722603182/comunication_edby6f.png",
        name: "Communication",
        auth: null,
        link: "/dashboard/Communication"
    },
    {
        icon: "https://res.cloudinary.com/dlgm6g3gn/image/upload/v1722603320/file-and-folder_zzdrmh.png",
        name: "Resources",
        auth: null,
        link: "/dashboard/Resources"
    },
    {
        icon: "https://res.cloudinary.com/dlgm6g3gn/image/upload/v1722603437/schedule_bcxjdw.png",
        name: "Schedule and Calendar",
        auth: null,
        link: "/dashboard/Schedule and Calendar"
    },
    
]