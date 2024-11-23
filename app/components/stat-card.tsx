import { Compass, Users, List, Heart } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number
  icon: 'compass' | 'users' | 'list' | 'heart'
}

const iconMap = {
  compass: Compass,
  users: Users,
  list: List,
  heart: Heart,
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  const IconComponent = iconMap[icon]

  return (
    <div className="bg-[#282828] p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center">
      <IconComponent className="w-12 h-12 text-[#1DB954] mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-4xl font-bold text-[#1DB954]">{value}</p>
    </div>
  )
}

