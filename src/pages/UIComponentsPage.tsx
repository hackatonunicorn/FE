import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  User, 
  Settings, 
  Download,
  Plus,
  ChevronDown,
  Mail,
  Calendar,
  Info
} from 'lucide-react'
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  Badge,
  StatusBadge,
  Avatar,
  AvatarGroup,
  Dropdown,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
  DropdownContent,
} from '@/components/ui'

export function UIComponentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState('')

  const handleInputChange = (value: string) => {
    setInputValue(value)
    if (value.length > 0 && value.length < 3) {
      setInputError('Must be at least 3 characters')
    } else {
      setInputError('')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12"
      >
        <h1 className="text-4xl font-bold gradient-text mb-4">
          UI Components
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Professional UI component library with modern design and full accessibility
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Button Variants */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Variants</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>

              {/* Button Sizes */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Sizes</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              {/* Button with Icons */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">With Icons</h4>
                <div className="flex flex-wrap gap-3">
                  <Button leftIcon={<Plus className="h-4 w-4" />}>Add Item</Button>
                  <Button rightIcon={<Download className="h-4 w-4" />}>Download</Button>
                  <Button isLoading>Loading...</Button>
                </div>
              </div>

              {/* Full Width Button */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Full Width</h4>
                <Button fullWidth>Full Width Button</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Inputs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Input */}
              <Input
                label="Email Address"
                placeholder="Enter your email"
                type="email"
                helperText="We'll never share your email"
              />

              {/* Input with Error */}
              <Input
                label="Username"
                placeholder="Enter username"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                error={inputError}
              />

              {/* Input with Left Icon */}
              <Input
                label="Search"
                placeholder="Search..."
                leftIcon={<Search className="h-4 w-4" />}
              />

              {/* Input with Right Icon */}
              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                rightIcon={<User className="h-4 w-4" />}
              />

              {/* Input Variants */}
              <div className="space-y-4">
                <Input
                  label="Default Input"
                  placeholder="Default style"
                  variant="default"
                />
                <Input
                  label="Filled Input"
                  placeholder="Filled style"
                  variant="filled"
                />
                <Input
                  label="Underline Input"
                  placeholder="Underline style"
                  variant="underline"
                />
              </div>

              {/* Input Sizes */}
              <div className="space-y-4">
                <Input
                  label="Small Input"
                  placeholder="Small size"
                  size="sm"
                />
                <Input
                  label="Medium Input"
                  placeholder="Medium size"
                  size="md"
                />
                <Input
                  label="Large Input"
                  placeholder="Large size"
                  size="lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="default" hover>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">This is a default card with hover effect.</p>
                </CardContent>
              </Card>

              <Card variant="elevated" interactive>
                <CardHeader>
                  <CardTitle>Elevated Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">This is an elevated interactive card.</p>
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <CardTitle>Glass Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">This is a glassmorphism card.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Badge Variants */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Variants</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>

              {/* Badge Sizes */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Sizes</h4>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge size="sm">Small</Badge>
                  <Badge size="md">Medium</Badge>
                  <Badge size="lg">Large</Badge>
                </div>
              </div>

              {/* Status Badges */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Status Badges</h4>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status="online" />
                  <StatusBadge status="offline" />
                  <StatusBadge status="away" />
                  <StatusBadge status="busy" />
                  <StatusBadge status="pending" />
                  <StatusBadge status="approved" />
                  <StatusBadge status="rejected" />
                </div>
              </div>

              {/* Badge with Dot */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">With Dots</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success" dot>Online</Badge>
                  <Badge variant="warning" dot>Away</Badge>
                  <Badge variant="error" dot>Busy</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Avatars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Avatars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Avatar Sizes */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Sizes</h4>
                <div className="flex flex-wrap items-center gap-4">
                  <Avatar size="xs" alt="John Doe" />
                  <Avatar size="sm" alt="Jane Smith" />
                  <Avatar size="md" alt="Bob Johnson" />
                  <Avatar size="lg" alt="Alice Brown" />
                  <Avatar size="xl" alt="Charlie Wilson" />
                </div>
              </div>

              {/* Avatar with Status */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">With Status</h4>
                <div className="flex flex-wrap items-center gap-4">
                  <Avatar alt="Online User" status="online" />
                  <Avatar alt="Away User" status="away" />
                  <Avatar alt="Busy User" status="busy" />
                  <Avatar alt="Offline User" status="offline" />
                </div>
              </div>

              {/* Avatar Group */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Avatar Groups</h4>
                <div className="flex flex-col gap-4">
                  <AvatarGroup max={3}>
                    <Avatar alt="User 1" />
                    <Avatar alt="User 2" />
                    <Avatar alt="User 3" />
                    <Avatar alt="User 4" />
                    <Avatar alt="User 5" />
                  </AvatarGroup>
                  
                  <AvatarGroup max={4} size="lg">
                    <Avatar alt="User 1" />
                    <Avatar alt="User 2" />
                    <Avatar alt="User 3" />
                    <Avatar alt="User 4" />
                    <Avatar alt="User 5" />
                    <Avatar alt="User 6" />
                  </AvatarGroup>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Modal</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Dropdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Dropdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Dropdown
                trigger={
                  <Button variant="outline" rightIcon={<ChevronDown className="h-4 w-4" />}>
                    Actions
                  </Button>
                }
              >
                <DropdownContent>
                  <DropdownItem icon={<User className="h-4 w-4" />}>Profile</DropdownItem>
                  <DropdownItem icon={<Settings className="h-4 w-4" />}>Settings</DropdownItem>
                  <DropdownSeparator />
                  <DropdownItem icon={<Download className="h-4 w-4" />} shortcut="⌘D">
                    Download
                  </DropdownItem>
                </DropdownContent>
              </Dropdown>

              <Dropdown
                trigger={
                  <Button variant="secondary" rightIcon={<ChevronDown className="h-4 w-4" />}>
                    Menu
                  </Button>
                }
                placement="bottom-end"
              >
                <DropdownContent>
                  <DropdownLabel>Account</DropdownLabel>
                  <DropdownItem icon={<User className="h-4 w-4" />}>Profile</DropdownItem>
                  <DropdownItem icon={<Mail className="h-4 w-4" />}>Messages</DropdownItem>
                  <DropdownSeparator />
                  <DropdownLabel>Settings</DropdownLabel>
                  <DropdownItem icon={<Settings className="h-4 w-4" />}>Preferences</DropdownItem>
                  <DropdownItem icon={<Calendar className="h-4 w-4" />}>Calendar</DropdownItem>
                </DropdownContent>
              </Dropdown>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="md"
      >
        <ModalHeader>
          <ModalTitle>Confirm Action</ModalTitle>
          <ModalDescription>
            Are you sure you want to proceed with this action? This cannot be undone.
          </ModalDescription>
        </ModalHeader>
        <ModalContent>
          <div className="space-y-4">
            <p className="text-gray-600">
              This is a modal dialog with backdrop blur and smooth animations. 
              It demonstrates the modal component with proper accessibility features.
            </p>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Info className="h-5 w-5 text-primary-600" />
              <span className="text-sm text-gray-700">
                Modal includes keyboard navigation and focus management.
              </span>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
