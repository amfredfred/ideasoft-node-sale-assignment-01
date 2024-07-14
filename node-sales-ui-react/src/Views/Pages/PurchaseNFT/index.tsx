'use strict'

import { useState } from 'react';
import axios from 'axios';
import MasterLayout from '../../Layouts/MasterLayout';
import { FractionalNFT } from '../../../Types';


function PurchaseNFT() {
    const [walletAddress, setWalletAddress] = useState('');
    const [fractionalNFTContractAddress, setFractionalNFTContractAddress] = useState('');
    const [fractionalNFTTokenID, setFractionalNFTTokenID] = useState('');
    const [chain, setChain] = useState('');
    const [chainID, setChainID] = useState('');

    const handlePurchase = async () => {
        try {
            const response = await axios.post<FractionalNFT>('http://localhost:3000/purchase', {
                walletAddress,
                fractionalNFTContractAddress,
                fractionalNFTTokenID,
                chain,
                chainID,
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <MasterLayout>
            <h1>Purchase Fractional NFT </h1>
            < input type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)
            } placeholder="Wallet Address" />
            <input type="text" value={fractionalNFTContractAddress} onChange={(e) => setFractionalNFTContractAddress(e.target.value)} placeholder="Fractional NFT Contract Address" />
            <input type="text" value={fractionalNFTTokenID} onChange={(e) => setFractionalNFTTokenID(e.target.value)} placeholder="Fractional NFT Token ID" />
            <input type="text" value={chain} onChange={(e) => setChain(e.target.value)} placeholder="Chain" />
            <input type="text" value={chainID} onChange={(e) => setChainID(e.target.value)} placeholder="Chain ID" />
            <button onClick={handlePurchase}> Purchase </button>
        </MasterLayout>
    );
}

export default PurchaseNFT;
