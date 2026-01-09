'use client'

import { orgProfile } from '../../../components/data/profile-data'
import OrgHeader from '../../../components/OrgHeader'
import SecurityScorecard from '../../../components/SecurityScorecard'
import AccountabilityLog from '../../../components/AccountabilityLog'

export default function Profile() {
  return (
    <div className='flex flex-col h-full w-full bg-slate-50 dark:bg-slate-950 font-[family-name:var(--font-sans)] overflow-hidden'>
      {/* Main Workspace */}
      <div className='flex-1 p-6 relative overflow-hidden overflow-y-auto no-scrollbar'>
        <div className='max-w-full mx-auto pb-10'>
          <OrgHeader profile={orgProfile} />
          <SecurityScorecard profile={orgProfile} />
          <AccountabilityLog logs={orgProfile.activityLog} />
        </div>
      </div>
    </div>
  )
}
