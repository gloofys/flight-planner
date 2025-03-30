

const DesktopSeatLegend = () => {
    return (
        <aside className="hidden md:block w-64 p-4 bg-ebb sticky top-4 self-start">
            <h4 className="text-lg font-bold mb-4">Seat Legend</h4>
            <ul>
                <li className="flex items-center space-x-2 mb-2">
                    <span className="w-4 h-4 bg-gray-300 rounded"></span>
                    <span>Occupied</span>
                </li>
                <li className="flex items-center space-x-2 mb-2">
                    <span className="w-4 h-4 bg-green-200 rounded"></span>
                    <span>Available</span>
                </li>
                <li className="flex items-center space-x-2 mb-2">
                    <span className="w-4 h-4 bg-blue-600 rounded"></span>
                    <span>Selected</span>
                </li>
                <li className="flex items-center space-x-2">
                    <span className="w-4 h-4 border-2 border-yellow-500 rounded"></span>
                    <span>Extra Legroom</span>
                </li>
            </ul>
        </aside>
    );
};

export default DesktopSeatLegend;
