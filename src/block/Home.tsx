import React from 'react';
const HomeComponent = () => {
    return (
        <div className="w-[75%] h-full flex flex items-center border-[8px] bg-card border-border justify-center p-[36px] shadow-[12px_12px_0px_0px_theme(colors.muted-foreground)] rounded-xl">
            <div className="flex flex-col items-center justify-center p-[36px] w-[100%] text-secondary">
                <p className="text-[72px] font-bold">Hello</p>
                <p className="text-[24px] font-medium">My Name Is</p>
            </div>
            <div className="flex flex-col items-center justify-center p-[72px] w-[100%] rounded-lg border-4 border-border bg-background text-foreground">
                <h1 className={`text-[128px] font-extrabold tracking-widest`}>AMIT</h1>
                <h1 className={`font-body text-[128px] font-extrabold tracking-widest`}>RANA</h1>
            </div>
        </div>
    );
};

export default HomeComponent;
