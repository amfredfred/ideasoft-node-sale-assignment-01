import { useState, useEffect } from 'react';
import axios from 'axios';
import { NFTBatch } from '../../../Types';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import { useAccount } from 'wagmi';
import { Link } from 'react-router-dom';


function Batches() {
    const [batches, setBatches] = useState<NFTBatch[]>([]);
    const { address } = useAccount()

    const queryBatches = useQuery({
        queryKey: ['nft-batches'],
        queryFn: async () => await axios.get<NFTBatch[]>('http://localhost:8080/batches', { headers: { address, 'Accept': 'application/json' } })
    })

    useEffect(() => {
        if (queryBatches.data?.data)
            setBatches(queryBatches.data.data)
        if (queryBatches.error) {
            console.log(queryBatches.error)
        }
    }, [queryBatches.data?.data, queryBatches.error]);

    return (
        <div style={{ width: '100%', overflow: 'hidden', padding: '1rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
            <h1>Batches </h1>
            {queryBatches.isLoading && <Loading />}
            <div style={{ width: '100%', overflow: 'hidden auto', height: '100%', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-start' }}>
                {batches.length <= 0 ? "Nothing HEre" : batches.map((batch) => (
                    <div key={batch.id} style={{ background: 'black', borderRadius: 10, padding: '.6rem', width: 'clamp(calc(300px - 1rem), 400px, 100%)', flexGrow: 1 }} >
                        <h2>Batch {batch.id} </h2>
                        < p > Filled: {batch.isFilled ? 'Yes' : 'No'} </p>
                        <h2>Fractions: {batch.fractionalNFTs.length}/10</h2>
                    </div>
                ))
                }
            </div>

            <Link to="/purchase" className='navigate-link'>
                Purchase NFT
            </Link>
        </div>
    );
}

export default Batches;
