import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchLoggedInUserOrderAsync,
    selectUserInfo,
    selectUserInfoStatus,
    selectUserOrders,
} from '../userSlice';
import { discountedPrice } from '../../../app/constants';
import { Grid } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function UserOrders() {
    const dispatch = useDispatch();
    const orders = useSelector(selectUserOrders);
    const status = useSelector(selectUserInfoStatus);

    useEffect(() => {
        dispatch(fetchLoggedInUserOrderAsync());
    }, [dispatch]);

    return (
        <div>
        <h1 className='mx-auto text-4xl font-bold'>My Orders</h1>

        {orders && orders?.map((order) => (
            <div key={order.id}>
            <div>
                <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8 rounded-2xl border-2 border-gray-200 shadow-lg">
                <div className=" px-4 py-6 sm:px-6">
                    <h1 className="text-xl my-5 font-bold tracking-tight text-gray-900">
                    OrderID # {order.id}
                    </h1>
                    <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                    Order Status : {order.status}
                    </h3>
                    <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                        {order?.items?.map((item) => (
                        <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                                src={item?.product?.thumbnail}
                                alt={item?.product?.title}
                                className="h-full w-full object-cover object-center"
                            />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                            <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                    <Link to={`/product-detail/${item?.product?.id}`}>{item?.product?.title}</Link>
                                </h3>
                                <p className="ml-4">${discountedPrice(item?.product)}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                {item?.product?.brand}
                                </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-500">
                                <label
                                    htmlFor="quantity"
                                    className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                >
                                    Qty :{item?.quantity}
                                </label>
                                </div>

                                <div className="flex"></div>
                            </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6 flex justify-between items-center">
                    <div>
                        <div className="flex gap-4 my-2 text-base font-medium text-gray-900">
                        <p>Subtotal -- </p>
                        <p>$ {order?.totalAmount}</p>
                        </div>
                        <div className="flex gap-4 my-2 text-base font-medium text-gray-900">
                        <p>Total Items in Cart -- </p>
                        <p>{order?.totalItems} items</p>
                        </div>
                    </div>
                    <div>
                        <p className="mt-0.5 text-base text-black font-bold">
                        Shipping Address :
                        </p>
                        <div className="flex  gap-x-6 px-5 w-fit py-5 border-solid border-2 rounded-lg mt-2 border-gray-200">
                        <div className="flex gap-x-4">
                            <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                                {order?.selectedAddress.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {order?.selectedAddress.street}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {order?.selectedAddress.pinCode}
                            </p>
                            </div>
                        </div>
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                            Phone: {order?.selectedAddress.phone}
                            </p>
                            <p className="text-sm leading-6 text-gray-500">
                            {order?.selectedAddress.city}
                            </p>
                        </div>
                        </div>
                    </div>
                    
                </div>
                </div>
            </div>
            </div>
        ))}
        {status === 'loading' ? (
            <Grid
            height="80"
            width="80"
            color="rgb(79, 70, 229) "
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
        ) : null}
        </div>
    );
}