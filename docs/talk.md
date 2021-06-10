## What is useEffect?

- Description from the [docs](https://reactjs.org/docs/hooks-effect.html#example-using-hooks):
  > By using this Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates.
---

## Anatomy of a useEffect:

```js
const MyComponent = () => {

  // no assignment, because it doesn't return anything
  useEffect(() => { // the effect function
    // do some stuff, usually an "effectful" change

    // optionally, can return a destructor, to
    return () => {
      //un-do some stuff
    }
  },
  [ /* optionally, only run if these dependencies change */ ]);

  return <div />
}
```
---

## Stop saying "effect"! What is an "effect"!?

- From [wikipedia](https://en.wikipedia.org/wiki/Side_effect_(computer_science)):
> In computer science, an operation, function or expression is said to have a side effect if it modifies some state variable value(s) outside its local environment

- In React, the "local environment" is the Component
---
## Common use-cases for useEffect

- Update a value outside of the component, based on state within the component

```js
// Example 1: Alter value outside of component

const [count, setCount] = useState(0);
useEffect(() => {
  document.title = `You've clicked ${count} times`
});
```
---

- Update a value within a component, based on a value outside a component after render

```js
// Example 2: Use an external value in component after render

const [isTextTooWide, setIsTextTooWide] = useState(false);
useEffect(() => {
  if (getComponentTextWidthPx() > 400) {
    setIsTextTooWide(true);
  }
});
```
---

- Perform any async tasks (as it lets the reader know that something will happen sometime after render)

```js
// Example 3: Do something async
const [isOnline, setIsOnline] = useState(false);

useEffect(() => {
  function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
});
```
---

## What about the dependencies?
// TODO: Fill this in


## Common pitfalls for useEffects

- trying to do handle too many effects in a useEffect
- infinite loops (ie. reacting to and setting the same stateful variable)
- async tasks that outlive the component's lifecycle

## Best practices for useEffects

- Minimise the dependencies for a useEffect - the less dependencies, the more reliably it will run
- Keep useEffects focused on a single "effect" - eg. if a useEffect sets state from an async source, don't also call a DB write in the same useEffect.
- Don't be afraid to have multiple useEffects in a component. The natural consequence of reducing the surface area of a useEffect might mean that you have more, smaller, useEffects. This is fine!

```js

const piggieIndex = usePiggieIndex(); // let's pretend this is a stateful variable
const [material, setMaterial] = useState(null);

// too many responsibilities
// 1. gets and sets the material for the piggie,
// 2. writes about the wolf's success based on the material
useEffect(()=> {
  const fetchMaterialAndWriteWolfSuccess = async () => {
    const piggieMaterial = await fetchPiggieMaterial(piggieIndex);
    
    setMaterial(piggieMaterial);

    if (["straw", "twigs"].includes(piggieMaterial)) {
      // an effectful task
      writeWolfSuccess(true);
    }
  }
  
  void fetchMaterialAndWriteWolfSuccess();
}, [fetchPiggieMaterial, piggieIndex, setMaterial, writeWolfSuccess]);

// a cleaner refactor with two useEffects

// 1. gets and sets the material for the piggie
useEffect(()=> {
  const fetchMaterialForPiggie = async () => {
    const material = await fetchPiggieMaterial(piggieIndex);
    
    setMaterial(material);
  }
  void fetchMaterialForPiggie();
}, [fetchPiggieMaterial, piggieIndex, setMaterial]);

// 2. based on the material, writes about the wolf's success
useEffect(() => {
  if (["straw", "twigs"].includes(piggieMaterial)) {
    // an effectful task
    writeWolfSuccess(true);
  }
}, [material, writeWolfSuccess])

```
- name your useEffect callback functions.

```js
// hard to figure out what this is doing...
useEffect(() => {
  if (["straw", "twigs"].includes(piggieMaterial)) {
    // an effectful task
    writeWolfSuccess(true);
  }
}, [material, writeWolfSuccess]);

// easier with a named function
useEffect(
  function writeWolfSuccessIfMaterialsMatch() {
    if (["straw", "twigs"].includes(piggieMaterial)) {
      // an effectful task
      writeWolfSuccess(true);
    }
  }, [material, writeWolfSuccess]);
```
- If you're reusing the same useEffect in multiple components, it's probably a good candidate for a hook.