import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'

const data = [
  { month: 'Jan', revenue: 4000, funding: 2400 },
  { month: 'Feb', revenue: 3000, funding: 1398 },
  { month: 'Mar', revenue: 2000, funding: 9800 },
  { month: 'Apr', revenue: 2780, funding: 3908 },
  { month: 'May', revenue: 1890, funding: 4800 },
  { month: 'Jun', revenue: 2390, funding: 3800 },
  { month: 'Jul', revenue: 3490, funding: 4300 },
]

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue & Funding Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-secondary-200" />
            <XAxis 
              dataKey="month" 
              className="text-secondary-600 text-xs"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              className="text-secondary-600 text-xs"
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#0ea5e9" 
              strokeWidth={2}
              dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#0ea5e9', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="funding" 
              stroke="#d946ef" 
              strokeWidth={2}
              dot={{ fill: '#d946ef', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#d946ef', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
