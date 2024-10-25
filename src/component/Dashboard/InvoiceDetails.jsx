import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const InvoiceDetails = () => {
  const [dataa, setdata] = useState([])
  const token = useSelector((state) => state.auth.token);


  useEffect(() => {
    const fetchData = async () => {
      const url = `${import.meta.env.REACT_APP_BASE_URL}getPaymentdata`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include'
        });

        const result = await response.json(); // Parse JSON response

        if (result.success) {
          setdata(result.data); // Set the state with the fetched data
        } else {
          toast.error("Not able to get payment data", {
            position: "top-center",
            hideProgressBar: true,
            autoClose: 3000,
          });
        }

      } catch (error) {
        console.error('Error fetching payment data:', error);
        toast.error("An error occurred while fetching payment data", {
          position: "top-center",
          hideProgressBar: true,
          autoClose: 3000,
        });
      }
    };

    fetchData(); // Call the fetch function

  }, [token]); // Add token as a dependency if it changes

  console.log(dataa)


  return (
    <div>
      <div>
        <h2>Payment History</h2>
        <table className="border-2  mt-4  border-gray-700 mx-3 xl:hidden">
          <thead>
            <tr className='bg-[#2C333F]  text-gray-200 text-lg'>
              <th className="py-3 px-5">Date</th>
              <th className="py-3 px-5">Customer Name</th>
              <th className="py-3 px-5">Order ID</th>
              <th className="py-3 px-5">Amount</th>
              <th className="py-3 px-5">Payment Method</th>
              <th className="py-3 px-5">Status</th>
              <th className="py-3 px-5">Currency</th>
            </tr>
          </thead>
          <tbody>
            {/* {payments.map((payment) => (
            <tr key={payment.transactionId}>
              <td className="border border-gray-300 p-2">{payment.transactionId}</td>
              <td className="border border-gray-300 p-2">{new Date(payment.date).toLocaleDateString()}</td>
              <td className="border border-gray-300 p-2">${payment.amount.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">{payment.paymentMethod}</td>
              <td className="border border-gray-300 p-2">{payment.status}</td>
              <td className="border border-gray-300 p-2">{payment.description}</td>
              <td className="border border-gray-300 p-2">{payment.refundStatus}</td>
              <td className="border border-gray-300 p-2">{payment.customerName}</td>
            </tr>
          ))} */}
            {
              dataa?.payment?.length <= 0 && (
                <tr className='border-2  text-gray-400 text-center border-b-2 border-gray-700'>
                  <td className='p-3 font-semibold border-r-2 border-gray-700'>Null</td>
                  <td className='p-3 font-semibold border-r-2 border-gray-700'>Null</td>
                  <td className='p-3 font-semibold border-r-2 border-gray-700'>Null</td>
                  <td className='p-3 font-semibold border-r-2 border-gray-700'>Null</td>
                  <td className='p-3 font-semibold border-r-2 border-gray-700'>Null</td>
                  <td className='p-3 font-semibold border-r-2 border-gray-700'>Null</td>
                  <td className='p-3 font-semibold'>Null</td>
                </tr>
              )
            }
            {
              dataa?.payment?.length > 0 && dataa?.payment?.map((data, index) => {
                   console.log(dataa)
                return (
                  <tr className='border-2  text-gray-400 text-center border-b-2 border-gray-700 ' key={index}>
                    <td className='py-3 px-4 font-semibold border-r-2 border-gray-700'>{data.date}</td>
                    <td className='py-3 px-4 font-semibold border-r-2 border-gray-700'>{dataa.firstName} {dataa.lastName}</td>
                    <td className='py-3 px-4 font-semibold border-r-2 border-gray-700'>{data.OrderId}</td>
                    <td className='py-3 px-4 font-semibold border-r-2 border-gray-700'>{data.amount}</td>
                    <td className='py-3 px-4 font-semibold border-r-2 border-gray-700'>{data.paymentMethod}</td>
                    <td className='py-3 px-4 font-semibold border-r-2 border-gray-700'>{data.status}</td>
                    <td className='py-3 px-4 font-semibold'>{data.currency}</td>
                  </tr>)
              })
            }
          </tbody>
        </table>

          {
              dataa?.payment?.length > 0 && dataa?.payment?.map((data, index) => {
                   console.log(dataa)
                return (
                  <div className='border-2  text-gray-400  border-b-2 border-gray-700 hidden xl:flex flex-col py-5 my-5 sm2:text-xs' key={index}>
                    <p className='py-1 px-4 font-semibold'>Customer Name :- {data.date}</p>
                    <p className='py-1 px-4 font-semibold '>Order ID :- {dataa.firstName} {dataa.lastName}</p>
                    <p className='py-1 px-4 font-semibold '>Order ID :- {data.OrderId}</p>
                    <p className='py-1 px-4 font-semibold '>Amount :- {data.amount}</p>
                    <p className='py-1 px-4 font-semibold '>Payment Method :- {data.paymentMethod}</p>
                    <p className='py-1 px-4 font-semibold '>Status :- {data.status}</p>
                    <p className='py-1 px-4 font-semibold'>Currency :- {data.currency}</p>
                  </div>)
              })
            }
 

      </div>
    </div>
  )
}

export default InvoiceDetails
