// // *** This*****
function myFunction(this: any) {
  console.log('Function calling this::', this);
}
myFunction();

// // Object literal with this
const myObjwithThis = {
  methodInObject() {
    console.log('Object calling this:::', this);
  },
};
// myObjwithThis.methodInObject();

// Class with this
class MyClass {
  myMethod() {
    console.log('Class calling this::', this);
  }
}
const myInstance = new MyClass();
// myInstance.myMethod();

// *****Apply and Call******
// // Function with this
function displayThis(this: any, ...text: string[]) {
  console.log('Function:: ', this, text);
}
displayThis();
// call() and bind() replace the value of this in the function
// Call needs to use coma to send arguments
displayThis.call(myObjwithThis, 'ABC', 'Call');
// Apply needs to send an array
displayThis.apply(myObjwithThis, ['1234', 'Apply']);
// Send arguments ahead of time using bind
const bindFunction = displayThis.bind(myObjwithThis);
bindFunction('XYZ', 'Bind');

// Classes with this
// Lexical scope with arrow function
class MyClassWithThis {
  myMethod() {
    // Instead of this and log that
    // const that =this;
    const foo = 123;
    console.log('Lexical scope', this);
    setTimeout(() => {
      // Arrow Function binds the scope from above instead of creating a new one like a function does
      console.log('Arrow function scope', this);
    }, 0);
  }
}
const myClassWithThis = new MyClassWithThis();
myClassWithThis.myMethod();

// Getting DOM element with this
const elemThis = document.querySelector('.click');
function handleClick(this: HTMLAnchorElement, event: Event) {
  event.preventDefault();
  console.log('Getting element from DOM', this);
}
elemThis.addEventListener('click', handleClick, false);

// // **** Typeof Query and keyof
const Obj1 = {
  name: 'Manuel',
  age: 26,
};
// // We create a type infering from the object
// // This will allow to create another object with the type of Obj1
type PersonType = typeof Obj1;
const personType: PersonType = {
  name: 'Andre',
  age: 44,
};
// Key of will just return the keys of the original object as strings, instead of the whole interface
type PersonKeys = keyof PersonType;
// Typesafe looker will return the exact values of the keys in this case string and number
type KeysOfPerson = PersonType[PersonKeys];
// // Typesafe lookup
// extends keyof gives us the from the Obj, in this case name|age
function getProperty<T, K extends keyof T, X extends keyof T>(
  obj: T,
  key: K,
  age: X
) {
  return obj[key];
}
const personNameProp = getProperty(Obj1, 'name', 'age');
console.log(personNameProp);

// // Readonly mapped type
interface PersonToFreeze {
  name: string;
  age?: number;
  address: {};
}
const personToFreeze: Required<PersonToFreeze> = {
  name: 'Manuel',
  age: 26,
  address: { location: 'Innopolis' },
};
// // This makes sure that each property becomes readonly
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};
function freeze<T>(obj: T): MyReadonly<T> {
  return Object.freeze(obj);
}
const newPersonToFreeze = freeze(personToFreeze);

// // Partial mapped type to only send some values
// // works exactly as Partial<T> already included in TypeScript
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};
function updatedPersonPartial(
  personToFreeze: PersonToFreeze,
  prop: MyPartial<PersonToFreeze>
) {
  return { ...personToFreeze, ...prop };
}
updatedPersonPartial(personToFreeze, { name: 'Manucho' });
// // Required type, even if age is optional we require to send it to the func
// The minus will remove the property of optional
type MyRequire<T> = {
  [P in keyof T]-?: T[P];
};
function printAge(personToFreeze: Required<PersonToFreeze>) {
  return `${personToFreeze.name} is ${personToFreeze.age}`;
}
// Pick mapped type
// To pass just certain attributes and not having to use ? in the interface
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
const personPick: Pick<PersonToFreeze, 'name' | 'age'> = {
  name: 'Todd',
  age: 35,
};
// // Record Mapped type
// // Set all the property of the object to T
let dictionary: Record<string, TrackStates> = {};
interface TrackStates {
  current: string;
  next: string;
}
const item: Record<keyof TrackStates, string> = {
  current: 'dfadasd',
  next: 'dsadasd',
};
dictionary[0] = item;

// // Typeof and Typeguard
class Song {
  constructor(public title: string, public duration: string | number) {}
}
// Typescript is smart to understand that the first parameter is a string and doesn't require to check
// for the second parameter to know that it's a number
function getSOngDuration(item: Song) {
  if (typeof item.duration === 'string') {
    return item.duration;
  }
  const { duration } = item;
  const minutes = Math.floor(duration / 60000);
  const seconds = (duration / 1000) % 60;
  return `${minutes}:${seconds}`;
}
const songDurationFromString = getSOngDuration(
  new Song('Welcome to the Jungle', '05:12')
);
console.log('Type Guard String', songDurationFromString);
const songDurationFromMS = getSOngDuration(new Song('Wonderwall', 330000));
console.log('Type Guard Number', songDurationFromMS);
