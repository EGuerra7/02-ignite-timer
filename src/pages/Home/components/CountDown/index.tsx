import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../Home";

export function CountDown() {
    
    const { activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed } = useContext(CyclesContext);
    
    const totalSeconds =activeCycle ? activeCycle.minutesAmount * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutosAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutosAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    
    useEffect(() => {
        let interval: number;

        if(activeCycle){
            interval = setInterval(() => {
                    const secondsDifference = differenceInSeconds
                    (new Date(), 
                    activeCycle.startDate
                );

                if(secondsDifference >= totalSeconds){
                    markCurrentCycleAsFinished();
                    setSecondsPassed(totalSeconds);
                } else{
                    setSecondsPassed(secondsDifference);
                }                
            }, 1000)
        }
        return () => {
            clearInterval(interval);
        }
    }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished, setSecondsPassed]);

    useEffect(() => {
        if(activeCycle){
            document.title = `Ignite Timer  ${minutes}:${seconds}`;
        }
    }, [minutes, seconds])


    return (
        <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}