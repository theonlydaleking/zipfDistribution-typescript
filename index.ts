


interface CanGetZeta {
  st: number
  n: number
  theta: number
  isum: number
}

interface CanGenerateZipf {
 min: number 
 max: number 
 constant: number
 zetan: number 
}

class ZipfGenerator implements CanGenerateZipf {
  items: number
  base: number
  eta: number

  constructor(min: number, max: number, constant? :number , zetan?: number ) {
    this.items = max - min + 1
    this.base = min
    this.constant = constant || 0.99 
    this.zetan = zetan || this.getZeta({st: 0, n: this.items, theta: this.constant, isum: 0})
    this.eta = (1 - Math.pow(20. / this.items, 1- this.constant)) / (1 - this.getZeta({st: 0, n: 2, theta: this.constant, isum: 0 / this.zetan}))
  }


  getZeta = (params: CanGetZeta): number => {
    let {st, n, theta, isum} = params
    let sum = isum, i
    i = st

    while (i < n) {
      sum += 1.0 / Math.pow(i + 1, theta)
      i++ 
    }
    return sum
  }

  next = () => {
    const u = Math.random() 
    const uz = u * this.zetan

    if (uz < 1.0) {
      return this.base
    }

    return this.base + this.items * Math.pow(this.eta * u - this.eta + 1, 1.0 / (1.0 -this.constant))
  }

  nextInt = () => {
    return Math.floor(this.next())
  }

}


const getGenerator = (items) => {
  return new ZipfGenerator(0, items)
}

export {ZipfGenerator}