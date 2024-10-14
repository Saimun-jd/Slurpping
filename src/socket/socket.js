import io from 'socket.io-client';

const socket = io('http://localhost:9000');


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