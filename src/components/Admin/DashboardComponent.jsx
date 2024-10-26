import React, {useState, useEffect} from 'react'
import StatsBox from '../shared/StatsBox';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalSpent, setTotalSpent] = useState([]);

  useEffect(() => {
    setLoading(true)
    if (loading) <Loader />
    try {
      fetch(`${import.meta.env.VITE_BASE_URL}/api/admin_order`) // api for the get request
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
  console.log('products ', products);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2 md:gap-10'>
        <StatsBox title='Total Sell' value={'$'+totalSpent} bgColor='bg-blue-400' />
        <StatsBox title='Total Order' value={products.length} bgColor='bg-green-400' />
    </div>
  )
}
export default Dashboard