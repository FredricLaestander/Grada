import { Tab } from './tab'

export const Tabs = ({
  onTabClick,
  activeTab,
}: {
  onTabClick: (tab: 'overview' | 'edit') => void
  activeTab: 'overview' | 'edit'
}) => {
  return (
    <div className="flex overflow-hidden rounded-2xl">
      <Tab
        active={activeTab === 'overview' ? true : false}
        onClick={() => {
          onTabClick('overview')
        }}
      >
        Overview
      </Tab>
      <Tab
        active={activeTab === 'edit' ? true : false}
        onClick={() => {
          onTabClick('edit')
        }}
      >
        Edit
      </Tab>
    </div>
  )
}
