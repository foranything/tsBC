const name = "aaa",
    age = 24,
    gender = "male"

const sayHi = (name:string, age:number, gender:string):string => {
    return `Hello ${name}, you are ${age}, you are a ${gender}!`
};

// sayHi(name, age, gender);
console.log('sayHi(name, age, gender) :', sayHi(name, age, gender));
export {};