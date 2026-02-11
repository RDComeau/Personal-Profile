import {useEffect, useRef, useState} from "react"

type Phase = "typing" | "paused" | "deleting"

export const useTypingEffect = (
    words: string[],
    typingSpeed = 100,
    deletingSpeed = 75,
    pauseTime = 2000
) => {
    const [displayText, setDisplayText] = useState("")
    const [wordIndex, setWordIndex] = useState(0)
    const [phase, setPhase] = useState<Phase>("typing")
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

    useEffect(() => {
        const currentWord = words[wordIndex]

        if (phase === "typing") {
            if (displayText.length < currentWord.length) {
                timeoutRef.current = setTimeout(() => {
                    setDisplayText(currentWord.substring(0, displayText.length + 1))
                }, typingSpeed)
            } else {
                setPhase("paused")
            }
        } else if (phase === "paused") {
            timeoutRef.current = setTimeout(() => {
                setPhase("deleting")
            }, pauseTime)
        } else if (phase === "deleting") {
            if (displayText.length > 0) {
                timeoutRef.current = setTimeout(() => {
                    setDisplayText(currentWord.substring(0, displayText.length - 1))
                }, deletingSpeed)
            } else {
                setWordIndex((prev) => (prev + 1) % words.length)
                setPhase("typing")
            }
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [displayText, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseTime])

    return {displayText, isIdle: phase === "paused"}
}
