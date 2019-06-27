// This 
// Object literal with this
const myObjwithThis = {
    method1() {
        console.log('Object:::', this);
    }
}
myObjwithThis.method1();
console.log('Usage of this with apply and call');
// Function with this
function displayThis(...text: string[]) {
    console.log('Function:: ', this);
}
displayThis();
displayThis.call(myObjwithThis, 'ABC', 'DEF');
displayThis.apply(myObjwithThis, ['ABC', 'DEF']);
// Classes with this 
// Lexical scope with arrow function
class MyClassWithThis {
    myMethod() {
        // Instead of this and log that
        // const that =this;
        const foo = 123;
        console.log('Lexical scope 1', this);
        setTimeout(() => {
            console.log('Lexical scope 2', this);
        }, 0);
    }
}
const myClassWithThis = new MyClassWithThis();
myClassWithThis.myMethod();
// Getting DOM element with this
const elemThis = document.querySelector('.click');
function handleClick(this: HTMLAnchorElement, event: Event) {
    event.preventDefault();
    console.log(this.className);
}
elemThis.addEventListener('click', handleClick, false);


// Typeof Query and keyof
const Obj1 = {
    name: 'Manuel',
    age: 26
}
// We create a type infering from the object
// This will allow to create another object with the type of Obj1
type PersonType = typeof Obj1;
type PersonKeys = keyof PersonType;
type KeysOfPerson = PersonType[PersonKeys];
// Typesafe lookup
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}
const personNameProp = getProperty(Obj1, 'name');


// Readonly mapped type
interface PersonToFreeze {
    name: string;
    age?: number;
    address: {};
}
const personToFreeze: Required<PersonToFreeze> = {
    name: 'Manuel',
    age: 26,
    address: { location: 'Innopolis' }
}
// This makes sure that each property becomes readonly
type MyReadonly<T> = {
    readonly [P in keyof T]: T[P];
}
function freeze<T>(obj: T): MyReadonly<T> {
    return Object.freeze(obj);
}
// Partial mapped type to only send some values 
// works exactly as Partial<T> already included in TypeScript
type MyPartial<T> = {
    [P in keyof T]?: T[P];
}
function updatedPersonPartial(personToFreeze: PersonToFreeze, prop: MyPartial<PersonToFreeze>) {
    return { ...personToFreeze, ...prop };
}
updatedPersonPartial(personToFreeze, { name: 'Manucho' })
// Required type, even if age is optional we require to send it to the func
function printAge(personToFreeze: Required<PersonToFreeze>) {
    return `${personToFreeze.name} is ${personToFreeze.age}`
}
// Pick mapped type
// To pass just certain attributes and not having to use ? in the interface
const personPick: Pick<PersonToFreeze, 'name' | 'age'> = {
    name: 'Todd',
    age: 35
}
// Record Mapped type
// Set all the property of the object to T
let dictionary: Record<string, TrackStates> = {};
interface TrackStates {
    current: string;
    next: string;
}
const item: Record<keyof TrackStates, string> = {
    current: 'dfadasd',
    next: 'dsadasd'
}
dictionary[0] = item;

// Typeof and Typeguard
