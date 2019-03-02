const originals = [
  {
    public1: 'Hello',
    secret: 'Oh no!',
    public2: 'Good bye' 
  },
  {
    public1: 'Hello',
    secret: 'Oh no!',
    public2: 'Good bye' 
  }
]


const cleans = []

originals.forEach(obj => {
  cleans.push(obj.public1)
  cleans.push(obj.public2)
})

console.log(cleans)
