import { Loader } from 'lucide-react'
import React from 'react'

const PageLoader: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <Loader className="animate-spin h-16 w-16 text-[#4d7c0f]" />
        </div>
    )
}

export default PageLoader