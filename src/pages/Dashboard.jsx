import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
    getLockStatus,
    lockSystem,
    unlockSystem
} from "../services/lockService";

import LockStatus from "../components/LockStatus";
import LockButton from "../components/LockButton";

const Dashboard = () => {

    const { user, logout } = useAuth();

    const [lock, setLock] = useState(null);
    const [error, setError] = useState("");

    const loadLockStatus = async () => {

        try {

            const data = await getLockStatus();

            setLock(data);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to load lock status"
            );
        }
    };

    useEffect(() => {
        loadLockStatus();
    }, []);

    const handleLock = async () => {

        try {

            setError("");

            const data = await lockSystem();

            setLock(data.lock);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to lock system"
            );
        }
    };

    const handleUnlock = async () => {

        try {

            setError("");

            const data = await unlockSystem();

            setLock(data.lock);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to unlock system"
            );
        }
    };

    const isOwner =
        lock?.locked &&
        lock?.lockedBy?._id === user?.id;

    return (
        <div>

            <header>

                <h1>Shared Lock</h1>

                <div>
                    Logged in as: <strong>{user?.username}</strong>

                    <button onClick={logout}>
                        Logout
                    </button>
                </div>

            </header>

            <main>

                <LockStatus lock={lock} />

                <LockButton
                    locked={lock?.locked}
                    isOwner={isOwner}
                    onLock={handleLock}
                    onUnlock={handleUnlock}
                />

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

            </main>

        </div>
    );
};

export default Dashboard;