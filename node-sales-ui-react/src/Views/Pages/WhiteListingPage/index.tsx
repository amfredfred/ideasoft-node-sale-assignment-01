import { useAccount, useConnect } from 'wagmi'
import MasterLayout from '../../Layouts/MasterLayout'
import { metaMask } from 'wagmi/connectors'
import Loading from '../../Components/Loading'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'


const MiniBlock = () => {

    const { connect, isPending } = useConnect()
    const { isConnected, address } = useAccount()
    const [quantity, setQuantity] = useState(1)
    const [license_id, setLisenceId] = useState(1)
    const [payment_hash, setPaymentHash] = useState(1)
    const [amount_paid, setAmountPaid] = useState(1)


    const api = 'http://localhost:8080'

    const purchaseMutate = useMutation({
        mutationFn: async () => await axios.post(`${api}/buy-license-fraction`, { quantity, license_id })
    })

    const batches = useQuery({
        queryKey: ['batch'],
        queryFn: async () => await axios.post(`${api}/batches`)
    })

    useEffect(() => {
        console.log(batches.data?.data)
    }, [batches.data?.data])

    const buttonClicked = () => {
        if (!isConnected) connect({ connector: metaMask() })
        else {
            console.log('Making purchase', { address })
        }
    }

    const PurchaseModal = (
        <div className='modal'>
            <h3 style={{ paddingInline: '1rem' }}>Mint NFT</h3>
            <div style={{ display: 'flex', flexDirection: 'column', paddingInline: '1rem' }}>
                <small>Platform Fee: $0.2</small>
                <small>Gas Fee: 0.0002</small>
            </div>
            <div className="button-container">
                <button onClick={buttonClicked} type="button" className='button-main' >
                    Approve
                </button>
            </div>
        </div>
    )

    return (
        <div className='layout-mini-inner'>
            <h2>YOU CAN DO THIS</h2>
            <p  >Buy 1/10 Fractional NFT</p>
            <div className="range-input-container">
                <strong>{quantity}</strong>
                <input
                    onChange={({ target: { value } }) => setQuantity(Number(value))}
                    type="range"
                    className='range-input'
                    step={1}
                    max={10}
                    min={1} />
            </div>
            <div className="button-container">
                <button onClick={buttonClicked} type="button" className='button-main' >
                    {isConnected ? 'Purchase' : (isPending ? <Loading /> : 'Connect Wallet')}
                </button>
            </div>

            {PurchaseModal}

            {/* <span className='account-address'>{address}</span> */}

        </div>
    )
}

export default function () {

    return <MasterLayout children={<MiniBlock />} />
}