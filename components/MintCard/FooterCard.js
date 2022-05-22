import React from 'react'

export const FooterCard = () => {
    return (
        <div className="border-t border-gray-800 flex flex-col items-center mt-10 py-2 w-full">
            <h3 className="font-coiny text-2xl text-brand-pink uppercase mt-6">
                Contract Address
            </h3>
            <a
                href='https://rinkeby.etherscan.io/address/0xA86eF127D4d9083E55f89b0CD4a18586C7d4aee3'
                target="_blank"
                rel="noreferrer" 
                className="text-gray-400 mt-4"
            >
                <span className="break-all ...">0xA86eF127D4d9083E55f89b0CD4a18586C7d4aee3</span>
            </a>
        </div>
    )
}
