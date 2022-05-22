import React, { createContext, useState } from 'react'


export const MintContext = createContext()

const MintContextProvider = ({ children }) => {
    const [mintAmount, setMintAmount] = useState(1)

    const incrementMintAmount = (maxMintAmount) => {
        if (mintAmount < maxMintAmount) {
            setMintAmount(mintAmount + 1)
        }
    }

    const decrementMintAmount = () => {
        if (mintAmount > 1) {
            setMintAmount(mintAmount - 1)
        }
    }
    return (
        <MintContext.Provider value={{mintAmount,decrementMintAmount,incrementMintAmount}}>
            {children}
        </MintContext.Provider>
    )
}

export default MintContextProvider