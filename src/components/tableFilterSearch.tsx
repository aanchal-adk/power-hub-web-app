"use client";

import Modal from 'react-modal';
import React, { useEffect, useState } from 'react';
import { GetParams } from '@/interfaces/batteryInterface';
import { MdOutlineClose, MdFilterAlt  } from "react-icons/md";

interface TableFilterProps {
    onFilter: (filterParams?: GetParams) => void;
}

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

const TableFilter: React.FC<TableFilterProps> = ({onFilter}) => {
    const [pcStart, setPcStart] = useState<number | null>(null);
    const [pcEnd, setPcEnd] = useState<number | null>(null);
    const [gteCap, setGteCap] = useState<number | null>(null);
    const [lteCap, setLteCap] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState<string | null>('');

    const [modalIsOpen, setIsOpen] = React.useState(false);

    const openModal = () => {
        setIsOpen(true);
      }
    
    const closeModal = () => {
        setIsOpen(false);
    }

    const handleFilter = () => {
        const filterOptions: GetParams = {};
        if (pcStart) filterOptions['pc_start'] = pcStart;
        if (pcEnd) filterOptions['pc_end'] = pcEnd;
        if (gteCap) filterOptions['gte_cap'] = gteCap;
        if (lteCap) filterOptions['lte_cap'] = lteCap;
        if (searchQuery) filterOptions['search'] = searchQuery;

        onFilter(filterOptions);

        if (modalIsOpen) closeModal();
    }
    
    const handleResetFilter = () => {
        setPcStart(null);
        setPcEnd(null);
        setGteCap(null);
        setLteCap(null);

        onFilter();
    };

    useEffect(() => {
        let timer = setTimeout(() => {
            handleFilter();
        }, 1500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleSearch = (keyword: string) => {

        keyword.trim();
        setSearchQuery(keyword);
    };

    return (
        <>  
            <div className='flex justify-start items-center mb-3'>
                <button
                    className='px-4 py-2 border-2 border-solid border-gray-500 rounded-3xl h-fit hover:bg-gray-800 hover:text-white'
                    onClick={openModal}>
                    
                    <MdFilterAlt size='1.5em' className='inline-block' /> 
                    <span className='font-semibold'>All Filters</span>
                </button>

                <input
                    className='ml-2 border-2 border-solid border-gray-300 rounded-3xl p-2'
                    type="text"
                    placeholder='Search for battery name'
                    value={searchQuery || ''}
                    onChange={(e) => handleSearch(e.target.value || '')}
                    />
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Filters Modal"
            >   
                <div className='flex justify-between mb-3'>
                    <h2 className='block font-bold'>All Filters</h2>
                    <button onClick={closeModal}><MdOutlineClose /></button>
                </div>

                <div className='flex justify-center mb-3'>
                    <input
                        className='w-2/5 border-2 border-solid border-gray-300 rounded p-2'
                        type="number"
                        placeholder='postal code >='
                        value={pcStart || ''}
                        onChange={(e) => setPcStart(parseInt(e.target.value) || null)}
                        />
                    
                    <div className='px-4'> - </div>

                    <input
                        className='w-2/5 border-2 border-solid border-gray-300 rounded p-2'
                        type="number"
                        placeholder='postal code <='
                        value={pcEnd || ''}
                        onChange={(e) => setPcEnd(parseInt(e.target.value) || null)}
                        />
                </div>

                <div className='flex justify-center mb-3'>
                    <input
                        className='w-2/5 border-2 border-solid border-gray-300 rounded p-2'
                        type="number"
                        placeholder='capacity >='
                        value={gteCap || ''}
                        onChange={(e) => setGteCap(parseInt(e.target.value) || null)}
                        />
                    
                    <div className='px-4'> - </div>

                    <input
                        className='w-2/5 border-2 border-solid border-gray-300 rounded p-2'
                        type="number"
                        placeholder='capacity <='
                        value={lteCap || ''}
                        onChange={(e) => setLteCap(parseInt(e.target.value) || null)}
                        />
                </div>

                <div className='flex justify-center'>
                    <button className='bg-sky-700 py-2 px-3 rounded text-white font-semibold' onClick={handleFilter}>Show Results</button>
                    <button className='border-2 border-solid border-gray-500 ml-3 py-2 px-3 rounded font-semibold' onClick={handleResetFilter}>Reset Filter</button>
                </div>
            </Modal>
        </>
    );
}

export default TableFilter;
