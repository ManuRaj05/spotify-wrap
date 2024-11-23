import { Clock } from 'lucide-react'

interface TotalListenTimeProps {
  hours: number
}

export default function TotalListenTime({ hours }: TotalListenTimeProps) {
  const days = Math.floor(hours / 24)
  const remainingHours = Math.floor(hours % 24)

  return (
    <div className="bg-[#1E1E1E] p-8 rounded-2xl text-center shadow-xl">
      <h2 className="text-3xl font-bold mb-6 flex items-center justify-center">
        <Clock className="w-8 h-8 mr-2 text-[#1ED760]" />
        Total Listen Time
      </h2>
      <div className="flex justify-center items-center space-x-4">
        <div>
          <p className="text-6xl font-bold text-white">{days}</p>
          <p className="text-xl text-gray-400">days</p>
        </div>
        <div className="text-4xl font-bold text-[#1ED760]">:</div>
        <div>
          <p className="text-6xl font-bold text-white">{remainingHours}</p>
          <p className="text-xl text-gray-400">hours</p>
        </div>
      </div>
    </div>
  )
}

