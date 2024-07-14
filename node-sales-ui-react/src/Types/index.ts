export type NFTBatch = {
    id: number
    fractionalNFTs: FractionalNFT[]
    nodeLicenseContractAddress: string
    nodeLicenseTokenID: string
    chain: string
    isFilled: boolean
}

export type FractionalNFT = {
    id: number
    owner: NFTOwner
    batch: NFTBatch
    fractionalNFTContractAddress: string
    fractionalNFTTokenID: string
    chain: string
    chainID: string
}


export type NFTOwner = {
    id: number;
    walletAddress: string;
    fractionalNFTs: FractionalNFT[];
}