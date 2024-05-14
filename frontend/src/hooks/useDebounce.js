import { useEffect, useState } from "react";


export const useDebounce = (search) => {

    const [value, setValue] = useState("");

    useEffect(() => {

        var timer = setTimeout(() => {
            
            setValue(search);

        }, 300);

        return () => {

            clearTimeout(timer);

        }

    })

    return value;

}