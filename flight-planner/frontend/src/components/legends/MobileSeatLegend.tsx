

const MobileSeatLegend = () => {
    return (
        <div className="md:hidden p-4 bg-gray-200">
            <ul className="flex justify-around">
                <li className="flex flex-col items-center">
                    <span className="w-4 h-4 bg-gray-300 rounded mb-1"></span>
                    <span className="text-xs">Occupied</span>
                </li>
                <li className="flex flex-col items-center">
                    <span className="w-4 h-4 bg-green-200 rounded mb-1"></span>
                    <span className="text-xs">Available</span>
                </li>
                <li className="flex flex-col items-center">
                    <span className="w-4 h-4 bg-blue-600 rounded mb-1"></span>
                    <span className="text-xs">Selected</span>
                </li>
                <li className="flex flex-col items-center">
                    <span className="w-4 h-4 border-2 border-yellow-500 rounded mb-1"></span>
                    <span className="text-xs">Extra Legroom</span>
                </li>
            </ul>
        </div>
    );
};

export default MobileSeatLegend;
