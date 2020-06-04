// Arrow Functions and implicits returns
const pizzas = [
  {
    name: 'Pepperoni',
    toppings: ['Pepperoni', 'Cheese'],
  },
  {
    name: 'Anchovies',
    toppings: ['Parmesan Cheese', 'Anchovies'],
  },
];

// Regular function
// const mappedPizzas = pizzas.map(function (pizza) {
//     return pizza.name.toUpperCase();
// })
// Arrow function
const mappedPizzas = pizzas.map((pizza) => pizza.name.toUpperCase());
console.log('First example of AF ' + mappedPizzas);

const pizza = {
  name: 'Blazing Inferno',
  toppings: ['Chili'],
  price: 15,
  getName() {
    return this.name;
  },
};
const pizza2 = {
  name: 'Blazing Inferno',
  // this doesn't work in this case cause it points to getName
  getName: () => pizza2.name,
};
console.log('Different scopes for this::Example of this ' + pizza.getName()); //Uses this
console.log(
  'Different scopes for this::Example of AF without this ' + pizza2.getName()
); //Arrow uses object

// Default Function Parameter
function multiply(a: number, b: number = 25) {
  return a * b;
}
console.log(
  'Example of deafult function parameter passing only one value instead of two ' +
    multiply(5)
);

// Object literal improvements
const toppings = ['Pepperoni'];
// Will merge the pizza object with the array toppings
// Old way
// const order = {
//     pizza:pizza,
//     toppings:toppings
// }
// new way
const order = { pizza, toppings };
console.log('Object literal example:');
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
  return arr.reduce((prev, next) => prev + next);
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
  toppings: ['Pepperoni'],
};
function orderPizza({ pizzaName, pizzaToppings }: any) {
  // console.log(name, toppings);
  return { pizzaName, pizzaToppings };
}
const { pizzaName } = orderPizza(justPizza);

// Destructuring an array
const [first, second, third] = newToppings;
console.log('Destructuring of an array example ' + first, second, third);

// *******************
// Types in typescript

// Implicit vs explicit type
let implicitCoupon = 'pizza25';
let explicitCoupon: string = 'pizza25';

// Number type
const pizzaCost: number = 10;
const pizzaToppings: number = 2;
function calculatePrice(cost: number, toppings: number): number {
  return cost + 1.5 * toppings;
}
const cost: number = calculatePrice(pizzaCost, pizzaToppings);
console.log(`Number Type example: \nPizza cost is  ${cost}`);

// String type
const coupon: string = 'pizza25';
function normalizeCoupon(code: string): string {
  return code.toUpperCase();
}
const couponMessage: string = `Final coupon is ${normalizeCoupon(coupon)}`;
console.log('Example of string type: ' + couponMessage);

// Boolean type
const pizzaQuantity: number = 5;
function offerDiscount(orders: number): boolean {
  return orders >= 3;
}
if (offerDiscount(pizzaQuantity)) {
  console.log(`Example of boolean type: You're entitled to a discount!`);
} else {
  console.log(
    `Example of boolean type: Order more than 3 pizzas for a discount`
  );
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
// function orderError(error: string): never {
//   throw new Error(error);
//   //Never going to return stringOrArray
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
};
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
  if (y) {
    x * y;
  }
  return x;
};
const sumOptional = sumOrder4(25);
console.log(
  `Example of function with optional parameter \nTotal sum: ${sumOptional}`
);

// Deafult Parameter provides a parameter in the function in case one is not being sent
let sumOrder5: (price: number, quantity?: number) => number;
sumOrder5 = (x, y = 1) => x * y;
const sumDefault = sumOrder5(25, 5);
console.log(
  `Example of function with default parameter \nTotal sum: ${sumDefault}`
);

// Object Type
let pizzaObject: { name: string; getName(): string } = {
  name: 'basic pizza',
  getName() {
    return pizzaObject.name;
  },
};

// Array types
let sizes: string[];
// sizes: ['small', 'medium', 'large'];
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
let someValue: any = 'this is a string';
let strLengthOldWay: number = (<string>someValue).length;
// Or
let strLengthNewWay: number = (someValue as string).length;
// Second example with custom type
type Pizza = { name: string; toppings: number };
const PizzaAssertion: Pizza = { name: 'Spicy', toppings: 2 };
const serialized = JSON.stringify(PizzaAssertion);
function getNameFromJSON(obj: string) {
  // Using assertion we access the properties in a JSOn for a pizza type
  return (JSON.parse(obj) as Pizza).toppings;
}

// ****enum****
// Enum parses by default with Numericvalues
enum SizesNum {
  Small,
  Medium,
  Large,
}
enum SizesNum {
  ExtraLarge = 3,
}
const selectedEnumSize = 3;
console.log('Example of Enum:');
console.log(SizesNum);
console.log(
  SizesNum.Large,
  SizesNum[SizesNum.Large],
  SizesNum[selectedEnumSize]
);

// String Enum
enum SizeString {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}
let selectedEnum: SizeString = SizeString.Small;
function updateSize(size: SizeString): void {
  selectedEnum = size;
}
updateSize(SizeString.Large);

