import React from 'react';
import { Rename } from './components/Rename';
import { DeleteButton } from './components/Delete';
import { Toaster } from "react-hot-toast";

const StoreSettings = () => {
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <div className='flex items-center justify-between '>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                        <p className='text-sm text-muted-foreground'>Manage store preferences.</p>
                    </div>
                    <DeleteButton />
                </div>
                <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
                <Rename />
                <Toaster />
            </div>
        </div>
    );
};

export default StoreSettings;