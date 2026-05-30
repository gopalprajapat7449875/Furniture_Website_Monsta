"use client"
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

export default function ChangePassword() {
    let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL
    const [yes, setyes] = useState(false)

    let token = useSelector((state) => state.userStore.token)


    const handleSubmit = (e) => {
        e.preventDefault();

        let _NewPassword = e.target._NewPassword.value
        let _OldPassword = e.target._OldPassword.value
        let confirmPassword = e.target.confirmPassword.value

        let data = {
            _OldPassword: _OldPassword,

            _NewPassword: _NewPassword
        }
        if (_NewPassword === confirmPassword) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, change it!"
            }).then((result) => {


                axios.post(`${apibaseurl}user/change-password`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                    .then((res) => res.data)
                    .then((finalres) => {
                        setyes(finalres._status)
                        if (finalres._status) {
                            e.target.reset()
                        }

                    })




                if (yes) Swal.fire({


                    title: "Password Changed",
                    text: "Your password has been changed.",
                    icon: "success"

                }
                )

                else if(!yes){
                    Swal.fire({


                        title: "Invlid Password",
                        text: "Old Password Is Invalid",
                        icon: "error"
                    })
                }
            });

        }
        else {
            toast.error("New password and confirm password do not match");
        }


    };

    return (

        <div className=" bg-gray-100 flex items-center justify-center p-4">
            <ToastContainer />


            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md">

                <h2 className="text-3xl font-semibold mb-6">Change Password</h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Old Password */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Old Password *
                        </label>
                        <input
                            type="password"
                            name="_OldPassword"


                            placeholder="Enter old password"
                            className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-orange-400"
                            required
                        />
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block mb-1 font-medium">
                            New Password *
                        </label>
                        <input
                            type="password"
                            name="_NewPassword"

                            placeholder="Enter new password"
                            className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-orange-400"
                            required
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Confirm Password *
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"

                            placeholder="Confirm new password"
                            className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-orange-400"
                            required
                        />
                    </div>

                    {/* Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition"
                        >
                            UPDATE PASSWORD
                        </button>
                    </div>

                </form>
            </div>

        </div>
    );
}
