const LockButton = ({
    locked,
    isOwner,
    onLock,
    onUnlock
}) => {

    if (!locked) {
        return (
            <button onClick={onLock}>
                🔒 Lock System
            </button>
        );
    }

    if (isOwner) {
        return (
            <button onClick={onUnlock}>
                🔓 Unlock System
            </button>
        );
    }

    return (
        <p>
            Only the user who locked the system can unlock it.
        </p>
    );
};

export default LockButton;