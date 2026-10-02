const LockStatus = ({ lock }) => {

    if (!lock) {
        return <p>Loading lock status...</p>;
    }

    return (
        <div>

            <h2>
                {lock.locked
                    ? "🔒 SYSTEM LOCKED"
                    : "🔓 SYSTEM UNLOCKED"}
            </h2>

            {lock.locked && lock.lockedBy && (
                <p>
                    Locked by:{" "}
                    <strong>
                        {lock.lockedBy.username}
                    </strong>
                </p>
            )}

            {lock.locked && lock.lockedAt && (
                <p>
                    Locked at:{" "}
                    {new Date(lock.lockedAt).toLocaleString()}
                </p>
            )}

        </div>
    );
};

export default LockStatus;