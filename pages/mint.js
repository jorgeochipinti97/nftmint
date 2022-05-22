import { useState, useEffect } from 'react'
import { Footer } from '../components/footer'
import Header from '../components/header/Header'
import Web3 from "web3"
import CreativeCoding from '../build/contracts/CreativeCoding.json'
import { ButtonConnect, ButtonMint, FooterCard, HeaderCard, MainCard } from '../components/MintCard'

const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
const whitelist = require('../utils/whiteList/WhiteList')

const leafNodes = whitelist.map((addr) => keccak256(addr))
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
const root = merkleTree.getRoot()


export default function Mint() {
    const [account, setAccount] = useState()
    const [isLoad, setIsLoad] = useState(false)
    const [isRinkevy, setIsRinkeby] = useState()
    const [contract, setContract] = useState()
    const [maxSupply, setMaxsupply] = useState()
    const [totalMinted, setTotalMinted] = useState()
    const [isPaused, setIsPaused] = useState()
    const [isPublicSale, setIsPublicSale] = useState()
    const [isPreSale, setIsPreSale] = useState()
    const [_price, setPrice] = useState()
    const [maxMintAmount, setMaxMintAmount] = useState(1)

    useEffect(() => {

        const loadWeb3 = async () => {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum)
                setIsLoad(true)
                const networkId = await window.ethereum.request({ method: "net_version", });
                const networkData = CreativeCoding.networks[networkId]

                if (networkId == '4') {
                    setIsRinkeby(true)
                    const _abi = CreativeCoding.abi
                    const address = networkData.address
                    const _contract = new web3.eth.Contract(_abi, address)
                    setContract(_contract)

                    const _maxSupply = await _contract.methods.maxSupply().call()
                    const _totalSupply = await _contract.methods.totalSupply().call()
                    const paused = await _contract.methods.paused().call()
                    const publicSale = await _contract.methods.publicM().call()
                    const presale = await _contract.methods.presaleM().call()


                    setIsPaused(isPaused)
                    setIsPreSale(presale)
                    setMaxMintAmount(presale ? 1 : 3)
                    setIsPublicSale(publicSale)
                    setIsPaused(paused)
                    setMaxsupply(_maxSupply)
                    setTotalMinted(_totalSupply)

                }
            } else {
                console.log('error al conectarse, ¿Tienes instalado Metamask?')
            }
        }
        loadWeb3()
    }, [])

    useEffect(() => {
        try {
            const loadBlockchain = async () => {

                try {
                    const web3 = window.web3
                    const accounts = await web3.eth.getAccounts()
                    setAccount(accounts[0])

                } catch (err) {
                    console.log(err)
                }
            }
            loadBlockchain()
        } catch (err) {
            console.log(err)
        }
    }, [isLoad == true])

    return (
        <>
            <div className="bg-[url('/blur.jpeg')]">
                <Header />
                <div className="flex flex-col items-center justify-center h-full w-full px-2 md:px-10">
                    <div className="relative z-1 md:max-w-3xl w-full bg-gray-900/90 filter backdrop-blur-sm py-4 rounded-md px-2 md:px-10 flex flex-col items-center">

                        {
                            account
                                ? <HeaderCard isPreSale={isPreSale} isPaused={isPaused} account={account} />
                                : null
                        }

                        <div className="flex flex-col md:flex-row md:space-x-14 w-full  ">
                            <MainCard totalMinted={totalMinted} maxSupply={maxSupply} maxMintAmount={maxMintAmount} isPreSale={isPreSale} />
                        </div>
                        {
                            account
                                ? <ButtonMint isPaused={isPaused} isPreSale={isPreSale} account={account} contract={contract} />
                                : <ButtonConnect isRinkevy={isRinkevy} />
                        }
                        <FooterCard />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}