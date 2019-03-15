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
        ):string => CryptoJS.SHA256(index + prevHash + timestamp + data).toString

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

Block.calculateBlockHash

const genesisBlock:Block = new Block(0, "aaaaaa", "", "Hello", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = () : Block[] => blockchain;

const getLatestBlock = () : Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = () : number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data:string) : Block => {
    const prevBlock: Block = getLatestBlock();
    const newIndex : number = prevBlock.index + 1;
    const newTimestamp : number = getNewTimeStamp();
    const newHash : string = Block.calculateBlockHash(newIndex, prevBlock.hash, newTimestamp, data);
    const newBlock : Block = new Block(newIndex, newHash, prevBlock.hash, data, newTimestamp);
    return newBlock;
};

const isBlockValid = (candidateBlock : Block, prevBlock : Block) : boolean => {
    if(Block.validateStructure(candidateBlock)) {
        return false;
    } else if (prevBlock.index + 1 !== candidateBlock.index){
        return false;
    } else if (prevBlock.hash !== candidateBlock.prevHash){
        return false;
    }
}

console.log('createNewBlock("hello") :', createNewBlock("hello"));
console.log('createNewBlock("bye bye") :', createNewBlock("bye bye"));