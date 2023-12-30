"use client";

import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { MdOutlineClose, MdAdd } from "react-icons/md";
import { GetParams } from '@/interfaces/batteryInterface';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        display: 'block',
        width: '500px'
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
};

interface AddBatteryProps {
    onFilter: (filterParams?: GetParams) => void;
}

const AddBattery:React.FC<AddBatteryProps> = ({onFilter}) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const [name, setName] = useState<string | null>(null);
    const [postalCode, setPostalCode] = useState<number | null>(null);
    const [capacity, setCapacity] = useState<number | null>(null);

    const openModal = () => {
        setIsOpen(true);
      }
    
    const closeModal = () => {
        setIsOpen(false);
        clearFormData();
    }

    const clearFormData = () => {
        setName('');
        setPostalCode(null);
        setCapacity(null);
    }

    const saveBatteryData = async () => {
        try {
          await axios.post('http://localhost:5001/batteries', [{
            name,
            postalCode,
            capacity
          }]);
          
          clearFormData();

          closeModal();
          onFilter();
      
        } catch (err) {
      
        }
      };


    return (
        <>
            <button
                className='px-4 py-2 border-2 border-solid border-gray-500 rounded-3xl h-fit hover:bg-gray-800 hover:text-white'
                onClick={openModal}
            >
                <MdAdd size='1.5em' className='inline-block' /> 
                <span className='font-semibold'>Add</span>
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Filters Modal"
            >   
                <div className='flex justify-between mb-3'>
                    <h2 className='block font-bold'>Add Battery</h2>
                    <button onClick={closeModal}><MdOutlineClose /></button>
                </div>

                <div className='flex flex-col justify-center mb-3'>
                    <div className='mb-3 w-4/5 flex justify-between items-center'>
                        <label>Battery Name:</label>
                        <input
                            className='w-2/5 border-2 border-solid border-gray-300 rounded p-2'
                            type="text"
                            placeholder='name'
                            value={name || ''}
                            onChange={(e) => setName(e.target.value || null)}
                            />
                    </div>

                    <div className='mb-3 w-4/5 flex justify-between items-center'>
                    
                        <label>Postal Code:</label>
                        <input
                            className='w-2/5 border-2 border-solid border-gray-300 rounded p-2'
                            type="number"
                            placeholder='postal code'
                            value={postalCode || ''}
                            onChange={(e) => setPostalCode(parseInt(e.target.value) || null)}
                            />
                    </div>

                    <div className='mb-3 w-4/5 flex justify-between items-center'>
                        <label>Watt Capacity:</label>
                        <input
                            className='w-2/5 border-2 border-solid border-gray-300 rounded p-2'
                            type="number"
                            placeholder='capacity'
                            value={capacity || ''}
                            onChange={(e) => setCapacity(parseInt(e.target.value) || null)}
                            />
                    </div>    
                </div>

                <div className='flex justify-center'>
                    <button className='bg-sky-700 py-2 px-3 rounded text-white font-semibold' onClick={saveBatteryData}>Add Battery</button>
                </div>
            </Modal>
        </>
    );
}

export default AddBattery;
