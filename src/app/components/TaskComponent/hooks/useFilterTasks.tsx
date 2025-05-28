/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/app/connection/supabaseClient";
import { useEffect, useState } from "react";
//import { FilterType } from "../Types/FilterType";

export default function useFilterTasks(filter: string,isCategory:boolean | null,category_id:number) {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);

        let table = "tasks";
         let data, error;
        if(isCategory == null && category_id ==0){

        
        if (filter === "Completed") table = "Completed";
        else if (filter === "Deleted") table = "Deleted";
           
        try {
          
            if (filter === "Today") {
                ({ data, error } = await supabase
                    .from("tasks")
                    .select("*")
                    .eq("date", new Date().toISOString().split("T")[0]));
            } else if (filter === "7Days") {
                const date = new Date();
        
                ({ data, error } = await supabase
                    .from("tasks")
                    .select("*").gte("date",new Date().toISOString().split("T")[0])
                    .lte("date", new Date(date.setDate(date.getDate()+7)).toISOString().split("T")[0]));
            } else {
                ({ data, error } = await supabase.from(table).select("*"));
            }

            
        } catch (err) {
            console.error("Unexpected error", err);
            setTasks([]);
        } finally {
            setLoading(false);
        }
        }
        else{
           
            ({ data, error } = await supabase
                    .from("tasks")
                    .select("*")
                    .eq("category_id", category_id));
        }
        if (error) {
                console.error("Supabase error", error.message);
                setTasks([]);
            } else {
                setTasks(data || []);
            }
    };

    useEffect(() => {
        console.log(tasks);
        fetchData();
    }, [filter,isCategory,category_id]);

    return {
        tasks,
        loading,
        refresh: fetchData  
    };
}