export const InlineError = ({text}) => {
    return (
        <div className="text-subMain w-full text-xs font-medium">
            <p>{text}</p>
        </div>
    );
};

export default InlineError;