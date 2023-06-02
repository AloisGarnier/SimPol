import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import ItemSeries from 'highcharts/modules/item-series';
ItemSeries(Highcharts)

export default function Eur(){

    const [parties, setParties] = useState([["", 0, "white", 0]]);
    const [display, setDisplay] = useState([]);
    const [result, setResult] = useState([]);

    const colors = [
        {
          label:"blanc",
          value: "white"
        },
        {
          label:"rouge",
          value: '#EE0011'
        },
        {
          label:"rose",
          value: '#CC0099'
        },
        {
          label:"orange",
          value: "orange"
        },
        {
          label:"jaune",
          value: '#FFCC00'
        },
        {
          label:"vert",
          value: '#448833'
        },
        {
          label:"turquoise",
          value: '#3399FF'
        },
        {
          label:"bleu",
          value: '#3366CC'
        },
        {
          label:"violet",
          value: "purple"
        },
        {
          label:"brun",
          value: "brown"
        },
        {
          label:"gris",
          value: "grey"
        },
        {
          label:"noir",
          value: "black"
        }
    ];

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
        calculateSeats();
        let newDisplay = [];

        for(let i=0; i<parties.length; i++) {
            newDisplay.push(
                <div class="form-group d-flex flex-row m-2">
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
                    <select value={parties[i][2]} onChange={(e) => changeColor(i, e)}>
                        {colors.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            );
        }

        newDisplay.push(
            <div class="form-group m-2">
                <button type="button" class="btn btn-primary btn-sm" onClick={() => addParty()}>Ajouter un parti</button>
            </div>
        );

        setDisplay(newDisplay);
        displayResult();
    }

    function addParty() {
        setParties(parties.push(["", 0, "white", 0]));
        displayParties();
    }

    function changeColor(partyNumber, e) {
        parties[partyNumber][2] = e.target.value;
        displayParties();
    }

    function calculateSeats() {
        let totalSeats = 79;
        let remainingSeats = 79;
        let tempScores = [];
        let tempCalc = [];
        for(let i=0; i<parties.length; i++) {
          if(parseInt(parties[i][1]) >= 5) {
            parties[i][3] = Math.trunc(parseInt(parties[i][1])*totalSeats/100);
            remainingSeats -= parties[i][3];
            tempScores.push(parties[i][1]);
            tempCalc.push(0);
          } else {
            parties[i][3] = 0
            tempScores.push(0);
            tempCalc.push(0);
          }
        }
        while(remainingSeats>0) {
          for(let i=0; i<parties.length; i++) {
            tempCalc[i] = tempScores[i]/(parties[i][3]+1);
          }
          let maxIndex = tempCalc.indexOf(Math.max(...tempCalc));
          parties[maxIndex][3] += 1;
          remainingSeats -= 1;
        }
    }

    function displayResult() {

      const options = {

        chart: {
          type: 'item',
          backgroundColor: 'transparent'
        },

        title: {
          text: 'Sièges français au Parlement européen'
        },
      
        legend: {
          labelFormat: '{label} <span style="opacity: 0.4">{y}</span>'
        },
      
        series: [{
          name: 'Députés européens',
          keys: ['label', 'score', 'color', 'y'],
          data: parties,
          dataLabels: {
            enabled: true,
            format: '{point.label}'
          },
      
          // Circular options
          center: ['50%', '88%'],
          size: '170%',
          startAngle: -100,
          endAngle: 100
        }]
      }

        setResult(
          <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
        );
    }

    return(
        <div class="d-flex justify-items-center">
            <div class="d-flex flex-column">
                {display}
            </div>
            <div class="d-flex flex-column myChart m-2">
                {result}
            </div>
        </div>
    );
}