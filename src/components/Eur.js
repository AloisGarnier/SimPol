import React, {useState, useEffect} from "react";

export default function Eur(){

    const [parties, setParties] = useState([["", 0]]);
    const [display, setDisplay] = useState([]);

    useEffect(() => displayParties(), []);

    function changeParties(newValue, partyNumber, valueType) {

        if(valueType=="name") {
            parties[partyNumber] = [newValue, parties[partyNumber][1]];
        } else {
            parties[partyNumber] = [parties[partyNumber][0], newValue];
        }
        
        displayParties();
    }

    function displayParties(){
        console.log(parties);
        let newDisplay = [];

        for(let i=0; i<parties.length; i++) {
            newDisplay.push(
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

        newDisplay.push(
            <button type="button" class="btn btn-primary btn-sm" onClick={() => addParty()}>Ajouter un parti</button>
        );

        setDisplay(newDisplay);
    }

    function addParty() {
        setParties(parties.push(["", 0]));
        displayParties();
    }

    return(
        <div>
            {display}
        </div>
    );
}