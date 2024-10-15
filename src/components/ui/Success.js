export default function Success({ message }) {
    return (
        <div className="flex items-center">
            <div className="relative bg-green-200 max-w-xl px-4 py-2 text-green-800 rounded shadow w-full">
                <span className="block text-sm">{message}</span>
            </div>
        </div>
    );
}