// Interfaces with extensions, index signatures example
interface Sizes {
  sizes: string[];
  availableSizesClass?: string[];
}
interface PizzaInterface extends Sizes {
  name: string;
  toppings?: number;
  getAvailableSizes?(): string[];
  // Index Signature
  [key: number]: string;
}
interface multiplePizzas {
  data: PizzaInterface[];
}
let pizzaInt: PizzaInterface;
function createPizza(name: string, sizes: string[]): PizzaInterface {
  return {
    name,
    sizes,
    getAvailableSizes() {
      return this.sizes;
    },
  };
  //  as PizzaInterface    or    : PizzaInterface next to the function
}
pizzaInt = createPizza('Super Hot Pizza', ['small', 'Extra Large']);
pizzaInt.toppings = 1;
pizzaInt[0] = 'Index 0';
console.log('Example of index:');
console.log(pizzaInt);

// Classes and constructors
// Constructor
function PizzaConstructor(name: string) {
  name = name;
  // toppingsConst = [];
}
// PizzaConstructor.prototype.addTopping = function addTopping(topping: string) {
//     this.toppingsConst.push(topping)
// }
const pizzaConst = PizzaConstructor('Hawaian');
// pizzaConst.addTopping('Pineaple');
// pizzaConst.addTopping('Chili');
console.log('Example of an object from a Constructor:');
console.log(pizzaConst);

// Classes
// Setters and Getters (Accessors)

// abstract class SizesClass implements Sizes {    **** Won't allow to create an instance of the class
class SizesClass implements Sizes {
  // protected works like private but allows to access from inherited class
  constructor(public sizes: string[], protected price: number) {}

  set availableSizesClass(sizes: string[]) {
    this.sizes = sizes;
  }
  get availableSizesClass(): string[] {
    return this.sizes;
  }
  set priceClass(price: number) {
    this.price = price;
  }
  get priceClass(): number {
    return this.price;
  }
}
const sizesClass: SizesClass = new SizesClass(['small', 'medium'], 50);
console.log('Invoke the getter:');
console.log(sizesClass.availableSizesClass);
// Invoke the setter
sizesClass.availableSizesClass = ['large', 'extra-large'];
console.log(sizesClass.availableSizesClass);

// Inheritance
// Class with private and readonly
// Added inheritance from the class Sizes above an implement from the interface above
interface PizzaInterface2 extends Sizes {
  readonly name: string;
  updatePrice(price: number): void;
  addTopping(topping: string): void;
}
class PizzaClass extends SizesClass implements PizzaInterface2 {
  public toppingsInClass: string[] = [];
  constructor(readonly name: string, public sizes: string[], price: number) {
    super(sizes, price);
  }
  updatePrice(price: number): void {
    this.price = price;
  }
  addTopping(topping: string): void {
    this.toppingsInClass.push(topping);
  }
}
const pizzaClass = new PizzaClass('4 Cheeses', ['small', 'medium'], 50);
pizzaClass.addTopping('Mozzarella');
pizzaClass.updatePrice(75);
console.log('Example of an object from a Class:');
console.log(pizzaClass);
console.log('Example from inheritance');
console.log(pizzaClass.availableSizesClass);
console.log('Example from inheritance with protected');
console.log('Pizza price: ' + pizzaClass.priceClass);

// Static properties -> Useful for util library or functions that don't deal with data sets
class CouponStatic {
  static allowed = ['Hot', 'Spicy'];
  static create(percetage: number) {
    return `Pizza discount is ${percetage}%`;
  }
}
console.log(
  'Example of Static property: ' +
    CouponStatic.create(25) +
    ` for ${CouponStatic.allowed} pizzas`
);

// Function Generics
class PizzaGeneric {
  constructor(private name: string, private price: number) {}
}
class List<T> {
  private list: T[] = [];

  addItem(item: any): void {
    this.list.push(item);
  }
  getList(): T[] {
    return this.list;
  }
}

const list = new List<PizzaGeneric>();
// Generic works on different classes
list.addItem(new PizzaGeneric('Hooot', 200));
const pizzasGen = list.getList();
console.log('Example of function generics with 2 different classes:');
console.log(pizzasGen);
const newList = new List<PizzaGeneric>();
newList.addItem(new PizzaClass('Extremly hot', ['huge', 'small'], 450));
const pizzaGen2 = newList.getList();
console.log(pizzaGen2);

// Function overloads with generic
// We need to supply the overload first to get the info from Tsc
// By declaring the different types of arguments we pass and return
// Works great on utility function
function reverse(str: string): string;
function reverse<T>(arr: T[]): T[];
function reverse<T>(stringOrArray: string | T[]): string | T[] {
  if (typeof stringOrArray === 'string') {
    return stringOrArray.split('').reverse().join('');
  }
  return stringOrArray.slice().reverse();
}
console.log('Example of function overloads:');
console.log(reverse('Pepperoni'));
console.log(reverse(['bacon', 'cheese', 'potato']));
console.log(reverse([1, 2, 3, 4, 5]));
console.log(reverse([true, true, false]));
