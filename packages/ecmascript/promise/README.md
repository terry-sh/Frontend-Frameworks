# Promise


## FAQ

- `Promise.resolve` v.s. `new Promise`

```js

function test() {
	const task = new Promise.resolve();

	new Promise(resolve => resolve(task)).then(() => {
		console.log("A");
	});

	Promise.resolve(task).then(() => {
		console.log("B");
	});

	task.then(() => {
		console.log("C");
	});
}

test();
// logs: B, C, A
```

- `.then(_, error => {})` vs `.then().catch(error => {})`


```js

const Error1 = new Error("1");

function fetchSomething(doThrow) {
	return new Promise((resolve, reject) => {
		if (doThrow) {
			reject(Error1);
		} else {
			resolve();
		}
	});
}

fetchSomething(/*true or false*/).then(res => {
	throw new Error("2");
}, error => {
	// only catches Error 1
	console.log(error);
});

fetchSomething(/*true or false*/).then(res => {
	throw new Error("2");
}).catch(error => {
	// catches Error 1 and 2
	console.log(error);
});
```