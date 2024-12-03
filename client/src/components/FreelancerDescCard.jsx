import React from 'react'

const FreelancerDescCard = ({name,val, styles}) => {
  return (
    <div
    className={`flex flex-col justify-between rounded-3xl p-4 text-center shadow-md shadow-gray-300 transition-all hover:shadow-xl ${styles}`}
    >
        <p className="text-lg font-medium">{name}</p>
        <div className="flex flex-wrap gap-1 justify-center items-start">
            {val}
      </div>
    </div>
  )
}

export default FreelancerDescCard
