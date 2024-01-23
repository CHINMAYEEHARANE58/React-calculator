import React, {useReducer} from 'react'


const initstate ={
    inputs: "",
    res: ""
}

let operator = ["+", "-", "*", "/"]

function resduser(state = initstate,{type, payload}){
    switch(type){
        case "ADDINP":{
            let addOps = true;

            if(operator.includes(payload) && operator.includes(state.inputs.slice(state.inputs.length-1, state.inputs.length))){
                addOps = false;
            }

            else{
                addOps = true;
            }

            if(addOps){
                return { ...state, inputs: state.inputs + payload}
            }

            return {...state}
        }
        
        case "CALCULATE":{
            const inpLen = state.inputs.length;

            if(!operator.includes(state.inputs.slice(inpLen-1, inpLen))){
                try{
                    const result = eval(state.inputs)
                    if(!Number.isFinite(result)){
                        throw new Error("Cannot divide by zero")
                    }

                    const newInp = {
                        ...state,
                        res: "",
                        inputs: result.toString()
                    }
                    return newInp;
                } 
                catch(error){
                    console.log(error)
                }
            }
            else{
                return{
                    ...state,
                    inputs: eval(state.inputs.slice(0, inpLen-1)).toString(),
                    res:""
                }

            }


            return 
        }
        case "CLEAR":{
            return {...state, inputs:"", res:""}
        }
        case "DELETE":{
            return {...state, inputs: state.inputs.slice(0, state.inputs.length-1)}
        }
        default: {
            return state;
        }
    }
}

const Calculator = () => {
    const [state, dispath] = useReducer(resduser, initstate)

    let handleClick = (val) => {
        dispath({type: "ADDINP", payload: val})
    }

    let handleClear = () => {
        dispath({type: "CLEAR"})
    }

    let handleCal = () => {
        dispath({type: "CALCULATE"})
    }
    
    let handleDel = () => {
        dispath({type: "DELETE"})
    }

    return(
        <div className='calculator'>
        <div className='display'>{state.inputs}</div>
        <div className='buttons'>
            <div>
                <button className='AC' onClick={handleClear}>AC</button>
                <button className="click" onClick={handleDel}>Del</button>
                <button className="click" onClick={() => handleClick("+")}>+</button>
            </div>
            <div>
                <button className="click" onClick={() => handleClick("1")}>1</button>
                <button className="click" onClick={() => handleClick("2")}>2</button>
                <button className="click" onClick={() => handleClick("3")}>3</button>
                <button className="click" onClick={() => handleClick("-")}>-</button>
            </div>
            <div>
                <button className="click" onClick={() => handleClick("4")}>4</button>
                <button className="click" onClick={() => handleClick("5")}>5</button>
                <button className="click" onClick={() => handleClick("6")}>6</button>
                <button className="click" onClick={() => handleClick("*")}>*</button>
            </div>
            <div>
                <button className="click" onClick={() => handleClick("7")}>7</button>
                <button className="click" onClick={() => handleClick("8")}>8</button>
                <button className="click" onClick={() => handleClick("9")}>9</button>
                <button className="click" onClick={() => handleClick("/")}>/</button>
            </div>
            <div>
                <button className="click" onClick={() => handleClick(".")}>.</button>
                <button className="click" onClick={() => handleClick("0")}>0</button>
                <button className='equal' onClick={handleCal}>=</button>
            </div>


        </div>

    </div>
  )
}

export default Calculator