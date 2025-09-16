import React, { useEffect, useMemo, useRef, useState } from 'react'

const Tasks = () => {
    const masterCheckboxRef = useRef();
    const [tasks, setTasks] = useState([
        { id: 1, task: 'Table clean', status: true },
        { id: 2, task: 'React Playlist', status: true },
        { id: 3, task: 'Watch tech video', status: false },
        { id: 4, task: 'Learn Somthing New', status: false },
        { id: 5, task: 'Making YouTube Video of Redux lifeCycle - Thats helps to understand and mastery the State management.', status: true },
    ]);
    const [newTaskInput, setNewTaskInput] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [searchInput, setSearchInput] = useState('');

    const handleAddTask = () => {
        const newTask = { id: Date.now(), task: newTaskInput, status: true };
        setTasks((prev) => [...prev, newTask]);
        setNewTaskInput('');
    }

    const handleDelete = (id) => {
        setTasks((prev) => prev.filter((t) => t.id !== id))
    }

    const handleToggle = (id) => {
        setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status: !t.status } : t))
    }

    const allChecked = tasks.every((t) => t.status === false);
    const someChecked = tasks.some((t) => t.status === false);

    useEffect(() => {
        if (masterCheckboxRef.current) {
            masterCheckboxRef.current.indeterminate = !allChecked && someChecked
        }
    }, [allChecked, someChecked])

    console.log({ allChecked, someChecked });

    const handleMasterToggle = (e) => {
        const checked = e.target.checked;
        setTasks((prev) =>
            prev.map(t => ({ ...t, status: !checked }))
        )
    }

    // handle tabs
    const handleTabs = (e) => {
        if (e.target.tagName === "LI") {
            const tab = e.target.innerText;
            setActiveTab(tab);
        }
    }

    // filter tasks
    const filteredTasks = useMemo(() => {
        let data = [...tasks];

        // search handle
        if(searchInput.trim() !== "") data = data.filter(t => t.task.toLowerCase().includes(searchInput.toLowerCase()));

        // filter tabs
        if (activeTab === 'Active') data = data.filter(t => t.status === true);
        if (activeTab === 'Completed') data = data.filter(t => t.status === false);

        return data;
    }, [tasks, activeTab, searchInput])

    return (
        <div className='bg-green-50 my-5 py-2 w-1/2'>
            <h1 className='text-xl'>Tasks Management </h1>
            <div>
                <input onChange={(e) => setNewTaskInput(e.target.value)} value={newTaskInput} type="text" placeholder='Enter Task' className='border-b-2' />
                <button onClick={handleAddTask} className='bg-green-500 px-1 rounded mx-2'>Add</button>
            </div>
            <div className='flex justify-between'>
                <ul onClick={handleTabs} className='flex gap-5 mt-5 cursor-pointer'>
                    <li className={activeTab === "All" && 'text-bold text-green-500'}>All</li>
                    <li className={activeTab === "Active" && 'text-bold text-green-500'}>Active</li>
                    <li className={activeTab === "Completed" && 'text-bold text-green-500'}>Completed</li>
                </ul>
                <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="search" placeholder='Search here' className='border' />
            </div>
            <div class="w-full overflow-x-auto my-5 h-100">
                <table class="border border-gray-200 rounded-lg shadow-md">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                                <input
                                    type="checkbox"
                                    checked={allChecked}
                                    ref={masterCheckboxRef}
                                    onChange={(e) => handleMasterToggle(e)}
                                />
                            </th>
                            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Sl. No.</th>
                            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Task</th>
                            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Status</th>
                            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        {filteredTasks.map((t, index) => (
                            <tr key={t.id} class="hover:bg-gray-50">
                                <td class="px-4 py-2 text-sm text-gray-600"><input checked={!t.status} onChange={() => handleToggle(t.id)} type="checkbox" /></td>
                                <td class="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
                                <td class={`px-4 py-2 text-sm text-gray-600 ${t.status === false && 'line-through'}`}>{t.task}</td>
                                <td class="px-4 py-2 text-sm">
                                    <span class="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                                        {t.status === true ? <span className='text-red-500'>Open</span> : <span className='text-green-500'>Completed</span>}
                                    </span>
                                </td>
                                <td>
                                    {!t.status ?
                                        <button onClick={() => handleDelete(t.id)} class="px-4 py-2 text-sm text-gray-400 cursor-pointer hover:text-gray-500 cursor-not-allowed" disabled>
                                            Delete
                                        </button> :
                                        <button onClick={() => handleDelete(t.id)} class="px-4 py-2 text-sm text-red-600 cursor-pointer hover:text-red-800">
                                            Delete
                                        </button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Tasks