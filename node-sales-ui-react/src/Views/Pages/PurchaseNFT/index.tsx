import { useEffect, useState } from 'react';
import axios from 'axios';
import MasterLayout from '../../Layouts/MasterLayout';
import { FractionalNFT } from '../../../Types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAccount, useChains, useConnect, useSendTransaction } from 'wagmi';
import Loading from '../../Components/Loading';
import { metaMask } from 'wagmi/connectors';

import { toast } from 'react-toastify';
import { parseEther } from 'viem';

function PurchaseNFT() {

    //
    const { connect, isPending } = useConnect()
    const { isConnected, address, chain, chainId } = useAccount()
    const sendTransaction = useSendTransaction()
    const [quantity, setQuantity] = useState(1)

    const queryFractions = useQuery({
        queryKey: ['nft-fractions'],
        queryFn: async () => await axios.get<FractionalNFT>('http://localhost:8080/fractions', { headers: { address } })
    })

    const purchaseMutate = useMutation({
        mutationFn: async (data) => await axios.post<{ message: string }>('http://localhost:8080/purchase', data, { headers: { address } }),
        mutationKey: ['purchase-mutation']
    })

    const handlePurchase = async () => {
        if (!isConnected) connect({ connector: metaMask() })
        else sendTransaction.sendTransaction({
            to: address,
            value: parseEther('0')
        })

    }

    useEffect(() => {
        if (purchaseMutate.status === 'success') {
            toast(purchaseMutate?.data?.data?.message, { position: 'bottom-right' })
        }
    }, [purchaseMutate.status])

    useEffect(() => {
        console.log(queryFractions.data?.data)
    }, [queryFractions.data?.data, queryFractions.error])


    useEffect(() => {

        console.log(String(sendTransaction.data))
        if (sendTransaction.status == 'success') {
            purchaseMutate.mutate({
                walletAddress: address,
                chain: chain?.name ?? "CHAIN_NAME",
                chainId: chain?.id,
                quantity
            } as any)
        }


    }, [sendTransaction.status])

    const Content = (
        <>
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
                    min={1}
                    value={quantity}
                />
            </div>

            <div className="" style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                <div className="button-container">
                    <button onClick={handlePurchase} type="button" className='button-main' >
                        {(isPending || purchaseMutate.isPending || sendTransaction.isPending) ? <Loading /> : isConnected ? 'Purchase' : 'Connect Wallet'}
                    </button>
                </div>
                <div className="button-container" style={{ opacity: .4 }}>
                    <button onClick={handlePurchase} disabled type="button" className='button-main' >
                        Mint (Soon)
                    </button>
                </div>
            </div>
        </>
    )

    return <MasterLayout children={Content} />
}

export default PurchaseNFT;
