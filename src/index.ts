import * as CryptoJS from "crypto-js";

class Block{
    public index:number;
    public hash: string;
    public prevHash: string;
    public data: string;
    public timestamp: number;

    static calculateBlockHash = (
        index:number,
        prevHash:string,
        timestamp:number,
        data:string
        ):string => CryptoJS.SHA256(index + prevHash + timestamp + data).toString();

    static validateStructure = (aBlock:Block) : boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash == "string" &&
        typeof aBlock.prevHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string";

    constructor(
        index:number,
        hash: string,
        prevHash: string,
        data: string,
        timestamp: number
    ){
        this.index = index;
        this.hash = hash;
        this.prevHash = prevHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}


const getBlockchain = () : Block[] => blockchain;

const getLatestBlock = () : Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = () : number => Math.round(new Date().getTime() / 1000);

const genesisBlock:Block = new Block(0, CryptoJS.SHA256(0 + "" + getNewTimeStamp() + "Hello").toString(), "", "Hello", getNewTimeStamp());

let blockchain: Block[] = [genesisBlock];

const createNewBlock = (data:string) : Block => {
    const prevBlock: Block = getLatestBlock();
    const newIndex : number = prevBlock.index + 1;
    const newTimestamp : number = getNewTimeStamp();
    const newHash : string = Block.calculateBlockHash(newIndex, prevBlock.hash, newTimestamp, data);
    const newBlock : Block = new Block(newIndex, newHash, prevBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};

const getHashforBlock = (aBlock: Block) : string => Block.calculateBlockHash(aBlock.index, aBlock.prevHash, aBlock.timestamp, aBlock.data)

const isBlockValid = (candidateBlock : Block, prevBlock : Block) : boolean => {
    if(!Block.validateStructure(candidateBlock)) {
        return false;
    } else if (prevBlock.index + 1 !== candidateBlock.index){
        return false;
    } else if (prevBlock.hash !== candidateBlock.prevHash){
        return false;
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    }
};

const addBlock = (candidateBlock:Block) : void => {
    if(isBlockValid(candidateBlock, getLatestBlock())){
        blockchain.push(candidateBlock);
    }
}

// console.log('createNewBlock("hello") :', createNewBlock("hello"));
// console.log('createNewBlock("bye bye") :', createNewBlock("bye bye"));

createNewBlock("2nd block");
createNewBlock("3rd block");
createNewBlock("4th block");
createNewBlock("5th block");

console.log('blockchain :', blockchain);