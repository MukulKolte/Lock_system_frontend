import React, {
    useEffect,
    useState
} from "react";

import {
    getLockUsage,
    getLockHistory
} from "../services/analyticsService";


const UsageAnalytics = () => {

    const [period, setPeriod] =
        useState("day");


    const [analytics, setAnalytics] =
        useState(null);


    const [history, setHistory] =
        useState([]);


    const [loading, setLoading] =
        useState(false);


    const [error, setError] =
        useState("");


    // ==================================
    // LOAD DATA
    // ==================================

    const loadData = async () => {

        try {

            setLoading(true);

            setError("");


            const [
                usageData,
                historyData
            ] = await Promise.all([

                getLockUsage(period),

                getLockHistory(10)

            ]);


            setAnalytics(
                usageData
            );


            setHistory(
                historyData.events || []
            );


        } catch (err) {

            console.error(
                "Failed to load lock analytics:",
                err
            );


            setError(

                err.response?.data?.message ||

                "Unable to load lock analytics"

            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadData();

    }, [period]);


    // ==================================
    // FORMAT DURATION
    // ==================================

    const formatDuration =
        (totalSeconds) => {

            if (
                !totalSeconds ||
                totalSeconds <= 0
            ) {

                return "0m";
            }


            const hours =
                Math.floor(
                    totalSeconds / 3600
                );


            const minutes =
                Math.floor(
                    (
                        totalSeconds % 3600
                    ) / 60
                );


            const seconds =
                totalSeconds % 60;


            if (hours > 0) {

                return `${hours}h ${minutes}m`;
            }


            if (minutes > 0) {

                return `${minutes}m ${seconds}s`;
            }


            return `${seconds}s`;
        };


    // ==================================
    // FORMAT DATE
    // ==================================

    const formatDateTime =
        (date) => {

            if (!date) {

                return "-";
            }


            return new Date(date)
                .toLocaleString();
        };


    // ==================================
    // RENDER
    // ==================================

    return (

        <div
            style={{

                background: "#ffffff",

                borderRadius: "12px",

                padding: "24px",

                marginTop: "24px",

                boxShadow:
                    "0 2px 8px rgba(0,0,0,0.08)"

            }}
        >

            {/* ============================
                HEADER
            ============================ */}

            <div
                style={{

                    display: "flex",

                    justifyContent:
                        "space-between",

                    alignItems: "center",

                    marginBottom: "20px"

                }}
            >

                <div>

                    <h2
                        style={{
                            margin: 0,
                            fontSize: "22px"
                        }}
                    >
                        Lock Analysis
                    </h2>


                    <p
                        style={{

                            marginTop: "6px",

                            color: "#666"

                        }}
                    >
                        Lock and unlock activity
                    </p>

                </div>


                {/* PERIOD */}

                <select
                    value={period}
                    onChange={(e) =>
                        setPeriod(
                            e.target.value
                        )
                    }
                    style={{

                        padding:
                            "8px 12px",

                        borderRadius: "6px",

                        border:
                            "1px solid #ccc",

                        cursor: "pointer"

                    }}
                >

                    <option value="day">
                        Today
                    </option>

                    <option value="month">
                        This Month
                    </option>

                    <option value="year">
                        This Year
                    </option>

                </select>

            </div>


            {/* ============================
                LOADING
            ============================ */}

            {loading && (

                <p>
                    Loading lock analytics...
                </p>

            )}


            {/* ============================
                ERROR
            ============================ */}

            {error && (

                <p
                    style={{
                        color: "red"
                    }}
                >
                    {error}
                </p>

            )}


            {!loading &&
                !error &&
                analytics && (

                    <>

                        {/* ====================
                            SUMMARY CARDS
                        ==================== */}

                        <div
                            style={{

                                display: "grid",

                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(180px, 1fr))",

                                gap: "16px",

                                marginBottom: "32px"

                            }}
                        >

                            {/* LOCK EVENTS */}

                            <div
                                style={{

                                    background:
                                        "#f5f7fa",

                                    padding: "20px",

                                    borderRadius:
                                        "10px"

                                }}
                            >

                                <div
                                    style={{
                                        color: "#666",
                                        fontSize: "14px"
                                    }}
                                >
                                    Lock Events
                                </div>


                                <div
                                    style={{

                                        fontSize: "28px",

                                        fontWeight:
                                            "bold",

                                        marginTop: "8px"

                                    }}
                                >
                                    {
                                        analytics.lockCount ??
                                        0
                                    }
                                </div>

                            </div>


                            {/* TOTAL LOCK TIME */}

                            <div
                                style={{

                                    background:
                                        "#f5f7fa",

                                    padding: "20px",

                                    borderRadius:
                                        "10px"

                                }}
                            >

                                <div
                                    style={{
                                        color: "#666",
                                        fontSize: "14px"
                                    }}
                                >
                                    Total Lock Time
                                </div>


                                <div
                                    style={{

                                        fontSize: "28px",

                                        fontWeight:
                                            "bold",

                                        marginTop: "8px"

                                    }}
                                >
                                    {formatDuration(
                                        analytics.totalSeconds
                                    )}
                                </div>

                            </div>


                            {/* TOTAL HOURS */}

                            <div
                                style={{

                                    background:
                                        "#f5f7fa",

                                    padding: "20px",

                                    borderRadius:
                                        "10px"

                                }}
                            >

                                <div
                                    style={{
                                        color: "#666",
                                        fontSize: "14px"
                                    }}
                                >
                                    Total Hours
                                </div>


                                <div
                                    style={{

                                        fontSize: "28px",

                                        fontWeight:
                                            "bold",

                                        marginTop: "8px"

                                    }}
                                >
                                    {
                                        analytics.totalHours ??
                                        0
                                    }
                                    h
                                </div>

                            </div>

                        </div>


                        {/* ====================
                            HISTORY
                        ==================== */}

                        <div>

                            <h3
                                style={{

                                    marginBottom:
                                        "16px"

                                }}
                            >
                                Recent Lock / Unlock Events
                            </h3>


                            {history.length === 0 ? (

                                <p
                                    style={{
                                        color: "#666"
                                    }}
                                >
                                    No lock events found.
                                </p>

                            ) : (

                                <div
                                    style={{
                                        overflowX:
                                            "auto"
                                    }}
                                >

                                    <table
                                        style={{

                                            width: "100%",

                                            borderCollapse:
                                                "collapse"

                                        }}
                                    >

                                        <thead>

                                            <tr>

                                                <th
                                                    style={{
                                                        textAlign:
                                                            "left",
                                                        padding:
                                                            "12px",
                                                        borderBottom:
                                                            "1px solid #ddd"
                                                    }}
                                                >
                                                    #
                                                </th>


                                                <th
                                                    style={{
                                                        textAlign:
                                                            "left",
                                                        padding:
                                                            "12px",
                                                        borderBottom:
                                                            "1px solid #ddd"
                                                    }}
                                                >
                                                    Locked At
                                                </th>


                                                <th
                                                    style={{
                                                        textAlign:
                                                            "left",
                                                        padding:
                                                            "12px",
                                                        borderBottom:
                                                            "1px solid #ddd"
                                                    }}
                                                >
                                                    Unlocked At
                                                </th>


                                                <th
                                                    style={{
                                                        textAlign:
                                                            "left",
                                                        padding:
                                                            "12px",
                                                        borderBottom:
                                                            "1px solid #ddd"
                                                    }}
                                                >
                                                    Duration
                                                </th>


                                                <th
                                                    style={{
                                                        textAlign:
                                                            "left",
                                                        padding:
                                                            "12px",
                                                        borderBottom:
                                                            "1px solid #ddd"
                                                    }}
                                                >
                                                    Status
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {history.map(
                                                (
                                                    event,
                                                    index
                                                ) => (

                                                    <tr
                                                        key={
                                                            event.id ||
                                                            index
                                                        }
                                                    >

                                                        <td
                                                            style={{
                                                                padding:
                                                                    "12px",
                                                                borderBottom:
                                                                    "1px solid #eee"
                                                            }}
                                                        >
                                                            {index + 1}
                                                        </td>


                                                        <td
                                                            style={{
                                                                padding:
                                                                    "12px",
                                                                borderBottom:
                                                                    "1px solid #eee"
                                                            }}
                                                        >
                                                            {
                                                                formatDateTime(
                                                                    event.lockedAt
                                                                )
                                                            }
                                                        </td>


                                                        <td
                                                            style={{
                                                                padding:
                                                                    "12px",
                                                                borderBottom:
                                                                    "1px solid #eee"
                                                            }}
                                                        >
                                                            {event.unlockedAt
                                                                ? formatDateTime(
                                                                    event.unlockedAt
                                                                )
                                                                : (
                                                                    <span
                                                                        style={{
                                                                            color:
                                                                                "#d97706",
                                                                            fontWeight:
                                                                                "bold"
                                                                        }}
                                                                    >
                                                                        Currently Locked
                                                                    </span>
                                                                )}
                                                        </td>


                                                        <td
                                                            style={{
                                                                padding:
                                                                    "12px",
                                                                borderBottom:
                                                                    "1px solid #eee",
                                                                fontWeight:
                                                                    "500"
                                                            }}
                                                        >
                                                            {
                                                                formatDuration(
                                                                    event.durationSeconds
                                                                )
                                                            }
                                                        </td>


                                                        <td
                                                            style={{
                                                                padding:
                                                                    "12px",
                                                                borderBottom:
                                                                    "1px solid #eee"
                                                            }}
                                                        >

                                                            <span
                                                                style={{

                                                                    padding:
                                                                        "4px 8px",

                                                                    borderRadius:
                                                                        "12px",

                                                                    fontSize:
                                                                        "12px",

                                                                    background:
                                                                        event.status ===
                                                                        "active"
                                                                            ? "#fff3cd"
                                                                            : "#e8f5e9"

                                                                }}
                                                            >

                                                                {
                                                                    event.status ===
                                                                    "active"
                                                                        ? "Active"
                                                                        : "Closed"
                                                                }

                                                            </span>

                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </div>

                    </>

                )}

        </div>

    );
};


export default UsageAnalytics;