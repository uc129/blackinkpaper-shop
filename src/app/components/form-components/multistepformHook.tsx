'use client'

import { ReactElement, useState } from "react"





export const useMultiStepForm = (steps: ReactElement[]) => {



    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)

    function nextStep() {
        setCurrentStepIndex((currentStepIndex + 1) % steps.length)
    }

    function previousStep() {
        setCurrentStepIndex((currentStepIndex - 1) % steps.length)
    }

    function goToStep(index: number) {
        setCurrentStepIndex(index)
    }

    function isLastStep() {
        return currentStepIndex === steps.length - 1
    }

    function isFirstStep() {
        return currentStepIndex === 0
    }

    function isStep(index: number) {
        return currentStepIndex === index
    }

    function getStepContent() {
        return steps[currentStepIndex]
    }







    return (
        {
            nextStep,
            previousStep,
            step: steps[currentStepIndex],
            goToStep,
            isLastStep,
            isFirstStep,
            isStep,
            getStepContent
        }
    )

}

