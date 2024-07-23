// export function parseTransactionDetails(transactionJson) {
//     console.log(transactionJson);
//     const data = transactionJson;
    
//     let tokensTransferred = [];
//     let senderAddresses = new Set();
//     let deployedContracts = new Set();

//     // Parsing events for Tokens Transferred and Sender Address
//     (data.events || []).forEach(event => {
//         const fromAddress = event.from_address || "";
//         if (fromAddress) {
//             senderAddresses.add(fromAddress);
//         }
        
//         const eventData = event.data || [];
//         if (eventData.length > 2) {
//             const tokenDetails = {
//                 from: fromAddress,
//                 to: eventData[0],
//                 amount: parseInt(eventData[2], 16)
//             };
//             tokensTransferred.push(tokenDetails);
//         }
//     });
    
//     // Deployed Contracts are not explicitly mentioned in the JSON provided
//     // deployedContracts.add('Example Deployed Contract'); // Placeholder

//     // Logging or returning the parsed details
//     console.log("TOKENS TRANSFERRED:");
//     tokensTransferred.forEach(token => {
//         console.log(`From: ${token.from}, To: ${token.to}, For: ${token.amount}`);
//     });

//     console.log("\nSENDER ADDRESS:");
//     senderAddresses.forEach(address => {
//         console.log(address);
//     });
    
//     console.log("\nDEPLOYED CONTRACTS:");
//     deployedContracts.forEach(contract => {
//         console.log(contract);
//     });

//     // Alternatively, return the parsed details
//     return {
//         tokensTransferred,
//         senderAddresses: Array.from(senderAddresses),
//         deployedContracts: Array.from(deployedContracts)
//     };
// }


export function  parseTransactionDetails(data) {
    let tokensTransferred = [];
    let senderAddresses = new Set();
    let deployedContracts = new Set();

    // Parsing events for Tokens Transferred and Sender Address
    (data.events || []).forEach(event => {
        const fromAddress = event.from_address || "";
        if (fromAddress) {
            senderAddresses.add(fromAddress);
        }
        
        const eventData = event.data || [];
        if (eventData.length > 2) {
            const tokenDetails = {
                from: fromAddress,
                to: eventData[0],
                amount: parseInt(eventData[2], 16)
            };
            tokensTransferred.push(tokenDetails);
        }
    });
    
    // Deployed Contracts are not explicitly mentioned in the JSON provided
    // deployedContracts.add('Example Deployed Contract'); // Placeholder

    // Logging the parsed details
    console.log("TOKENS TRANSFERRED:");
    tokensTransferred.forEach(token => {
        console.log(`From: ${token.from}, To: ${token.to}, For: ${token.amount}`);
    });

    console.log("\nSENDER ADDRESS:");
    senderAddresses.forEach(address => {
        console.log(address);
    });
    
    console.log("\nDEPLOYED CONTRACTS:");
    deployedContracts.forEach(contract => {
        console.log(contract);
    });

    return {
        tokensTransferred,
        senderAddresses: Array.from(senderAddresses),
        deployedContracts: Array.from(deployedContracts)
    };
}
