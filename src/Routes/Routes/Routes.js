import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../../Layout/DashBoardLayout";
import Main from "../../Layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import AddDoctors from "../../Pages/DashBoard/AddDoctors/AddDoctors";
import AllUsers from "../../Pages/DashBoard/AllUsers/AllUsers";
import DashBoard from "../../Pages/DashBoard/DashBoard/DashBoard";
import MyAppointment from "../../Pages/DashBoard/DashBoard/MyAppointment/MyAppointment";
import ManageDoctors from "../../Pages/DashBoard/ManageDoctors/ManageDoctors";
import Payment from "../../Pages/DashBoard/Payment/Payment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import DisplayError from "../../Shared/DisplayError/DisplayError";
import SignUp from "../../SignUp/SignUp";
import AdminRoutes from "../AdminRoutes/AdminRoutes";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [

            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },

            {
                path: '/appointment',
                element: <Appointment></Appointment>

            }


        ]

    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashBoardLayout></DashBoardLayout>
        </PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppointment></MyAppointment>


            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoutes>
                    <AllUsers></AllUsers>
                </AdminRoutes>


            },
            {
                path: '/dashboard/adddoctors',
                element: <AdminRoutes>
                    <AddDoctors></AddDoctors>
                </AdminRoutes>


            },
            {
                path: '/dashboard/managedoctors',
                element: <AdminRoutes>
                    <ManageDoctors></ManageDoctors>
                </AdminRoutes>


            },
            {
                path: '/dashboard/payment/:id',
                element:
                    <Payment></Payment>
                ,
                loader: ({ params }) => fetch(`https://doctors-portal-server-silk-xi.vercel.app/bookings/${params.id}`)


            },
        ]

    }



])