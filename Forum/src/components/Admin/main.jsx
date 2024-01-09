import { useEffect } from "react"


export const AdminMain = ({userUpdate}) =>{

    useEffect(()=>{
        userUpdate()
    },[])

    return(
        <div>
            <div>Main Admin Site</div>
        </div>

    )
}