## Common use-cases for useEffect

- Perform a task outside of the component (ie. a side-effect), based on the state of the component
- React to a state change from a hook, to perform some task within the component
- The "React-way" to perform any async tasks

## Mental model of a useEffect

- used to trigger side-effects
- used to react to external "events"
- used for asynchronous tasks
- is capable of reacting to multiple "dependencies"
- runs parallel to the react render lifecycle
- a component can have multiple useEffects, and there can be multiple useEffects per stateful variable

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