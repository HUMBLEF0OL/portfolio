

export const TopLeft: React.FC<{ width?: number; height?: number }> = ({ width = 12, height = 12 }) => {
    return (
        <span
            className="absolute top-0 left-0 z-10 bg-primary"
            style={{
                width: `${width}px`,
                height: `${height}px`,
                clipPath: 'polygon(0% 100%, 0% 0%, 100% 0%)',
            }}
        />
    );
};

export const TopRight: React.FC<{ width?: number; height?: number }> = ({ width = 12, height = 12 }) => {
    return (
        <span
            className="absolute top-0 right-0 z-10 bg-primary"
            style={{
                width: `${width}px`,
                height: `${height}px`,
                clipPath: 'polygon(100% 100%, 100% 0%, 0% 0%)',
            }}
        />
    );
};

export const BottomLeft: React.FC<{ width?: string, height?: string }> = ({ width = 12, height = 12 }) => {
    return (
        <span
            className={`absolute bottom-0 left-0 w-[${width}px] h-[${height}px] z-10 bg-primary`}
            style={{
                clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%)',
            }}
        />
    )
}

export const BottomRight: React.FC<{ width?: number; height?: number }> = ({ width = 12, height = 12 }) => {
    return (
        <span
            className="absolute bottom-0 right-0 z-10 bg-primary"
            style={{
                width: `${width}px`,
                height: `${height}px`,
                clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)',
            }}
        />
    );
};
