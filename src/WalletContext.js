import { disconnect as disconnectStarknetkit ,useStarknetkitConnectModal} from "starknetkit";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { InjectedConnector } from "starknetkit/injected"
import React, { createContext, useState } from 'react';
import { RpcProvider, Contract } from 'starknet'





export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {

    const value = {
        

    };

    return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};