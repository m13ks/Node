function createDataStructure() {
  const dataStructure = []

  for (let i = 0; i < 1000; i++) {
    const price = Math.random() * 100
    const roundedPrice = price.toFixed(2)

    const product = {
      name: `Product ${i}`,
      price: roundedPrice,
    }
    dataStructure.push(product)
  }

  return dataStructure
}

console.time("createDataStructure")
const myDataStructure = createDataStructure()
console.timeEnd("createDataStructure")

console.time("accessElement")
console.log(myDataStructure[49])
console.timeEnd("accessElement")
