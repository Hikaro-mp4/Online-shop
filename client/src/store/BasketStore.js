import{makeAutoObservable} from 'mobx'

export default class BasketStore{
    constructor(){

        this._basket=[]
        this._count=0
        makeAutoObservable(this)
    }


    setBasket(basket){
        this._basket=basket
    }

    setBasketCount(count){
        this._count=count
    }

    get basket(){
        return this._basket
    }

    get basketCount(){
        return this._count
    }
}