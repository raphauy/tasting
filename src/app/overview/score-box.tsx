import { cn } from "@/lib/utils"

type Props = {
    score: number | undefined
    visible?: boolean
}

export default function ScoreBox({ score, visible }: Props) {

    if (!score) 
        return null

    // red: 88- 
    // yellow: 90 91 92
    // green: 93 94 95
    // green-200: 96+

    let color= "bg-red-100"
    let textColor= "text-red-100"
    if (score >= 90 && score <= 92) {
        color= "bg-yellow-100"
        textColor= "text-yellow-100"
    } else if (score >= 93 && score <= 95) {
        color= "bg-green-100"        
        textColor= "text-green-100"
    } else if (score >= 96) {
        color= "bg-green-200"
        textColor= "text-green-200"
    }

    return (
        <div className={cn("flex hover:text-muted-foreground justify-center items-center min-w-9 w-9 h-9 border rounded-full", !visible && "bg-white text-white", visible && color)}>
            <p className={cn("font-bold")}>{score}</p>
        </div>
    )
}
