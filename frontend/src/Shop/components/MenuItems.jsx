import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';

const MenuItems = ({ items, depthLevel }) => {
    const [dropdown, setDropdown] = useState(false);

    let ref = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener('mousedown', handler);
        document.addEventListener('touchstart', handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', handler);
            document.removeEventListener('touchstart', handler);
        };
    }, [dropdown]);

    const onMouseEnter = () => {
        window.innerWidth > 960 && setDropdown(true);
    };

    const onMouseLeave = () => {
        window.innerWidth > 960 && setDropdown(false);
    };

    const closeDropdown = () => {
        dropdown && setDropdown(false);
    };

    return (
        <li
            className="menu-items"
            ref={ref}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={closeDropdown}
        >
            {items.id && items.children.length > 0 ? (
                <>
                    <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={dropdown ? 'true' : 'false'}
                        onClick={() => setDropdown((prev) => !prev)}
                    >
                        {window.innerWidth < 960 && depthLevel === 0 ? (
                            items.name
                        ) : (
                            <Link to={items.id}>{items.name}</Link>
                        )}

                        {depthLevel > 0 && window.innerWidth < 960 ? null : depthLevel > 0 &&
                          window.innerWidth > 960 ? (
                            <span>&raquo;</span>
                        ) : (
                            <span className="arrow" />
                        )}
                    </button>
                    <Dropdown
                        depthLevel={depthLevel}
                        submenus={items.children}
                        dropdown={dropdown}
                    />
                </>
            ) : !items.id && items.children.length > 0 ? (
                <>
                    <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={dropdown ? 'true' : 'false'}
                        onClick={() => setDropdown((prev) => !prev)}
                    >
                        {items.name}{' '}
                        {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
                    </button>
                    <Dropdown
                        depthLevel={depthLevel}
                        submenus={items.children}
                        dropdown={dropdown}
                    />
                </>
            ) : (
                <Link to={items.id}>{items.name}</Link>
            )}
        </li>
    );
};

export default MenuItems;
