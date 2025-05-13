import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useApi from '../../hooks/useApi';

const Ladger = ({ partyId }) => {
  const companyData = useSelector((store) => store.userDetail);
  const companyDetails = companyData?.companies?.filter((c, _) => c._id === companyData.activeCompany)
  const [companyName, setCompanyName] = useState('');
  const [partyData, setPartyData] = useState(null);
  const { getApiData } = useApi()


  useEffect(() => {
    if (companyDetails && companyDetails?.length > 0) {
      let name = companyDetails[0]?.name || '';
      if (name.length > 20) {
        name = name.slice(0, 20) + '...';
      }
      setCompanyName(name);
    }
  }, [companyDetails]);


  useEffect(() => {
    const get = async () => {
      const partyData = await getApiData("party", partyId);
      setPartyData(partyData.data);
      console.log(partyData.data)
    }

    get()
  }, [])


  return (
    <div className='content__body__main'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='font-bold'>
            {companyName}
          </p>
          <p className='text-xs text-gray-400'>Phone: {companyDetails && companyDetails[0]?.phone}</p>
        </div>

        <p className='font-bold text-gray-400'>Party Ladger</p>
      </div>
      <hr />

      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <p className='text-xs text-gray-400'>To,</p>
          <p className='font-bold text-xs'>{partyData?.name}</p>
          <p className='text-xs text-gray-400'>Phone: {partyData?.contactNumber || "--"}</p>
        </div>
        <div className='w-[200px] h-[90px] rounded border p-2'>
            <p className='text-xs text-gray-400 text-right border-b w-full pb-1'>Date - Date</p>
            {/* <hr /> */}
            <p className='text-xs text-gray-400 text-right'>Total Receivable</p>
            <p className='font-bold text-right'>6000</p>
        </div>
      </div>

      <div className='table__responsive'>
        <table className='w-full border mt-5'>
          <thead className='bg-gray-100'>
            <tr>
              <td className='p-2'>Date</td>
              <td>Voucher</td>
              <td>Sr No.</td>
              <td>Credit</td>
              <td>Debit</td>
              <td>TDS deductecd by party</td>
              <td>TDS deductecd by self</td>
              <td>Balance</td>
            </tr>
          </thead>
        </table>
      </div>

    </div>
  )
}

export default Ladger;
