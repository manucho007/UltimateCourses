// Arrow Functions and implicits returns
const pizzas = [
    {
        name: "Pepperoni",
        toppings: [
            "Pepperoni",
            "Cheese"
        ]
    },
    {
        name: "Anchovies",
        toppings: [
            "Parmesan Cheese",
            "Anchovies"
        ]
    }
]

// Regular function
// const mappedPizzas = pizzas.map(function (pizza) {
//     return pizza.name.toUpperCase();
// })
// Arrow function
const mappedPizzas = pizzas.map(pizza => pizza.name.toUpperCase());
console.log("First example of AF " + mappedPizzas);

const pizza = {
    name: 'Blazing Inferno',
    toppings: ['Chili'],
    price: 15,
    getName() {
        return this.name
    }
}
const pizza2 = {
    name: 'Blazing Inferno',
    // this doesn't work in this case cause it points to getName
    getName: () => pizza2.name
}
console.log("Example of this " + pizza.getName()); //Uses this
console.log("Example of AF without this " + pizza2.getName()); //Arrow uses object

// Default Function Parameter
function multiply(a: number, b: number = 25) {
    return a * b;
}
console.log("Example of deafult function parameter " + multiply(5));



// Object literal improvements
const toppings = [
    'Pepperoni'
]
// Will merge the pizza object with the array toppings
// Old way
// const order = {
//     pizza:pizza,
//     toppings:toppings
// }
// new way
const order = { pizza, toppings };
console.log(order);

// Rest Parameters allows to pass n number of arguments instead (n1,n2,n3,n4,n5,nx) just (...arr)
// FIrst way passing an array
// function sumAll(arr: Array<number>) {
//     return arr.reduce((prev, next) => prev + next)
// }
// const sum = sumAll([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// sending as a single value with ...arg
function sumAll(message: string, ...arr: Array<number>) {
    console.log(message);
    return arr.reduce((prev, next) => prev + next)
}
const sum = sumAll('Rest parameter example!', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
console.log(sum);

// Array and object spreads, for inmutable objects will concat two arrays into a single one
const newToppings = ['Chili', 'Gouda'];
const allTopings = [...toppings, ...newToppings];
console.log('Example of object spread ' + allTopings);


