import { supabase } from "@/app/connection/supabaseClient";
import { useEffect, useState } from "react";



interface TaskCategoryImageProps{
               
                id:number
}
export default function TaskCategoryImage({id}:TaskCategoryImageProps){
           const [imageUrl,setImageUrl] = useState<string | null>(null);
            useEffect(()=>{
                async function  getImage(){
                const {data,error} = await supabase.from("Categories").select("image").eq('id',id).single();

                if(!error && data){
                    setImageUrl(data.image)
                }
                else{
                    console.error("Greska pri dohvatanhy slike kategorije",error);
                }
                
            }
            getImage();
            },[id])
           
    return(
      
        <>
   
        { imageUrl ? <img  src={"../img/"+imageUrl+".png"} height={20} width={20}></img> : <></>}
        </>
    )

}