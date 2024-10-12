export default function Message({ justify, message }) {
    const bg = justify === "end"? "bg-[#3498DB]": "bg-[#9B59B6]"
    return (
        <li className={`flex justify-${justify}`}>
            <div className={`relative max-w-xl px-4 py-2 text-white ${bg} rounded-3xl shadow border-1 ${justify === "end"? "border-[#2980B9]": "border-[#8E44AD]"}`}>
                <span className="block">{message}</span>
            </div>
        </li>
    );
}