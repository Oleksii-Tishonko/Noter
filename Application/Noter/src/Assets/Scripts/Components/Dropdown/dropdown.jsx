import { useEffect, useState } from "react";
import "./dropdown.css";

const DropDown = ({ value, setValue, options, label="", leftListPaddingPx = 5, rightListPaddingPx = 5 }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Function to update the state with the current window width
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        

        const handleClickOutside = (event) => {
            const optionListElement = document.querySelector('.optionList');
            console.log(event.target);
            if (!optionListElement.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on component unmount or when dropdown closes
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (dropdownOpen) {
            const selectedOptionElement = document.querySelector('.selectedOption');
            const optionListElement = document.querySelector('.optionList');

            if (selectedOptionElement && optionListElement) {
                const selectedRect = selectedOptionElement.getBoundingClientRect();
                const optionListRect = optionListElement.getBoundingClientRect();
                console.log(`Coordinates of selectedOption: top: ${selectedRect.top}, left: ${selectedRect.left}, width: ${selectedRect.width}, height: ${selectedRect.height}`);

                // Set optionList width and position to cover selectedOption
                optionListElement.style.width = `${selectedRect.width + leftListPaddingPx + rightListPaddingPx}px`;
                //optionListElement.style.left = `${selectedRect.left - leftListPaddingPx}px`;
                optionListElement.style.left = `${-leftListPaddingPx}px`;

            }
        }

    }, [windowWidth, dropdownOpen]);



    function selectOption(option) {
        setValue(option);
        setDropdownOpen(false);
    }

    return (
        <div className="dropdown">
            {dropdownOpen && (
                <div className="optionList">
                    {options.map((option) => (
                        <div key={option} className="dropdownOption" onClick={() => selectOption(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            )
            }

            <div className="selectedOption" onClick={() => setDropdownOpen(true)}>
                {`${label}${value}`}
            </div>
            {/*<div>Window Scale: {windowWidth}</div>*/}

        </div>
    )
}

export default DropDown;