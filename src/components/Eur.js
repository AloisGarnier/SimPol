import React, {useState} from "react";

export default function Eur(){

    const [parties, setParties] = useState([]);

    function changeParties(newValue, partyNumber, valueType) {
        let newParties = [];

        for(let i=0;i<partyNumber;i++) {
            newParties.push(parties[i]);
        }

        if(valueType=="name") {
            newParties.push([newValue, parties[partyNumber][1]]);
        } else {
            newParties.push([parties[partyNumber][0], newValue]);
        }

        for(let i=partyNumber+1; i<parties.length; i++) {
            newParties.push(parties[i]);
        }

        setParties(newParties);
    }

    function displayParties() {
        let display = [];

        for(let i=0; i<parties.length; i++) {
            display.push(
                <div class="form-group d-flex flex-row">
                    <input 
                        class="form-control me-sm-2" 
                        type="input" 
                        placeholder="Parti"
                        value={parties[i][0]}
                        onChange={form => changeParties(form.target.value, i, "name")}
                    ></input>
                    <input 
                        class="form-control me-sm-2" 
                        type="input" 
                        placeholder="Score"
                        value={parties[i][1]}
                        onChange={form => changeParties(form.target.value, i, "score")}
                    ></input>
                </div>
            );
        }

        return display;
    }

    return(
        <div>

        </div>
    );
}