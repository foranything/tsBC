interface Human {
    name: string;
    age: number;
    gender: string;
}

const person = {
    name: "bbb",
    gender: "male",
    age: 22
}

const sayHi = (person: Human):string => {
    return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`
};

// sayHi(name, age, gender);
console.log('sayHi(name, age, gender) :', sayHi(person));
export {};