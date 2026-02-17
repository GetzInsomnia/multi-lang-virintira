'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
    isContactDrawerOpen: boolean;
    openContactDrawer: () => void;
    closeContactDrawer: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
    const [isContactDrawerOpen, setIsContactDrawerOpen] = useState(false);

    const openContactDrawer = () => setIsContactDrawerOpen(true);
    const closeContactDrawer = () => setIsContactDrawerOpen(false);

    return (
        <UIContext.Provider value={{ isContactDrawerOpen, openContactDrawer, closeContactDrawer }}>
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
}
