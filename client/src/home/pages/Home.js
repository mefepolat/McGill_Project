


import CheckOutButton from "../components/CheckOutButton";


import SelectStation from "../components/SelectStation";
import {AuthContext } from "../../shared/components/AuthContext";
import { useContext } from "react";




const HomePage = () => {
    const {user} = useContext(AuthContext);
    console.log(user);
    return (
        
        <div className="home_section">
            <h1>HomePage</h1>
            
            
            <SelectStation />
            <CheckOutButton/>

          
            
        </div>
        
    )
};

export default HomePage;