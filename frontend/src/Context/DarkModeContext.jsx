import React, { createContext, useState } from 'react'
const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(true);
    function toggleDarkMode() {
        setDarkMode(prev => !prev);
    }
    return (
        <div>
            <DarkModeContext.Provider value={{ toggleDarkMode, darkMode }}>
                {children}
            </DarkModeContext.Provider>
        </div>
    )
}

export { DarkModeContext, DarkModeProvider }