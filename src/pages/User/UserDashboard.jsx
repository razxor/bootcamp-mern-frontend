import React, { useState, useEffect, useContext } from 'react'
import StatsBox from '../../components/shared/StatsBox'
import { AuthContext } from "../../Provider/AuthProvider";

export default function UserDashboard() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalSpent, setTotalSpent] = useState([]);
  const { user, logOutUser } = useContext(AuthContext)

  useEffect(() => {
    setLoading(true)
    if (loading) <Loader />
    try {
      fetch(`${import.meta.env.VITE_BASE_URL}/api/myOrder/${user._id}`) // api for the get request
        .then(response => response.json())
        .then(data => {
          setProducts(data.orders)
          setTotalSpent(data.totalSpent)
        });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [])
  


  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2 md:gap-10'>
        <StatsBox title='Total Spent' value={'$'+totalSpent} bgColor='bg-blue-400' />
        <StatsBox title='Total Order' value={products.length} bgColor='bg-green-400' />
      </div>
      <div className='grid py-6'>
        <h1 className='text-2xl font-bold'>My Orders</h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {
                products && products.map((item,i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={`${item.product.image}`}                                
                              alt="Avatar Tailwind CSS Component" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item?.product.bookName}</div>
                            <div className="text-sm opacity-50">{item?.product.author}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        ${item?.product.price}
                      </td>
                      <th>
                        <button className="btn btn-success btn-sm rounded text-white">Pay</button>
                      </th>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
