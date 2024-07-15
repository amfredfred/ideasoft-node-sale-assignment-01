import { useEffect, useState } from 'react';
import axios from 'axios';
import MasterLayout from '../../Layouts/MasterLayout';
import { FractionalNFT } from '../../../Types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAccount, useConnect } from 'wagmi';
import Loading from '../../Components/Loading';
import { metaMask } from 'wagmi/connectors';

function PurchaseNFT() {

    //
    const { connect, isPending } = useConnect()
    const { isConnected, address, chain } = useAccount()
    const [quantity, setQuantity] = useState(1)

    const queryFractions = useQuery({
        queryKey: ['nft-fracctions'],
        queryFn: async () => await axios.get<FractionalNFT>('http://localhost:8080/fractions', { headers: { address } })
    })

    const purchaseMutate = useMutation({
        mutationFn: async (data) => await axios.post<FractionalNFT>('http://localhost:8080/purchase', data, { headers: { address } }),
        mutationKey: ['purchase-mutation']
    })

    const handlePurchase = async () => {
        if (!isConnected) connect({ connector: metaMask() })
        else {
            purchaseMutate.mutate({
                walletAddress: address,
                chain: chain?.name,
                chainId: chain?.id,
                quantity
            } as any)
        }
    }

    useEffect(() => {
        console.log('LOADED THIS PAGE')
    }, [])

    useEffect(() => {
        console.log(queryFractions.data?.data)
    }, [queryFractions.data?.data, queryFractions.error])


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
                    min={1} />
            </div>

            <div className="" style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                <div className="button-container">
                    <button onClick={handlePurchase} type="button" className='button-main' >
                        {(isPending || purchaseMutate.isPending) ? <Loading /> : isConnected ? 'Purchase' : 'Connect Wallet'}
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
