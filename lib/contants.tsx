import { FaHome } from "react-icons/fa";
import { HiOutlineCollection } from "react-icons/hi";
import { FaTag } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri"
export const Menu =[
    {
        url:'/',
        icon: <FaHome></FaHome>,
        label: 'Dashboard'
    },
    {
        url:'/collections',
        icon: <HiOutlineCollection />,
        label: 'Collections'
    },
    {
        url:'/products',
        icon: <FaTag />,
        label: 'Products'
    },
    {
        url:'/orders',
        icon: <FaShoppingBag />,
        label: 'Orders'
    },
    {
        url:'/customers',
        icon: <RiAccountCircleFill />,
        label: 'Customers'
    }
]