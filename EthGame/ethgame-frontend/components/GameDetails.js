import { React, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import EthersContext from "../context/ethers-context";
import UiContext from "../context/ui-context";

const GameDetails = () => {
  const [gameWon, setGameWon] = useState("");
  const [playerCount, setPlayerCount] = useState("");
  const [contractBalance, setContractBalance] = useState("");

  const ethersCtx = useContext(EthersContext);
  const uiCtx = useContext(UiContext);

  useEffect(() => {
    getGameDetails();
  }, []);

  const getGameDetails = async () => {
    console.log(ethersCtx.contract.address);
    console.log(ethersCtx.provider);
    const playerCount = (await ethersCtx.contract.s_playerCounter()).toString();
    const contractBalance = (
      await ethersCtx.provider.getBalance(ethersCtx.contract.address)
    ).toString();
    const contractBalanceInEth = ethers.utils.formatEther(contractBalance);

    setPlayerCount(playerCount);
    setContractBalance(contractBalanceInEth);
  };

  ethersCtx.contract
    ? ethersCtx.contract.on("GameWon", (winner, amountWon) => {
        const amountInEth = ethers.utils.formatEther(amountWon);
        setGameWon(
          `You Won the game! The winning address is: ${winner} , with and amountWon of ${amountInEth} ETH}`
        );
        console.log(`game has been Won!`);
      })
    : null;

  return (
    <div>
      <div className="details">
        <p>Current Balance in Contract: {uiCtx.contractBalance} ETH</p>
        <p>Current Games Played: {uiCtx.playerCount}</p>
      </div>
      <div className="event">{gameWon && gameWon}</div>
    </div>
  );
};

export default GameDetails;
