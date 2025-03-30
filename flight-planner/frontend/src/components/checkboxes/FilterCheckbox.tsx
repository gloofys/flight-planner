interface FilterCheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const FilterCheckbox = ({ label, checked, onChange }: FilterCheckboxProps) => (
    <label className="flex items-center mb-2">
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="mr-2 appearance-none w-4 h-4 border border-gray-400 rounded checked:bg-royal-blue checked:border-transparent focus:outline-none cursor-pointer"
        />
        {label}
    </label>
);

export default FilterCheckbox;
