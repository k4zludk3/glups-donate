import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0xd25C7236149d878a0A00c8eBeDeaAB70991Bc767";

export async function doLogin() {

    if (!window.ethereum) throw new Error("No MetaMask found!");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if (!accounts || !accounts.length) throw new Error("Wallet not found/allowed.");

    localStorage.setItem("wallet", accounts[0]);

    return accounts[0];
}

function getContract() {
    const web3 = new Web3(window.ethereum);
    const from = localStorage.getItem("wallet");
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

export function addCampaign(campaign) {
    const contract = getContract();
    return contract.methods.addCampaign(campaign.nome, campaign.causa, campaign.cnpj).send();
}

export function getLastCampaignId() {
    const contract = getContract();
    return contract.methods.nextId().call();
}

export function getCampaign(id) {
    const contract = getContract();
    return contract.methods.campaigns(id).call();
}

export function donate(id, donation) {
    const contract = getContract();
    return contract.methods.donate(id).send({ value: Web3.utils.toWei(donation, "ether") });
}