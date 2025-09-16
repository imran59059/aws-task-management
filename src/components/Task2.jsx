import { useEffect, useState } from "react"

const Task2 = () => {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([
        { taskId: 1, title: 'Hello', desc: 'Hello Desc', status: 'open' }
    ]);

    const handleAddTask = async () => {        
        try {
            const response = await fetch('https://5l4u7l75gflzl5n3de2uhyzztm0qqvor.lambda-url.ap-south-1.on.aws/', {
                method: 'POST',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "title": input,
                    "description": "This for test",
                    "priority": "High"
                })
            })

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            console.log({ data });
            setTasks((prev) => [...prev, {
                taskId: Date.now(),
                title: input,
                desc: 'Test',
                status: 'Open'
            }])
            setInput('');
        } catch (err) {
            console.log({ err });
        }
    }

    const getAllTasks = async () => {
        try {
            const response = await fetch('https://ia6dib3dqalwzccoq7pikjg7wa0emuhy.lambda-url.ap-south-1.on.aws/', {
                method: 'GET'
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const allTasks = await response.json();
            console.log({ allTasks });
            setTasks(allTasks.tasks)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        console.log('useeffect called');
        getAllTasks();
    }, [])

    return (
        <div className='bg-green-50 py-2 w-full px-5'>
            <h1 className='text-xl underline py-5'>Tasks Management - IMRAN ALI</h1>

            <div>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Enter Task' className='border-b-2' />
                <button className='bg-green-500 px-1 rounded mx-2' onClick={handleAddTask}>Add</button>
            </div>
            Tasks: {tasks?.length}
            <div className="w-full overflow-x-auto my-5 h-100">
                <table className="border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Sl. No.</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Task</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Details</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Status</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {tasks.sort((a, b) => b.taskId - a.taskId).map((t) =>
                            <tr key={t.taskId} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-600">{t.taskId}</td>
                                <td className="px-4 py-2 text-sm text-gray-600">{t.title}</td>
                                <td className="px-4 py-2 text-sm text-gray-600">{t.description}</td>
                                <td className="px-4 py-2 text-sm">
                                    <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                                        <span className='text-red-500'>{t.status}</span>
                                    </span>
                                </td>
                                <td>
                                    <button className="px-4 py-2 text-sm text-red-600 cursor-pointer hover:text-red-800">Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Task2