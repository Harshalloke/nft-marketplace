import axios from 'axios';

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;
const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;

/**
 * Upload file to IPFS via Pinata
 * @param {File} file - File to upload
 * @returns {Promise<string>} IPFS URL
 */
export const uploadFileToIPFS = async (file) => {
    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

    const formData = new FormData();
    formData.append('file', file);

    const metadata = JSON.stringify({
        name: file.name,
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
        cidVersion: 0,
    });
    formData.append('pinataOptions', options);

    try {
        const response = await axios.post(url, formData, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                pinata_api_key: PINATA_API_KEY,
                pinata_secret_api_key: PINATA_SECRET_KEY,
                // Authorization: `Bearer ${PINATA_JWT}`, // Alternative auth method
            },
        });

        const ipfsHash = response.data.IpfsHash;
        return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    } catch (error) {
        console.error('Error uploading file to IPFS:', error);
        throw new Error('Failed to upload file to IPFS');
    }
};

/**
 * Upload JSON metadata to IPFS via Pinata
 * @param {Object} metadata - JSON metadata object
 * @returns {Promise<string>} IPFS URL
 */
export const uploadJSONToIPFS = async (metadata) => {
    const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

    try {
        const response = await axios.post(url, metadata, {
            headers: {
                'Content-Type': 'application/json',
                pinata_api_key: PINATA_API_KEY,
                pinata_secret_api_key: PINATA_SECRET_KEY,
                // Authorization: `Bearer ${PINATA_JWT}`, // Alternative auth method
            },
        });

        const ipfsHash = response.data.IpfsHash;
        return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    } catch (error) {
        console.error('Error uploading JSON to IPFS:', error);
        throw new Error('Failed to upload metadata to IPFS');
    }
};

/**
 * Create and upload NFT metadata to IPFS
 * @param {string} name - NFT name
 * @param {string} description - NFT description
 * @param {string} imageUrl - IPFS URL of the image
 * @param {Object} attributes - Optional attributes
 * @returns {Promise<string>} Metadata IPFS URL
 */
export const createNFTMetadata = async (name, description, imageUrl, attributes = []) => {
    const metadata = {
        name,
        description,
        image: imageUrl,
        attributes,
    };

    return await uploadJSONToIPFS(metadata);
};
