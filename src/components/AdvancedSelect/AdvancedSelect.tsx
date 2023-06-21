import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { BsCaretDown, BsCaretUp, BsCheck } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

import { useTheme } from '../../contexts/ThemeContext';
import { AdvancedSelectOption } from './type';

import '../../App.css';
import './AdvancedSelect.css';

type AdvancedSelectProps = {
    options: AdvancedSelectOption[]
    placeholder?: string
    defaultValue?: string[]
    isMultiple?: boolean
    disable?: boolean
}

const AdvanceSelect: React.FC<AdvancedSelectProps> = (props) =>
{
    const { options, defaultValue = [], isMultiple = false, placeholder = 'Select an option...', disable = false } = props;

    const { theme } = useTheme();

    const [valueList, setValueList] = useState<string[]>(defaultValue);
    const [dropdownMenuVisible, setDropdownMenuVisible] = useState<boolean>(false);
    const [focusedIndex, setFocusIndex] = useState(0);
    const [showOptions, setShowOptions] = useState<AdvancedSelectOption[]>(options);
    const [message, setMessage] = useState<string>('');

    const selectRef = useRef<any>();

    useEffect(() =>
    {
        const checkIfClickedOutside = (e: MouseEvent) =>
        {
            const a = e.target;

            if (dropdownMenuVisible && selectRef.current && !selectRef.current.contains(a))
            {
                setDropdownMenuVisible(false);
            }
        };

        document.addEventListener('mousedown', e => checkIfClickedOutside(e));

        return () =>
        {
            document.removeEventListener('mousedown', e=> checkIfClickedOutside(e));
        };
    }, [dropdownMenuVisible]);

    const itemClickHandler = (id: string) =>
    {
        setDropdownMenuVisible(false);

        if (!isMultiple || !valueList)
        {
            setValueList([id]);
            return;
        }

        if (valueList.some(element => element === id))
        {
                    
            let currentValueList: string[] = valueList;
            currentValueList = currentValueList.filter((currentValueList) => currentValueList !== id);
            setValueList(currentValueList);

        }
        else
        {
            const currentValueList: string[] = valueList;
            currentValueList.push(id);
            setValueList(currentValueList);
        }

        
    };

    const clearItemHandler = (event: React.MouseEvent<HTMLElement>) =>
    {
        setValueList([]);
        event.stopPropagation();
    };
    const textInputHandle = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) =>
    {
        if (event.target.value.length > 0)
        {
            event.stopPropagation();
        }

        const { target } = event;
        const filterOption = options.filter((options) => options.label.toLocaleLowerCase().includes(target.value.toLowerCase()));

        setShowOptions(filterOption);
        setMessage(event.target.value);
        setFocusIndex(0);
    };

    const deselectItemHandler = (id: string) =>
    {
        setValueList(currentValueList => currentValueList.filter((currentValueList) => currentValueList !== id));
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) =>
    {
        const { key } = e;
        let nextIndexCount = 1;

        // move down
        if (key === 'ArrowDown')
        {
            nextIndexCount = (focusedIndex + 1) % (showOptions.length);
            if (nextIndexCount === 0) {nextIndexCount = showOptions.length;}
            setFocusIndex(nextIndexCount);
        }

        // move up
        if (key === 'ArrowUp')
        {
            nextIndexCount = (focusedIndex + showOptions.length - 1) % (showOptions.length);
            
            if (nextIndexCount === 0) {nextIndexCount = showOptions.length;}
            setFocusIndex(nextIndexCount);
        }

        if (key === 'Enter')
        {
            if (focusedIndex > 0)
            {
                itemClickHandler(showOptions[focusedIndex - 1].id);
            }
            setFocusIndex(0);
        }

        if (key === 'Backspace')
        {
            if (valueList.length > 0 && message.length === 0)
            {
                deselectItemHandler(valueList[valueList.length - 1]);
            }
            setFocusIndex(focusedIndex);
        }

        setDropdownMenuVisible(true);
    };

    const renderAbc = () =>
    {
        return (
            <div className='select-content'>
                {valueList.map((id) => (
                    <div
                        key={id}
                        className='value-list'
                    >{options[parseInt(id) - 1].label}
                        <button
                            className='deselect-btn'
                            onClick={(e) =>
                            {
                                deselectItemHandler(id);
                                e.stopPropagation();
                            }}
                        >
                            <AiOutlineClose />
                        </button>
                    </div>
                ))}
                <input
                    className='input-select'
                    type='text'
                    placeholder={valueList.length === 0 ? placeholder : ''}
                    tabIndex={0}
                    onChange={textInputHandle}
                    onKeyDown={handleKeyDown}
                />
            </div>
        );
    };

    return (
        <div
            ref = {selectRef}
            className='select-container'
            style={disable ? { pointerEvents: 'none', opacity: '0.7' } : {}}
        >
            <div className='select-wrapper'>
                <div
                    tabIndex={0}
                    className='select-showValue'
                    onClick={(e) =>
                    {
                        setDropdownMenuVisible(!dropdownMenuVisible);
                        e.stopPropagation();
                    }}
                >
                    {isMultiple
                        ? renderAbc()
                        : (
                            <div className='select-content'>
                                {valueList.length > 0 && options[parseInt(valueList[0]) - 1].label}
                                <input
                                    className='input-select'
                                    type='text'
                                    placeholder={valueList.length === 0 ? placeholder : ''}
                                    tabIndex={0}
                                    onChange={textInputHandle}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                        )
                    }
                    <div className='select-icon'>
                        {
                            valueList.length !== 0 && (
                                <button
                                    className='clear-btn'
                                    onClick={clearItemHandler}
                                >
                                    <AiOutlineClose color={theme === 'dark' ? '#fff' : '#000'} />
                                </button>
                            )
                        }
                        {
                            dropdownMenuVisible ? <BsCaretUp /> : <BsCaretDown />
                        }
                    </div>
                </div>
            </div>
            {
                dropdownMenuVisible && (
                    <div
                        className='select-items'
                        style={showOptions.length === 0 ? { display: 'none' } : {}}
                    >
                        {showOptions.map(({ id, label }) => (
                            <div
                                key={id}
                                className={`item ${focusedIndex > 0 && id === showOptions[focusedIndex - 1].id && 'item--focus'}`}
                                style={{ backgroundColor: focusedIndex > 0 ? (id === showOptions[focusedIndex - 1].id ? 'rgba(64, 196, 255,0.3)' : '') : '' }}
                                onClick={() => itemClickHandler(id)}
                            >
                                <div className='item-tick'>
                                    {
                                        valueList.find(element => element === id) ? <BsCheck size="100%" /> : <></>
                                    }
                                </div>
                                <p>{label}</p>
                            </div>
                        ))}
                    </div>
                )
            }

        </div>
    );
};
export default AdvanceSelect;
