import logo from './logo.svg';
import './App.css';
import { WalletContext, WalletProvider } from './WalletContext';
import { StarknetProvider } from "./provider/starknet-provider";
import CreateERC20Token from './iframeWidget/Erc20Creator';
// import WrapContainer from './uiComponent/Container';

function App() {
  return (
    <div className="App">
      <StarknetProvider>
        <WalletProvider>
            <CreateERC20Token></CreateERC20Token>
        </WalletProvider>
      </StarknetProvider>
    </div>

  );
}

export default App;
