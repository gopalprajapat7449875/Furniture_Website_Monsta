"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie'
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRazorpay } from "react-razorpay";
import { fetchCart } from "@/app/reduxwork/CartSlice";
import { useRouter } from "next/navigation";




export default function Order_Detials() {
  const { error, isLoading, Razorpay } = useRazorpay();
  const token = Cookies.get("token");
  const [user, setuser] = useState(null)
  let router = useRouter()


  let apibaseurl = process.env.NEXT_PUBLIC_APIBASEURL
  let dispatch = useDispatch()
  let orderdata = useSelector((store) => store.OrdreStore.orderdata)
  let product = orderdata?.cart
  // let user = useSelector((state) => state.userStore.userdata)

  


  let totalPrice = product?.reduce((acc, item) => {
    return acc + item._ProductPrice;
  }, 0);
 

  const [payment, setPayment] = useState(1);
  const [differentAddress, setDifferentAddress] = useState(false);


  let UserData = () => {
    axios.post(`${apibaseurl}user/user-data`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((res) => res.data)
      .then((finalres) => {

        setuser(finalres.userData)
       





      })
  }
  useEffect(()=>{
    UserData()
  },[token])

  let placeorder = (e) => {
    e.preventDefault()
    let shippingAddress;
    if (differentAddress === false) {
      let form = e.target;

      shippingAddress = {
        _UserName: form._UserName.value,
        _Company_Name: form._Company_Name.value,
        _UserAddress: form._UserAddress.value,
        _Apartment_Strit: form._Apartment_Strit.value,
        _UserCity: form._UserCity.value,
        _UserState: form._UserState.value,
        Landmark: form.Landmark.value,
        _UserPhoneNumber: form._UserPhoneNumber.value,
        _UserEmail: form._UserEmail.value,






      };

    }
    else {
      let dform = e.target;

      shippingAddress = {


        _UserName: dform._DUserName.value,
        _Apartment_Strit: dform._DApartment_Strit.value,
        _UserAddress: dform._DUserAddress.value,
        _UserCity: dform._DUserCity.value,
        _UserState: dform._DUserState.value,
        Landmark: dform.DLandmark.value,
        _UserPhoneNumber: dform._DUserPhoneNumber.value,
        _UserEmail: dform._DUserEmail.value,





      }





    }
    let finaldata = {
      _ShippingAddess: shippingAddress,
      _OrderItems: product?.map((item) => ({
        _ProductID: item._ProductID,
        _ProductName: item._ProductName,
        _ProductPrice: item._ProductPrice,
        _Quantity: item._Quantity
      })),
      _PaymentMethod: payment,
      _OrderID: "MONSTA" + Date.now(),
      _OrderAmount: totalPrice + orderdata.delevery + orderdata.discount,
      _OrderQty: product.length,
      _ShippingCharges: orderdata.delevery ?? 0,


    }

    if (payment == 2 & totalPrice > 500000) {
      toast.error("You can order less than Rs.500000 online")
      setTimeout(() => {
        router.push("/my-cart")
      }, 5000);

    }
    else {



      axios.post(`${apibaseurl}order/place-order`, finaldata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.data)
        .then((final) => {
          console.log(final)
          if (payment == 1) {
            if (final._status) {
              console.log(final)
              toast.success(final._message)
              dispatch(fetchCart())

              setTimeout(() => {
                router.push("/login-user")
              }, 3000);

            }
          }
          else {
            if (final._status) {




              const options = {
                key: "rzp_test_Sc4vLFNT9FnPo9",
                amount: final.orderRes.amount, // Amount in paise
                currency: "INR",
                name: "MONSTA FURNITURE",
                description: "Test Transaction",
                order_id: final.orderRes.id, // Generate order_id on server
                handler: (response) => {

                  axios.post(`${apibaseurl}order/payment-verify`, response, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                    .then((res) => {
                      if (res.data._status) {
                        toast.success(res.data._message);
                        dispatch(fetchCart())
                        setTimeout(() => {
                          router.push("/login-user")
                        }, 3000);
                      }
                    })
                    .catch((error) => {
                      toast.error(error);
                    });
                },

                prefill: {
                  name: shippingAddress._UserName,
                  email: shippingAddress._UserEmail,
                  contact: shippingAddress._UserPhoneNumber,
                },
                theme: {
                  color: "#F37254",
                },

              }
              const razorpayInstance = new Razorpay(options);
              razorpayInstance.open();

            }
          }



        })
        .catch((error) => {
          console.error(error);
        });

    }
  }
  return (
    <>

      <ToastContainer />
      <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6 md:p-10">


          <form onSubmit={placeorder} action="">
            <div className="grid lg:grid-cols-3 gap-8">

              {/* LEFT SECTION */}
              <div className="lg:col-span-2 space-y-6">

                {/* Billing Details */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Billing Details</h2>

                  <div className="grid md:grid-cols-1 gap-4">
                    <input name="_UserName" defaultValue={user?._UserName} className=" w-[100%] border-2 outline-none rounded px-2 py-2 my-3 rounded px-2 py-2 my-3 border-neutral-300 focus:border-yellow-600 " placeholder="Full Name *" />

                  </div>

                  <input name="_Company_Name" className=" w-[100%] border-2 outline-none rounded px-2 py-2 my-3 border-neutral-300 focus:border-yellow-600 " placeholder="Company Name (Optional)" />



                  <input name="_UserAddress" defaultValue={user?._UserAddress} className=" w-[100%] border-2 outline-none rounded px-2 py-2 my-3 border-neutral-300 focus:border-yellow-600 " placeholder="Street Address *" />
                  <input name="_Apartment_Strit" className=" w-[100%] border-2 outline-none rounded px-2 py-2 my-3 border-neutral-300 focus:border-yellow-600 " placeholder="Apartment, suite, unit (optional)" />

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <input name="_UserCity" defaultValue={user?._UserCity} className=" w-[100%] border-2 outline-none rounded px-2 py-2 my-3 border-neutral-300 focus:border-yellow-600" placeholder="Town / City *" />
                    <input name="_UserState" defaultValue={user?._UserState} className=" w-[100%] border-2 outline-none rounded px-2 py-2 my-3 border-neutral-300 focus:border-yellow-600" placeholder="State *" />
                  </div>

                  <input name="Landmark" className=" w-[100%] border-2 outline-none rounded px-2 py-2 my-3 border-neutral-300 focus:border-yellow-600 " placeholder="Landmark*" />

                  <div className="grid md:grid-cols-1 gap-4 mt-4">

                    <input name="_UserPhoneNumber" readOnly defaultValue={user?._UserPhoneNumber} className=" w-[100%] border-2 outline-none rounded px-2 py-2 my-3 border-neutral-300 focus:border-yellow-600" placeholder="Phone *" />
                  </div>

                  <input name="_UserEmail" readOnly defaultValue={user?._UserEmail} className=" w-[100%] border-2 outline-none rounded px-2 py-2 my-3 border-neutral-300 focus:border-yellow-600 " placeholder="Email Address *" />

                  {/* Different Address */}
                  <div className="mt-4 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={differentAddress}
                      onChange={() => setDifferentAddress(!differentAddress)}
                      className="accent-yellow-600"
                    />
                    <span>Ship to a different address?</span>
                  </div>

                  {differentAddress && (
                    <div className="mt-4  p-4 rounded-xl space-y-4">
                      <h3 className="font-semibold text-lg">Shipping Address</h3>

                      <input name="_DUserName" className=" w-[100%] border-2 outline-none rounded px-2 py-2 my-3 rounded px-2 py-2 my-3 border-neutral-300 focus:border-yellow-600" placeholder="Full Name *" />



                      <input name="_DCompany_Name" className=" w-[100%] border-2 outline-none rounded px-2 py-2 my-3 border-neutral-300 focus:border-yellow-600 " placeholder="Company Name (Optional)" />



                      <input name="_DUserAddress" className=" w-[100%] border-2 outline-none rounded px-2 py-2 my-3 border-neutral-300 focus:border-yellow-600 " placeholder="Street Address *" />
                      <input name="_DApartment_Strit" className=" w-[100%] border-2 outline-none rounded px-2 py-2 my-3 border-neutral-300 focus:border-yellow-600 " placeholder="Apartment, suite, unit (optional)" />

                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <input name="_DUserCity" className=" w-[100%] border-2 outline-none rounded px-2 py-2 my-3 border-neutral-300 focus:border-yellow-600" placeholder="Town / City *" />
                        <input name="_DUserState" className=" w-[100%] border-2 outline-none rounded px-2 py-2 my-3 border-neutral-300 focus:border-yellow-600" placeholder="State *" />
                      </div>

                      <input name="DLandmark" className=" w-[100%] border-2 outline-none rounded px-2 py-2 my-3 border-neutral-300 focus:border-yellow-600 " placeholder="Landmark*" />

                      <div className="grid md:grid-cols-1 gap-4 mt-4">

                        <input name="_DUserPhoneNumber" className=" w-[100%] border-2 outline-none rounded px-2 py-2 my-3 border-neutral-300 focus:border-yellow-600" placeholder="Phone *" />
                      </div>

                      <input name="_DUserEmail" className=" w-[100%] border-2 outline-none rounded px-2 py-2 my-3 border-neutral-300 focus:border-yellow-600 " placeholder="Email Address *" />
                    </div>
                  )}

                  {/* Order Notes */}
                  <textarea
                    className=" w-[100%] border-2 outline-none rounded px-2 py-2 my-3 border-neutral-300 focus:border-yellow-600  h-24"
                    placeholder="Order Notes (Optional)"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:border-yellow-600">
                      <input
                        type="radio"
                        name="payment"
                        checked={payment === 1}
                        value={1}
                        onChange={() => setPayment(1)}
                        className="accent-yellow-600"
                      />
                      Cash on Delivery (COD)
                    </label>

                    <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:border-yellow-600">
                      <input
                        type="radio"
                        name="payment"
                        value={2}
                        checked={payment === 2}
                        onChange={() => setPayment(2)}
                        className="accent-yellow-600"
                      />
                      Online (Debit/Credit Card and UPI)
                    </label>
                  </div>
                </div>

              </div>

              {/* RIGHT SECTION */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm h-fit">
                <div className="flex justify-between px-2">


                  <h2 className="text-xl font-semibold mb-4">Your Order</h2>
                  <Link href={'/my-cart'}>

                    <button className="text-[14px] hover:text-yellow-600 border rounded-2xl px-2 py-1 duration-200h font-semibold  mb-4">Update Cart</button>
                  </Link>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between font-semibold border-b pb-2">
                    <span>Product</span>
                    <span>Total</span>
                  </div>

                  {product?.map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <Link href={`/product-details/${item._Product_Slug}`}>
                        <span>{item._ProductName} × {item._Quantity} </span>
                      </Link>
                      <span>Rs. {item._ProductPrice} </span>
                    </div>
                  ))}

                  <div className="flex justify-between">
                    <span>  Delivery Charges </span>
                    <span>Rs. {orderdata.delevery ?? "00"} </span>
                  </div>
                  <div className="flex justify-between">
                    <span> Discount  </span>
                    <span>Rs. {orderdata.discount ?? "00"} </span>
                  </div>
                  <div className="flex justify-between">
                    <span> Total  </span>
                    <span>Rs. {(totalPrice + orderdata.delevery + orderdata.discount) ?? "00"} </span>
                  </div>



                  <button className="w-full mt-6 bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition">
                    Place Order
                  </button>
                </div>

              </div>

            </div>
          </form>

          {/* Tailwind reusable class */}

        </div>
      </div>
    </>
  );
}
