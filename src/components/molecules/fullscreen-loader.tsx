import { LoaderIcon } from "lucide-react";

interface FullscreenLoaderProps{
    label?: string;
    className?: string;
}

export const FullscreenLoader = ({label, className}: FullscreenLoaderProps) => {
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <LoaderIcon className="size-6 text-muted-foreground animate-spin"/>
            {
                label && <p className="text-muted-foreground">{label}</p>
            }
        </div>
    )
};