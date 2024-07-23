import React, { useState, useMemo, useEffect } from 'react';

import strk from '../assets/strk.png';
import audit from "../assets/auth.svg";

import { WidgetWrapper, SplitLine, Subtitle, InputWrapper, Input, Label, DecimalWrapper, Widget, SubmitButton, Footer, Title } from "intent_ui_widget";
import { abi, createTokenABI } from '../const/abi';
import { CREATE_TOKEN_CONTRACT, token_contract_address } from '../const/Const';

import BigInt from 'big-integer';
import { useAccount, useConnect, useContract, useContractWrite } from '@starknet-react/core';
import { argent } from '@starknet-react/core';
import { RpcProvider } from 'starknet';
import { parseTransactionDetails } from '../utils/Common';

const CreateERC20Token = () => {
  const [decimal, setDecimal] = useState(18);
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [amount, setAmount] = useState(0);
  const increaseDecimal = () => setDecimal(decimal + 1);
  const decreaseDecimal = () => setDecimal(decimal - 1);
  const { connect } = useConnect();
  const [callsCreate, setCallsCreate] = useState(null);
  const { address: strkAddress } = useAccount();
  const provider = new RpcProvider({
    // nodeUrl: "https://free-rpc.nethermind.io/sepolia-juno/"
    nodeUrl: "https://starknet-sepolia.public.blastapi.io"
  });
  const handleCreate = (values) => {
    // const calls_create = createCalls(name, symbol, amount, strkAddress);
    // setCallsCreate(calls_create);
    // 发送消息给外部窗口
    console.log(1111);
    getTransactionDetails('0x394b07b6531f279f4e0c04803e2f7a11bf22c2961e8243b689ee91ffcd9c381').then(res => {
      console.log('res', res);
      window.parent.postMessage({
        tx_hash: '0x394b07b6531f279f4e0c04803e2f7a11bf22c2961e8243b689ee91ffcd9c381',
        details: JSON.stringify(res)
      }, '*');
    })

  };
  const getTransactionDetails = async (transactionHash) => {
    try {
      // provider.waitForTransaction("0x394b07b6531f279f4e0c04803e2f7a11bf22c2961e8243b689ee91ffcd9c381").then(res => {
      //   console.log('res', res);
      //   const details = parseTransactionDetails(transactionDetails)
      //   return details
      // });
      const transactionDetails = await provider.getTransactionReceipt(transactionHash);
      const details =   (transactionDetails)
      return details
      // console.log('Transaction Details:', details);
    } catch (error) {
      console.error('Error fetching transaction details:', error);
    }
  };
  const { contract: createContract } = useContract({
    abi: createTokenABI,
    address: CREATE_TOKEN_CONTRACT
  });

  const { contract: strk_contract } = useContract({
    abi: abi,
    address: token_contract_address,  //strk contract address;
  });

  const { writeAsync } = useContractWrite({
    calls: callsCreate,
  });

  const ConnectWallet = async () => {
    const connector = argent();
    await connect({ connector });
  };

  const createCalls = useMemo(() => {
    return (name, symbol, amount, receive) => {
      if (!name || !name || !amount || !receive) return [];
      return createContract.populateTransaction["create_ERC20"](name, symbol, { low: amount * BigInt(1000000000000000000), high: 0 }, strkAddress);
    };
  }, [createContract, strkAddress]);

  useEffect(() => {
    ConnectWallet();



  }, []);

  useEffect(() => {
    if (callsCreate) {
      writeAsync().then(res => {
        console.log('contract_result', res);
      });
    }
  }, [callsCreate, writeAsync]);

  return (
    <WidgetWrapper>
      <Title>Create ERC20 Token11</Title>
      <SplitLine></SplitLine>
      <Subtitle>This tool is offered by zkgamestop team. Everyone can easily use this component to publish tokens with one click in <img style={{ width: '15px', marginRight: '2px', height: 'auto' }} src={strk} />Starknet.</Subtitle>

      <Label>Token Name <img style={{ width: '15px', marginRight: '2px', height: 'auto' }} src={strk} /></Label>
      <InputWrapper>
        <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      </InputWrapper>

      <Label>Token Symbol <img style={{ width: '15px', marginRight: '2px', height: 'auto' }} src={strk} /></Label>
      <InputWrapper>
        <Input type="text" placeholder="Symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
      </InputWrapper>

      <Label>Amount</Label>
      <InputWrapper>
        <Input type="number" min={0} placeholder="Amount" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      </InputWrapper>

      <Label>Decimal</Label>
      <DecimalWrapper>
        <Widget onClick={decreaseDecimal}>-</Widget>
        <Input type="text" value={decimal} readOnly style={{ textAlign: 'center' }} />
        <Widget onClick={increaseDecimal}>+</Widget>
      </DecimalWrapper>

      <Label>Server Fee</Label>
      <InputWrapper>
        <Input type="text" value="10 STRK" readOnly style={{ textAlign: 'center' }} />
      </InputWrapper>

      <SubmitButton onClick={handleCreate}>Create</SubmitButton>
      <Footer><img src={audit} style={{ width: '15px', marginRight: '2px', height: 'auto' }} />Audit by zkgamestop</Footer>
    </WidgetWrapper>
  );
};

export default CreateERC20Token;
