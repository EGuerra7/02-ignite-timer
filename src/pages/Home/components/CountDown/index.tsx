import { useEffect, useState } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";

interface CountdownProps {
    activeCycle: any;
    setCycles: any;
    activeCycleId:any;
}   

export function CountDown({ activeCycle, setCycles, activeCycleId }: CountdownProps) {
    
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

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
                    setCycles(state => state.map((cycle) => {
                        if(cycle.id === activeCycleId){
                            return { ...cycle, finishedDate: new Date() };
                        } else {
                            return cycle;
                        }
                        })
                    )
                    setAmountSecondsPassed(totalSeconds);
                    setActiveCycleId(null);
                } else{
                    setAmountSecondsPassed(secondsDifference);
                }                
            }, 1000)
        }
        return () => {
            clearInterval(interval);
        }
    }, [activeCycle, totalSeconds, activeCycleId]);
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