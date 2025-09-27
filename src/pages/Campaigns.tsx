import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Pause,
  Play,
  ArrowUpDown,
  Check,
  X,
  BarChart3,
  MessageSquare,
  Calendar,
  Target
} from 'lucide-react'
import { Card, CardContent, Button, Badge, Dropdown, DropdownContent, DropdownItem } from '@/components/ui'

interface Campaign {
  id: string
  name: string
  status: 'active' | 'paused'
  sent: number
  replied: number
  meetings: number
  responseRate: number
  createdAt: string
  updatedAt: string
  targetInvestors?: number
}

type SortField = 'name' | 'status' | 'sent' | 'replied' | 'meetings' | 'responseRate' | 'updatedAt'
type SortDirection = 'asc' | 'desc'

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Series A Outreach',
    status: 'active',
    sent: 125,
    replied: 23,
    meetings: 8,
    responseRate: 18.4,
    createdAt: '2024-01-15',
    updatedAt: '2024-02-01',
    targetInvestors: 200
  },
  {
    id: '4',
    name: 'European Expansion',
    status: 'paused',
    sent: 45,
    replied: 8,
    meetings: 3,
    responseRate: 17.8,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-28',
    targetInvestors: 75
  },
  {
    id: '5',
    name: 'Seed Round Follow-up',
    status: 'active',
    sent: 95,
    replied: 19,
    meetings: 6,
    responseRate: 20.0,
    createdAt: '2024-01-10',
    updatedAt: '2024-02-02',
    targetInvestors: 120
  }
]

