"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import TableFilter from '@/components/tableFilterSearch';
import AddBattery from '@/components/AddBattery';
import { GetParams, ResponseData} from '@/interfaces/batteryInterface';
import CapBarChart from '@/components/CapBarChart';

const Home = () => {
  const [powerHubData, setPowerHubData] = useState<ResponseData | undefined>(undefined);

  useEffect(() => {
    fetchData({});
  }, []);

  const fetchData = async (params: GetParams) => {
    try {
      const response = await axios.get('http://localhost:5001/batteries',{params});
      setPowerHubData(response?.data);
  
    } catch (err) {
  
    }
  };

  const handleFilter = async (filterParams?: GetParams) => {
    await fetchData(filterParams || {});
  };

  
  const showTableData = powerHubData && powerHubData.batteries.length > 0;

  let stats: {total: number; average: number} | null = null;

  if (showTableData) {
    stats = {
      total: powerHubData.totalWattCapacity,
      average: powerHubData.averageWattCapacity
    }
  }

  return (
    <div>
      <h1 className='block text-center font-bold text-lg p-4'>Battery Hub</h1>
      
      <div className="mb-8 px-40 flex justify-between">
        <TableFilter onFilter={handleFilter} />
        <AddBattery  onFilter={handleFilter} />
      </div>

      { showTableData && (
        <div className="mb-8 px-40">
          <table className="min-w-full border rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Postal Code</th>
                <th className="py-2 px-4 text-left">Watt Capacity</th>
              </tr>
            </thead>

            <tbody>
              {powerHubData.batteries.map((battery) => (
                <tr key={battery._id} className="bg-gray-100">
                  <td className="py-2 px-4 text-left">{battery.name}</td>
                  <td className="py-2 px-4 text-left">{battery.postalCode}</td>
                  <td className="py-2 px-4 text-left">{battery.capacity}W</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {stats && <div className='mb-8 px-40'>
        <div className='inline-block px-10 py-10 rounded-md bg-slate-600 bg-opacity-10'>
          <h2 className='font-bold text-lg mb-4'>Statistics for Battery Capacity</h2>
          <CapBarChart stats={stats} />
        </div>
      </div>}
    </div>
  );
}

export default Home;
