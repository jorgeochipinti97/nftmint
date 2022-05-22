import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext } from 'react'
import { MintContext } from '../../context/MintContext';

export const MainCard = ({ totalMinted, maxSupply, isPreSale, maxMintAmount }) => {

    const { mintAmount, incrementMintAmount, decrementMintAmount } = useContext(MintContext)

    return (
        <div className="flex flex-col md:flex-row md:space-x-14 w-full mt-4 md:mt-14">
            <div className="relative w-full">
                <div className="font-coiny z-10 absolute top-2 left-2 opacity-80 filter backdrop-blur-lg text-base px-4 py-2 bg-black border border-brand-purple rounded-md flex items-center justify-center text-white font-semibold">
                    <p>
                        <span className="text-brand-pink">{totalMinted}</span> /{' '}
                        {maxSupply}
                    </p>
                </div>
                <img
                    src="template.png"
                    className="object-cover w-full sm:h-[280px] md:w-[250px] rounded-md"
                />
            </div>

            <div className="flex flex-col items-center w-full px-4 mt-16 md:mt-0">
                <div className="font-coiny flex items-center justify-between w-full">
                    <button
                        className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center text-brand-background hover:shadow-lg bg-gray-300 font-bold rounded-md"
                        onClick={() => decrementMintAmount(maxMintAmount)}>
                        <RemoveIcon />
                    </button>

                    <p className="flex items-center justify-center flex-1 grow text-center font-bold text-brand-pink text-3xl md:text-4xl">
                        {mintAmount}
                    </p>
                    <button className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center text-brand-background hover:shadow-lg bg-gray-300 font-bold rounded-md"
                        onClick={() => incrementMintAmount(maxMintAmount)}>
                        <AddCircleIcon />
                    </button>
                </div>

                <p className="text-sm text-pink-200 tracking-widest mt-3">
                    Max Mint Amount: {isPreSale ? 1 : 3}
                </p>

                <div className="border-t border-b py-4 mt-16 w-full">
                    <div className="w-full text-xl font-coiny flex items-center justify-between text-brand-yellow">
                        <p>Total</p>

                        <div className="flex items-center space-x-3">
                            <p>
                                {
                                    Number.parseFloat(0.01 * mintAmount).toFixed(
                                        2
                                    )}{' '}
                                ETH
                            </p>{' '}
                            <span className="text-gray-400">+ GAS</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
