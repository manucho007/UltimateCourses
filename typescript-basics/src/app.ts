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
console.log("Object literal example:");
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
const sum = sumAll('Rest parameter example:', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
console.log(sum);

// Array and object spreads, for inmutable objects will concat two arrays into a single one
const newToppings = ['Chili', 'Gouda', 'Corn'];
const allTopings = [...toppings, ...newToppings];
console.log('Example of object spread ' + allTopings);

// Destructuring an object
const justPizza = {
    name: 'Pepperoni',
    toppings: ['Pepperoni']
}
function orderPizza({ pizzaName, pizzaToppings }: any) {
    // console.log(name, toppings);
    return { pizzaName, pizzaToppings }
}
const { pizzaName } = orderPizza(justPizza);

// Destructuring an array
const [first, second, third] = newToppings;
console.log("Destructuring of an array example " + first, second, third);

// *******************
// Types in typescript

// Implicit vs explicit type
let implicitCoupon = 'pizza25';
let explicitCoupon: string = 'pizza25';

// Number type
const pizzaCost: number = 10;
const pizzaToppings: number = 2;
function calculatePrice(cost: number, toppings: number): number {
    return (cost + 1.5 * toppings);
}
const cost: number = calculatePrice(pizzaCost, pizzaToppings);
console.log(`Number Type example: \nPizza cost is  ${cost}`);

// String type
const coupon: string = 'pizza25';
function normalizeCoupon(code: string): string {
    return code.toUpperCase();
}
const couponMessage: string = `Final coupon is ${normalizeCoupon(coupon)}`;
console.log("Example of string type: " + couponMessage);

// Boolean type
const pizzaQuantity: number = 5;
function offerDiscount(orders: number): boolean {
    return orders >= 3;
}
if (offerDiscount(pizzaQuantity)) {
    console.log(`Example of boolean type: You're entitled to a discount!`);
} else {
    console.log(`Example of boolean type: Order more than 3 pizzas for a discount`);
}

// Any type we use when we don't know the type o data, let's try to avoid it
let anyExample: any;
anyExample = 25;
anyExample = 'pizza25';
anyExample = true;

// void type
let selectedTopping: string = 'Pepperoni';
function selectTopping(topping: string): void {
    selectedTopping = topping;
}
selectTopping('bacon');
console.log('Example of void type: ' + selectedTopping);

// Never type is used when the function is never going to return a value
// function orderError(error: string) {
//     throw new Error(error);
//     //Never going to return something
// }
// orderError('Never type example: Something went wrong!');

// Null type 
let nullExample: string | null = 'pizza25';
function changeNull(): void {
    nullExample = null;
}
console.log('Null type example 1: ' + nullExample);
changeNull();
console.log('Null type example 2: ' + nullExample);

// Union types describes a value that can be one of several types
// Works with boolean string and numbers
let pizzaSize: string = 'small';
function selectSize(size: 'small' | 'medium' | 'large'): void {
    pizzaSize = size;
}
selectSize('large');
console.log(`Example of union type \nPizza size: ${pizzaSize}`);

// Function types
// name function
function sumOrder(price: number, quantity: number): number {
    return price * quantity;
}
// arrow function
let sumOrder2 = (price: number, quantity: number): number => {
    return price * quantity;
}
// Function declared before
// let sumOrder3:Function;     Not descriptive
// Better way
let sumOrder3: (price: number, quantity: number) => number;
sumOrder3 = (x, y) => x * y;
// Or   but it's longer and more difficult to read 
// let sumOrder3: (price: number, quantity: number) => number = (x, y) => x * y;
const sumName = sumOrder(25, 2);
const sumArrow = sumOrder2(25, 2);
const sumShort = sumOrder3(25, 2);

console.log(`Example of a name function \nTotal sum: ${sumName}`);
console.log(`Example of an arrow function \nTotal sum: ${sumArrow}`);
console.log(`Example of function previously declared \nTotal sum: ${sumShort}`);

// Optional Parameter
let sumOrder4: (price: number, quantity?: number) => number;
sumOrder4 = (x, y) => {
    if (y) { x * y }
    return x
};
const sumOptional = sumOrder4(25);
console.log(`Example of function with optional parameter \nTotal sum: ${sumOptional}`);

// Deafult Parameter provides a parameter in the function in case one is not being sent
let sumOrder5: (price: number, quantity?: number) => number;
sumOrder5 = (x, y = 1) => x * y
const sumDefault = sumOrder5(25, 5);
console.log(`Example of function with default parameter \nTotal sum: ${sumDefault}`);

// Object Type
let pizzaObject: { name: string; getName(): string } = {
    name: 'basic pizza',
    getName() {
        return pizzaObject.name
    }
}

// Array types
let sizes: string[];
sizes: ['small', 'medium', 'large'];
// Generic type
let toppingsGeneric: Array<string>;
toppingsGeneric = ['Gouda', 'Chorizo', 'Chicken'];
// Tupple type tells the order of the types of the parameters entered
// Useful for a strict data structure
let pizzaTupple: [string, number, boolean];
pizzaTupple = ['Hot', 4, true];

// Type Alias
// We create our own type of virtual type, useful to reuse some duplicated code
type Size = 'small' | 'medium' | 'large';
type Callback = (size: Size) => void;
let pizzaSizeAlias: Size = 'large';
const selectSizeAlias: Callback = (x) => {
    pizzaSizeAlias = x;
};
selectSizeAlias('medium');

// Type Assertion
let someValue: any = "this is a string";
let strLengthOldWay: number = (<string>someValue).length;
// Or
let strLengthNewWay: number = (someValue as string).length;
// Second example with custom type
type Pizza = { name: string, toppings: number };
const PizzaAssertion: Pizza = { name: 'Spicy', toppings: 2 };
const serialized = JSON.stringify(PizzaAssertion);
function getNameFromJSON(obj: string) {
    // Using assertion we access the properties in a JSOn for a pizza type
    return (JSON.parse(obj) as Pizza).toppings;
}

// Enum Numeric
enum SizesNum {
    Small,
    Medium,
    Large
}
enum SizesNum {
    ExtraLarge = 3
}
const selectedEnumSize = 3;
console.log("Example of Enum:");
console.log(SizesNum);
console.log(SizesNum.Large, SizesNum[SizesNum.Large], SizesNum[selectedEnumSize]);

// String Enum 
enum SizeString {
    Small = 'small',
    Medium = 'medium',
    Large = 'large'
};
let selectedEnum: SizeString = SizeString.Small;
function updateSize(size: SizeString): void {
    selectedEnum = size;
};
updateSize(SizeString.Large);

// Interfaces with extensions, index signatures example
interface Sizes {
    sizes: string[];
}
interface PizzaInterface extends Sizes {
    name: string;
    toppings?: number;
    getAvailableSizes(): string[];
    // Index Signature
    [key: number]: string;
};
interface multiplePizzas {
    data: PizzaInterface[]
}
let pizzaInt: PizzaInterface;
function createPizza(name: string, sizes: string[]): PizzaInterface {
    return {
        name,
        sizes,
        getAvailableSizes() {
            return this.sizes
        }
    }
    //  as PizzaInterface    or    : PizzaInterface next to the function
}
pizzaInt = createPizza('Super Hot Pizza', ['small', 'Extra Large']);
pizzaInt.toppings = 1;
pizzaInt[0] = 'xyz';