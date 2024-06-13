export default function Message({ justify, message }) {
    const bg = justify === "end"? "bg-green-500": "bg-blue-500"
    return (
        <li className={`flex justify-${justify}`}>
            <div className={`relative max-w-xl px-4 py-2 text-gray-700 ${bg} rounded-3xl shadow`}>
                <span className="block">{message}</span>
            </div>
        </li>
    );
}
