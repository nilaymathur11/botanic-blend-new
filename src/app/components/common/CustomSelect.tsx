import { CustomSelectProps } from "@/utils/interfaces/CommonInterfaces";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { useOnClickOutside } from 'usehooks-ts'

export default function CustomSelect({
    options,
    value,
    onChange,
    label
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef(null);

    const handleClickOutside = () => {
        setIsOpen(false);
    }
    useOnClickOutside(selectRef, handleClickOutside)

    return (
        <div className="relative" ref={selectRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex gap-1 items-center px-4 py-2 text-left bg-white border border-[#4d7c0f] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4d7c0f] focus:border-[#4d7c0f]"
            >
                <div>{options.find((option) => option.value === value)?.label || label}</div>
                <ChevronDown className="w-5 h-5 text-[#4d7c0f]" />
            </button>
            {isOpen && (
                <div className="absolute z-10 w-max max-h-[300px] overflow-auto mt-2 bg-white border border-[#4d7c0f] rounded-md shadow-lg">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className="block w-full px-6 py-2 text-left hover:bg-[#F5F5F5] focus:outline-none focus:bg-[#F5F5F5]"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
