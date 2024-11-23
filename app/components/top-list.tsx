'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Clock, Play } from 'lucide-react'

interface TopListProps {
  title: string
  items: { name: string; value: string }[]
  icon: 'clock' | 'play'
}

export default function TopList({ title, items, icon }: TopListProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const displayedItems = isExpanded ? items : items.slice(0, 5)

  const IconComponent = icon === 'clock' ? Clock : Play

  return (
    <div className="bg-[#1E1E1E] p-6 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <IconComponent className="w-6 h-6 mr-2 text-[#1ED760]" />
        {title}
      </h2>
      <ul className="space-y-4">
        {displayedItems.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className="font-semibold text-lg">{item.name}</span>
            <span className="text-[#1ED760] font-medium">{item.value}</span>
          </li>
        ))}
      </ul>
      {items.length > 5 && (
        <button
          className="mt-6 text-[#1ED760] hover:text-[#1ED760] flex items-center transition-colors duration-300"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="ml-1" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="ml-1" />
            </>
          )}
        </button>
      )}
    </div>
  )
}

