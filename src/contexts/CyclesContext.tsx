import { createContext, useState } from "react";


interface CreateCycleData {
    task: string,
    minutesAmount: number;
}

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    InterruptCurrentCycle: (data: NewCycleFormData) => void;
}

export const CyclesContext = createContext({} as CyclesContextType)



export function CycleContextProvider() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    function markCurrentCycleAsFinished() {
        setCycles(state => state.map((cycle) => {
            if(cycle.id === activeCycleId){
                return { ...cycle, finishedDate: new Date() };
            } else {
                return cycle;
            }
        }),
        )
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function createNewCycle(data: NewCycleFormData){
        const id = String(new Date(). getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        setCycles((state) => [...state, newCycle]);
        setActiveCycleId(id);
        setAmountSecondsPassed(0);
        reset();
    }

    function InterruptCurrentCycle() {
        setCycles((state) =>
            state.map((cycle) => {
            if(cycle.id === activeCycleId){
                return { ...cycle, interruptedDate: new Date() };
            } else {
                return cycle;
            }
        })
        )
        setActiveCycleId(null);
    }


    return (
    <CyclesContext.Provider 
        value={{
            activeCycle, 
            activeCycleId, 
            markCurrentCycleAsFinished, 
            amountSecondsPassed, 
            setSecondsPassed 
        }}>

        </CyclesContext.Provider>
    )
}