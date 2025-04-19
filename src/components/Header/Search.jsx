import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";

function Search() {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    // Clear search when location changes (like when going back)
    useEffect(() => {
        reset({ query: "" });
    }, [location.pathname, reset]);

    const search = (data) => {
        const query = data?.query;
        navigate(`/search/${query}`);
    };

    return (
        <form onSubmit={handleSubmit(search)} className="relative w-full max-w-2xl mx-4">
            <div className="relative">
                <input
                    {...register("query")}
                    type="text"
                    placeholder="Search videos..."
                    className="pl-10 pr-4 py-2 w-full bg-[#252525] border border-[#3d3d3d] rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
        </form>
    );
}

export default Search;