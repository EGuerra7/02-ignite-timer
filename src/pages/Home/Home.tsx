import { HandPalm, Play } from "phosphor-react";
import { differenceInSeconds } from 'date-fns';
import { 
    HomeContainer,
    StartCountdownButton, 
    StopCountdownButton, 
} from "./styles";
import { useEffect, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";




interface Cycle {
    id: string,
    task: string,
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

export function Home(){

    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    function handleCreateNewCycle(data: NewCycleFormData){
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

    function handleInterruptCycle() {
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
    
    useEffect(() => {
        if(activeCycle){
            document.title = `Ignite Timer  ${minutes}:${seconds}`;
        }
    }, [minutes, seconds])

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <NewCycleForm />

                <CountDown />
                { activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
                        <HandPalm size={24}/>
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled}  type="submit">
                        <Play size={24}/>
                        Começar
                    </StartCountdownButton>
                ) }
            </form>
        </HomeContainer>
    )
}