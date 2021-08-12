import './App.css';
import Web3 from 'web3';
import ABI from "./abi/Moonboi.json";

function App() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  }

  const destinationAddress = process.env.REACT_APP_DESTINATION_ADDRESS;
  const amount = 100000;
  const nonce = Math.floor(Math.random() * 10000000000) + 1;

  const signature = sign(destinationAddress, amount, nonce);
  verify(destinationAddress, amount, nonce, signature);

  return (
    <div className="App"></div>
  );
}

const sign = (address, amount, nonce) => {
  const hash = generateHash(address, amount, nonce);
  const privateKey = '0x' + process.env.REACT_APP_CONTRACT_PRIVATE_KEY;

  const signature = window.web3.eth.accounts.sign(hash, privateKey);

  return signature.signature;
}

const verify = (address, amount, nonce, signature) => {
  const contractInstance = new window.web3.eth.Contract(
    ABI.abi,
    process.env.REACT_APP_CONTRACT_ADDRESS,
    {
      from: address,
    }
  );

  contractInstance.methods.verify(amount, nonce, signature).call(function (error, result) {
    if (error) {
      console.log(error);

      return;
    }

    console.log(result);
  });
}

const generateHash = (address, amount, nonce) => {
  return window.web3.utils.soliditySha3({t: "address", v: address}, {t: "uint256", v: amount}, {t: "uint256", v: nonce});
}

export default App;
