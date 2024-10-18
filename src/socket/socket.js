import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL);


const socketFunctions = {
    connectSocket: (user, setOnlineUsers) => {
        socket.emit('new-user-add', user?._id);
        socket.on('get-users', (users) => {
            setOnlineUsers(users);
            console.log(users);
        })
    }
}

export default socketFunctions;