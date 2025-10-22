
import {supabase} from "@/app/connection/Supabaseclient"
export default async function CalendarPage(){
    const {data,error} = await supabase.from("tasks").select('*');  //da bi resio problem prikazivanja treba kreirati policy sa sql komandom (true)

    if(error){
        console.error("Greska pri preuzimanju podataka:",error);
    }
    else{
        console.log("pera");
    }
    console.log(data);
        return(
            <div>
                <p>Calendar</p>
                <h1>Podaci iz baze:</h1>
                {data?.map((item)=>(
                    <div key={item.id}>{item.name}</div>
                ))}
                
            </div>
        )
}