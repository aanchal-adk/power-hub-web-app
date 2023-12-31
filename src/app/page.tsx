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

      {stats && <div className='px-40 flex justify-end'>
        <CapBarChart stats={stats} />
      </div>}
    </div>
  );
}

export default Home;

// "use client";

// import { useState } from 'react';
// import axios from 'axios';

// export default function Home() {
//   const [name, setName] = useState('');
//   const [postcode, setPostcode] = useState('');
//   const [wattCapacity, setWattCapacity] = useState('');

//   const [startPostcode, setStartPostcode] = useState('');
//   const [endPostcode, setEndPostcode] = useState('');
//   const [filter, setFilter] = useState('');

//   const [batteries, setBatteries] = useState([]);
//   const [totalWattCapacity, setTotalWattCapacity] = useState(0);
//   const [averageWattCapacity, setAverageWattCapacity] = useState(0);

//   const addBattery = async () => {
//     try {
//       await axios.post('/api/batteries', {
//         name,
//         postcode,
//         wattCapacity: parseInt(wattCapacity),
//       });
//       alert('Battery added successfully');
//       setName('');
//       setPostcode('');
//       setWattCapacity('');
//     } catch (error) {
//       console.error(error);
//       alert('Error adding battery');
//     }
//   };

//   const searchBatteries = async () => {
//     try {
//       const response = await axios.get('/api/batteries', {
//         params: { start: startPostcode, end: endPostcode, filter },
//       });
//       setBatteries(response.data.batteries);
//       setTotalWattCapacity(response.data.totalWattCapacity);
//       setAverageWattCapacity(response.data.averageWattCapacity);
//     } catch (error) {
//       console.error(error);
//       alert('Error fetching batteries');
//     }
//   };

//   return (
//     <div>
//       <h1>Virtual Power Plant</h1>

//       <div>
//         <h2>Add Battery</h2>
//         <label>Name:</label>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//         <label>Postcode:</label>
//         <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
//         <label>Watt Capacity:</label>
//         <input type="text" value={wattCapacity} onChange={(e) => setWattCapacity(e.target.value)} />
//         <button onClick={addBattery}>Add Battery</button>
//       </div>

//       <div>
//         <h2>Search Batteries</h2>
//         <label>Start Postcode:</label>
//         <input type="text" value={startPostcode} onChange={(e) => setStartPostcode(e.target.value)} />
//         <label>End Postcode:</label>
//         <input type="text" value={endPostcode} onChange={(e) => setEndPostcode(e.target.value)} />
//         <label>Filter:</label>
//         <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
//         <button onClick={searchBatteries}>Search Batteries</button>
//       </div>

//       <div>
//         <h2>Battery List</h2>
//         <p>Total Watt Capacity: {totalWattCapacity}</p>
//         <p>Average Watt Capacity: {averageWattCapacity}</p>
//         <ul>
//           {batteries.map((battery) => (
//             <li key={battery._id}>
//               {battery.name} - {battery.postalCode} - {battery.capacity}W
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }