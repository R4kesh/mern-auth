import React, { useState, useEffect } from 'react';

const AdminHome = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [editingUser, setEditingUser] = useState(null);
    const [editedUserName, setEditedUserName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('/api/user/details');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditUser = (user) => {
        setEditingUser(user);
        setEditedUserName(user.username);
        setEditedEmail(user.email);
    };

    const cancelEdit = () => {
        setEditingUser(null);
        setEditedUserName('');
        setEditedEmail('');
    };

    const saveEditedUser = async () => {
        try {
            const response = await fetch(`/api/user/update/${editingUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: editedUserName, email: editedEmail }),
            });
            const updatedUser = await response.json();
            setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
            cancelEdit();
            fetchUserData();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteUser = async(userId) => {
        try {
            await fetch(`/api/user/delete/${userId}`, {
                method: 'DELETE', 
            });
            fetchUserData();
            console.log('User deleted successfully'); 
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

     const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      
    } catch (error) {
      console.log(error);
    }
  };

    return (
        <>
        
        <div>
            <nav className="flex items-center justify-between bg-gray-800 text-white p-4">
                <div className="flex items-center">
                    <span className="font-bold">Welcome Admin</span>
                </div>
                <div>
                    <button onClick={handleSignOut} className="text-white hover:text-gray-300">Logout</button>
                </div>
            </nav>

            <div className="p-4">
                <input
                    type="text"
                    placeholder="Search by name or email.."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className="p-4">
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 p-2">Id</th>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id}>
                                <td className="border border-gray-300 p-2">{user._id}</td>
                                <td className="border border-gray-300 p-2">
                                    {editingUser && editingUser._id === user._id ? (
                                        <input
                                            type="text"
                                            value={editedUserName}
                                            onChange={(e) => setEditedUserName(e.target.value)}
                                        />
                                    ) : (
                                        user.username
                                    )}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {editingUser && editingUser._id === user._id ? (
                                        <input
                                            type="email"
                                            value={editedEmail}
                                            onChange={(e) => setEditedEmail(e.target.value)}
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {editingUser && editingUser._id === user._id ? (
                                        <>
                                            <button className='bg-green-400 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' onClick={saveEditedUser}>Save</button>
                                            <button  className='bg-red-400 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' onClick={cancelEdit}>Cancel</button>
                                        </>
                                    ) : (
                                        <button className='bg-green-400 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' onClick={() => handleEditUser(user)}>Edit</button>
                                    )}
                                    {'                    '}
                                    
                                    <button className='bg-red-400 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default AdminHome;
