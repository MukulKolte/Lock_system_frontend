import axios from "axios";

const API_URL =
    "http://localhost:5000/api";


const getAuthHeaders = () => {

    const token =
        localStorage.getItem("token");


    return {

        headers: {

            Authorization:
                `Bearer ${token}`

        }

    };
};


// ======================================
// LOCK USAGE
// ======================================

export const getLockUsage =
    async (period = "day") => {

        const response =
            await axios.get(

                `${API_URL}/analytics/lock-usage`,

                {
                    params: {
                        period
                    },

                    ...getAuthHeaders()
                }
            );


        return response.data;
    };


// ======================================
// LOCK HISTORY
// ======================================

export const getLockHistory =
    async (limit = 10) => {

        const response =
            await axios.get(

                `${API_URL}/analytics/lock-history`,

                {
                    params: {
                        limit
                    },

                    ...getAuthHeaders()
                }
            );


        return response.data;
    };