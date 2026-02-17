'use client';

import { useUI } from '@/context/UIContext';
import ContactDrawer from './ContactDrawer';

export default function GlobalContactDrawer() {
    const { isContactDrawerOpen, closeContactDrawer } = useUI();

    return (
        <ContactDrawer isOpen={isContactDrawerOpen} onClose={closeContactDrawer} />
    );
}