export function Campaigns() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | Campaign['status']>('all')
  const [sortField, setSortField] = useState<SortField>('updatedAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([])

  const statusOptions = [
    { value: 'all', label: 'All Status', count: mockCampaigns.length },
    { value: 'active', label: 'Active', count: mockCampaigns.filter(c => c.status === 'active').length },
    { value: 'paused', label: 'Paused', count: mockCampaigns.filter(c => c.status === 'paused').length }
  ]

  const filteredAndSortedCampaigns = useMemo(() => {
    let filtered = mockCampaigns.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
      return matchesSearch && matchesStatus
    })

    filtered.sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]

      if (sortField === 'responseRate' && a.sent === 0) aValue = -1
      if (sortField === 'responseRate' && b.sent === 0) bValue = -1

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [searchQuery, statusFilter, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const handleSelectCampaign = (campaignId: string) => {
    setSelectedCampaigns(prev => 
      prev.includes(campaignId) 
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    )
  }

  const handleSelectAll = () => {
    if (selectedCampaigns.length === filteredAndSortedCampaigns.length) {
      setSelectedCampaigns([])
    } else {
      setSelectedCampaigns(filteredAndSortedCampaigns.map(c => c.id))
    }
  }

  const getStatusBadge = (status: Campaign['status']) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      paused: { color: 'bg-yellow-100 text-yellow-800', label: 'Paused' }
    }
    const config = statusConfig[status]
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getActionItems = (campaign: Campaign) => {
    const baseItems = [
      { 
        label: 'Edit Campaign', 
        icon: Edit, 
        action: () => {
          // Navigate to edit page
          window.location.href = `/app/campaigns/edit/${campaign.id}`
        },
        className: ''
      }
    ]

    if (campaign.status === 'active') {
      baseItems.push({ 
        label: 'Pause Campaign', 
        icon: Pause, 
        action: () => {
          if (confirm(`Pause campaign "${campaign.name}"?`)) {
            alert(`Campaign "${campaign.name}" has been paused`)
          }
        },
        className: ''
      })
    } else if (campaign.status === 'paused') {
      baseItems.push({ 
        label: 'Resume Campaign', 
        icon: Play, 
        action: () => {
          if (confirm(`Resume campaign "${campaign.name}"?`)) {
            alert(`Campaign "${campaign.name}" has been resumed`)
          }
        },
        className: ''
      })
    }


    return baseItems
  }

  const SortButton = ({ field, children }: { field: SortField, children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 text-left font-medium text-gray-700 hover:text-gray-900 transition-colors"
    >
      <span>{children}</span>
      <ArrowUpDown className="h-4 w-4" />
    </button>
  )

  const CampaignCard = ({ campaign }: { campaign: Campaign }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={selectedCampaigns.includes(campaign.id)}
            onChange={() => handleSelectCampaign(campaign.id)}
            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{campaign.name}</h3>
            {getStatusBadge(campaign.status)}
          </div>
        </div>
        <Dropdown
          trigger={
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical className="h-4 w-4 text-gray-500" />
            </button>
          }
        >
          <DropdownContent>
            {getActionItems(campaign).map((item, index) => (
              <DropdownItem
                key={index}
                onClick={item.action}
                icon={<item.icon className="h-4 w-4" />}
                className={item.className}
              >
                {item.label}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <BarChart3 className="h-4 w-4 text-gray-400" />
            <span className="text-2xl font-bold text-gray-900">{campaign.sent}</span>
          </div>
          <p className="text-xs text-gray-500">Sent</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <MessageSquare className="h-4 w-4 text-gray-400" />
            <span className="text-2xl font-bold text-gray-900">{campaign.replied}</span>
          </div>
          <p className="text-xs text-gray-500">Replied</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-2xl font-bold text-gray-900">{campaign.meetings}</span>
          </div>
          <p className="text-xs text-gray-500">Meetings</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Target className="h-4 w-4 text-gray-400" />
            <span className="text-2xl font-bold text-gray-900">
              {campaign.responseRate > 0 ? `${campaign.responseRate}%` : '-'}
            </span>
          </div>
          <p className="text-xs text-gray-500">Response Rate</p>
        </div>
      </div>

      {campaign.status === 'active' && campaign.targetInvestors && (
        <div className="mb-3">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{campaign.sent}/{campaign.targetInvestors}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((campaign.sent / campaign.targetInvestors) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>Updated {new Date(campaign.updatedAt).toLocaleDateString()}</span>
        <div className="flex space-x-2">
          <button className="text-primary-600 hover:text-primary-700">View</button>
          <button className="text-primary-600 hover:text-primary-700">Edit</button>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-xl text-gray-600 mt-2">Manage your investor outreach campaigns</p>
        </div>
        <Link to="/app/campaigns/new">
          <Button size="lg" leftIcon={<Plus className="h-5 w-5" />}>
            New Campaign
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.count})
                  </option>
                ))}
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedCampaigns.length > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-primary-600" />
                <span className="font-medium text-primary-900">
                  {selectedCampaigns.length} campaign{selectedCampaigns.length > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    if (confirm(`Pause ${selectedCampaigns.length} selected campaign(s)?`)) {
                      alert(`Paused ${selectedCampaigns.length} campaign(s)`)
                      setSelectedCampaigns([])
                    }
                  }}
                >
                  Pause All
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    alert(`Exporting data for ${selectedCampaigns.length} selected campaign(s)`)
                    setSelectedCampaigns([])
                  }}
                >
                  Export
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedCampaigns([])}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
        </div>
      )}

      {/* Campaigns Table/Cards */}
      <Card>
        <CardContent className="p-0">
          {filteredAndSortedCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Target className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Create your first campaign to start reaching out to investors'
                }
              </p>
              <Button leftIcon={<Plus className="h-5 w-5" />}>
                Create First Campaign
              </Button>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={selectedCampaigns.length === filteredAndSortedCampaigns.length && filteredAndSortedCampaigns.length > 0}
                            onChange={handleSelectAll}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                        </th>
                        <th className="px-6 py-3 text-left">
                          <SortButton field="name">Campaign Name</SortButton>
                        </th>
                        <th className="px-6 py-3 text-left">
                          <SortButton field="status">Status</SortButton>
                        </th>
                        <th className="px-6 py-3 text-left">
                          <SortButton field="sent">Sent</SortButton>
                        </th>
                        <th className="px-6 py-3 text-left">
                          <SortButton field="replied">Replied</SortButton>
                        </th>
                        <th className="px-6 py-3 text-left">
                          <SortButton field="meetings">Meetings</SortButton>
                        </th>
                        <th className="px-6 py-3 text-left">
                          <SortButton field="responseRate">Response Rate</SortButton>
                        </th>
                        <th className="px-6 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredAndSortedCampaigns.map((campaign, index) => (
                        <motion.tr
                          key={campaign.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedCampaigns.includes(campaign.id)}
                              onChange={() => handleSelectCampaign(campaign.id)}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{campaign.name}</div>
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(campaign.status)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{campaign.sent}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{campaign.replied}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{campaign.meetings}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {campaign.responseRate > 0 ? `${campaign.responseRate}%` : '-'}
                          </td>
                          <td className="px-6 py-4">
                            <Dropdown
                              trigger={
                                <button className="p-1 hover:bg-gray-100 rounded">
                                  <MoreVertical className="h-4 w-4 text-gray-500" />
                                </button>
                              }
                            >
                              <DropdownContent>
                                {getActionItems(campaign).map((item, index) => (
                                  <DropdownItem
                                    key={index}
                                    onClick={item.action}
                                    icon={<item.icon className="h-4 w-4" />}
                                    className={item.className}
                                  >
                                    {item.label}
                                  </DropdownItem>
                                ))}
                              </DropdownContent>
                            </Dropdown>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden">
                <div className="p-4 space-y-4">
                  {filteredAndSortedCampaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
