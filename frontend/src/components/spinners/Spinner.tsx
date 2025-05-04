

type SpinnerProps = {
    className?: string;
};

export default function Spinner({ className = '' }: SpinnerProps) {
    return (
        <svg
            className={`animate-spin ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3.536-3.536A9.956 9.956 0 0012 2C6.477 2 2 6.477 2 12h2z"
            />
        </svg>
    );
}