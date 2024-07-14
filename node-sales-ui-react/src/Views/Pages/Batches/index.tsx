import { useState, useEffect } from 'react';
import axios from 'axios';
import { NFTBatch } from '../../../Types';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';


function Batches() {
    const [batches, setBatches] = useState<NFTBatch[]>([]);

    const queryBatches = useQuery({
        queryKey: ['nft-batches'],
        queryFn: async () => await axios.get<NFTBatch[]>('http://localhost:8080/batches')
    })

    useEffect(() => {
        if (queryBatches.data)
            setBatches(queryBatches.data.data)
        if (queryBatches.error) {
            console.log(queryBatches.error)
        }
    }, [queryBatches.data?.data, queryBatches.error]);

    return (
        <div>
            <h1>Batches </h1>
            {queryBatches.isLoading && <Loading />}
            {
                batches.map((batch) => (
                    <div key={batch.id} >
                        <h2>Batch {batch.id} </h2>
                        < p > Filled: {batch.isFilled ? 'Yes' : 'No'} </p>
                        {
                            batch.fractionalNFTs.map((nft) => (
                                <div key={nft.id} >
                                    <p>Fractional NFT Token ID: {nft.fractionalNFTTokenID} </p>
                                    < p > User Wallet Address: {nft.owner.walletAddress} </p>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default Batches;
