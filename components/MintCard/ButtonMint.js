import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { MintContext } from '../../context/MintContext';

const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
const whitelist = require('../../utils/whiteList/WhiteList')

const leafNodes = whitelist.map((addr) => keccak256(addr))
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
const root = merkleTree.getRoot()

export const ButtonMint = ({ isPaused, isPreSale, account, contract }) => {
    const { mintAmount} = useContext(MintContext)
    const [isMinting, setIsMinting] = useState(false)
    const [_status, _setStatus] = useState(null)

    const presaleMint = async (mintAmount) => {
        if (!account) {
            return {
                success: false,
                status: 'To be able to mint, you need to connect your wallet'
            }
        }

        const leaf = keccak256(account)
        const proof = merkleTree.getHexProof(leaf)

        // Verify Merkle Proof
        const isValid = merkleTree.verify(proof, leaf, root)

        if (!isValid) {
            return {
                success: false,
                status: 'Invalid Merkle Proof - You are not on the whitelist'
            }
        }

        const nonce = await web3.eth.getTransactionCount(
            account,
            'latest'
        )

        // Set up our Ethereum transaction
        const tx = {
            to: '0xA86eF127D4d9083E55f89b0CD4a18586C7d4aee3',
            from: account,
            value: parseInt(
                web3.utils.toWei(String(0.01 * mintAmount), 'ether')
            ).toString(16), // hex
            data: contract.methods
                .presaleMint(account, mintAmount, proof)
                .encodeABI(),
            nonce: nonce.toString(16)
        }

        try {
            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [tx]
            })

            return {
                success: true,
                status: (
                    <a href={`https://rinkeby.etherscan.io/tx/${txHash}`} target="_blank">
                        <p>Click here to check out your transaction on Etherscan</p>
                    </a>
                )
            }
        } catch (error) {
            return {
                success: false,
                status: 'Smth went wrong:' + error.message
            }
        }
    }

    const publicMint = async (mintAmount) => {
        if (!account) {
            return {
                success: false,
                status: 'To be able to mint, you need to connect your wallet'
            }
        }

        const nonce = await web3.eth.getTransactionCount(
            account,
            'latest'
        )

        // Set up our Ethereum transaction
        const tx = {
            to: '0xA86eF127D4d9083E55f89b0CD4a18586C7d4aee3',
            from: account,
            value: parseInt(
                web3.utils.toWei(String(0.01 * mintAmount), 'ether')
            ).toString(16), // hex
            data: contract.methods.publicSaleMint(mintAmount).encodeABI(),
            nonce: nonce.toString(16)
        }

        try {
            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [tx]
            })

            return {
                success: true,
                status: (
                    <a href={`https://rinkeby.etherscan.io/tx/${txHash}`} target="_blank">
                        <p>Click here to check out your transaction on Etherscan</p>
                    </a>
                )
            }
        } catch (error) {
            return {
                success: false,
                status: ' Smth went wrong:' + error.message
            }
        }
    }

    const presaleMintHandler = async () => {
        console.log('hola')
        setIsMinting(true)

        const { success, status } = await presaleMint(mintAmount)

        _setStatus({
            success,
            message: status
        })
        setIsMinting(false)
    }


    const publicMintHandler = async () => {
        console.log('hola1')

        setIsMinting(true)

        const { success, status } = await publicMint(mintAmount)

        _setStatus({
            success,
            message: status
        })

        setIsMinting(false)
    }


    return (
        <div>
            <button
                className={` ${isPaused || isMinting
                    ? 'bg-gray-900 cursor-not-allowed'
                    : 'bg-gradient-to-br from-brand-purple to-brand-pink shadow-lg hover:shadow-pink-400/50'
                    } font-coiny mt-12 w-full px-6 py-3 rounded-md text-2xl text-white  mx-4 tracking-wide uppercase`}
                disabled={isPaused || isMinting}
                onClick={isPreSale ? presaleMintHandler : publicMintHandler}>
                {isMinting ? 'Minting...' : 'Mint'}
            </button>

            {_status && (
                <div
                    className={`border ${_status.success ? 'border-green-500' : 'border-brand-pink-400 '
                        } rounded-md text-start h-full px-4 py-4  mx-auto mt-8 md:mt-4"`}>
                    <p className="flex flex-col space-y-2 text-white text-sm md:text-base break-words ...">
                        {_status.message}
                    </p>
                </div>
            )
            }
        </div>
    )
}
