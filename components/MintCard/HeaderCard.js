import React from 'react'

export const HeaderCard = ({isPaused, isPreSale, account}) => {
    return (
        <div>
            <div className='flex justify-center'>
                <h3 className="font-coiny text-2xl text-brand-pink uppercase mt-6">
                    {isPaused ? 'Paused' : isPreSale ? 'Pre-Sale' : 'Public Sale'}
                </h3>
            </div>
            <div className='flex justify-center'>
                <h3 className="font-coiny text-2xl text-brand-pink uppercase mt-6">
                    Account
                </h3>
            </div>
            <span className='text-gray-400'>
                {
                    account.slice(0, 8) +
                    '...' +
                    account.slice(-4)
                }
            </span>
        </div>
    )
}

