import axiosInstance from "@/helpers/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState= {
    loading: false,
    status: false,
    userData: null,
}

// API calls for Authentication

export const createAccount = createAsyncThunk("register", async (data) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("fullName", data.fullName);
    if (data.coverImage) {
        formData.append("coverImage", data.coverImage[0]);
    }

    try {
        const response = await axiosInstance.post("/users/register", formData);
        console.log(response.data);
        toast.success("Registered successfully!!!");
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});


export const userLogin = createAsyncThunk("login", async (data) => {
    try {
        const response = await axiosInstance.post("/users/login", data);
        return response.data.data.user;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const userLogout = createAsyncThunk("logout", async () => {
    try {
        const response = await axiosInstance.post("/users/logout");
        localStorage.removeItem("token");
        toast.success(response.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.error || "Logout failed");
        throw error;
    }
});

export const refreshAccessToken = createAsyncThunk(
    "refreshAccessToken",
    async (data) => {
        try {
            const response = await axiosInstance.post(
                "/users/refresh-token",
                data
            );
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const changePassword = createAsyncThunk(
    "changePassword",
    async (data) => {
        try {
            const response = await axiosInstance.post(
                "/users/change-password",
                data
            );
            toast.success(response.data?.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
    const response = await axiosInstance.get("/users/current-user");
    return response.data.data;
});

export const updateAvatar = createAsyncThunk("updateAvatar", async (avatar) => {
    try {
        // const formData = new FormData();
        // formData.append("avatar", avatar);
        const response = await axiosInstance.patch("/users/avatar", avatar);
        toast.success("Updated details successfully!!!");
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to update avatar");
        throw error;
    }
});

export const updateCoverImg = createAsyncThunk(
    "updateCoverImg",
    async (coverImage) => {
        try {
            const response = await axiosInstance.patch(
                "/users/cover-image",
                coverImage
            );
            toast.success(response.data?.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const updateUserDetails = createAsyncThunk(
    "updateUserDetails",
    async (data) => {
        try {
            console.log("Sending to API:", data);
            const response = await axiosInstance.patch(
                "/users/update-account",
                data
            );
            console.log("API response:", response.data);
            toast.success("Updated details successfully!!!");
            return response.data;
        } catch (error) {
            console.error("Full error:", error);
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

const authSlice= createSlice({
    name:'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAccount.pending, (state) => {
                state.loading = true;
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.userData = action.payload;
            })
            .addCase(createAccount.rejected, (state) => {
                state.loading = false;
            })
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.userData = action.payload;
            })
            .addCase(userLogin.rejected, (state) => {
                state.loading = false;
            })
            .addCase(userLogout.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.loading = false;
                state.status = false;
                state.userData = null;
            })
            .addCase(userLogout.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.userData = action.payload;
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.loading = false;
                state.status = false;
                state.userData = null;
            })
            .addCase(updateUserDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(updateUserDetails.rejected, (state) => {
                state.loading = false;
            });
    },
})

export default authSlice.reducer;