import{makeAutoObservable} from 'mobx'

export default class DeviceStore{
    constructor(){
        this._types=[
            // {id:1,name:'Холодильники'},
            // {id:2,name:'Смартфоны'},
            // {id:3,name:'Ноутбуки'},
            // {id:4,name:'Микрофоны'},
            // {id:5,name:'Наушники'},
            // {id:6,name:'Колонки'},
        ]
        this._brands=[
            // {id:1,name:'Samsung'},
            // {id:2,name:'Apple'},
            // {id:3,name:'Lenovo'},
            // {id:4,name:'Xiomi'},
        ]
        this._devices=[
            // {id:1,name:'Iphone 12 pro',price:125000,rating:4,img:'https://www.iqmac.ru/upload/iblock/95d/iphone_12_pro_family_hero_all.jpg'},
            // {id:2,name:'Iphone 7 pro',price:122000,rating:4.2,img:'https://www.iqmac.ru/upload/iblock/726/iphone7_black_all.png'},
            // {id:3,name:'Iphone 13 mini',price:152790,rating:3.3,img:'https://www.iqmac.ru/upload/iblock/7d6/afwcxoa5jr33nly2fzaco3u5q2w6344x/iphone_13_blue_select_2021.png'},
            // {id:4,name:'Iphone 12 pro',price:99900,rating:2.7,img:'https://www.iqmac.ru/upload/iblock/95d/iphone_12_pro_family_hero_all.jpg'},
            // {id:5,name:'Iphone 12 pro',price:125000,rating:4,img:'https://www.iqmac.ru/upload/iblock/95d/iphone_12_pro_family_hero_all.jpg'},
            // {id:6,name:'Iphone 12 pro',price:122000,rating:4.2,img:'https://www.iqmac.ru/upload/iblock/95d/iphone_12_pro_family_hero_all.jpg'},
            // {id:7,name:'Iphone 12 pro',price:152790,rating:3.3,img:'https://www.iqmac.ru/upload/iblock/95d/iphone_12_pro_family_hero_all.jpg'},
            // {id:8,name:'Iphone 12',price:99900,rating:2.7,img:'https://www.iqmac.ru/upload/iblock/a78/e4c5220f87aa1a0af1b81682b16338de.jpg'},
            // {id:9,name:'Iphone 12 pro',price:125000,rating:4,img:'https://www.iqmac.ru/upload/iblock/95d/iphone_12_pro_family_hero_all.jpg'},
            // {id:10,name:'Iphone 12 pro',price:122000,rating:4.2,img:'https://www.iqmac.ru/upload/iblock/95d/iphone_12_pro_family_hero_all.jpg'},
            // {id:11,name:'Iphone 12 pro',price:152790,rating:3.3,img:'https://www.iqmac.ru/upload/iblock/95d/iphone_12_pro_family_hero_all.jpg'},
            // {id:12,name:'Iphone 12 pro',price:99900,rating:2.7,img:'https://www.iqmac.ru/upload/iblock/95d/iphone_12_pro_family_hero_all.jpg'},           
        ]
        this._ratings=[]
        
        this._selectedType={}
        this._selectedBrand={}
        this._page=0
        this._totalCount=0
        this._limit=3
        makeAutoObservable(this)
    }

    setTypes(types){
        this._types=types
    }

    setBrands(brands){
        this._brands=brands
    }

    setDevices(devices){
        this._devices=devices
    }

    setSelectedType(selectedType){
        this._selectedType=selectedType
    }

    setRatings(ratings){
        this._ratings=ratings
    }

    setSelectedBrand(selectedBrand){
        this._selectedBrand=selectedBrand
    }

    setPage(page){
        this._page=page
    }

    setTotalCount(totalCount){
        this._totalCount=totalCount
    }

    setLimit(limit){
        this._limit=limit
    }

    get types(){
        return this._types
    }

    get brands(){
        return this._brands
    }

    get devices(){
        return this._devices
    }

    get ratings(){
        return this._ratings
    }

    get selectedType(){
        this.setPage(1)
        return this._selectedType
    }
    
    get selectedBrand(){
        this.setPage(1)
        return this._selectedBrand
    }

    get page(){
        return this._page
    }

    get totalCount(){
        return this._totalCount
    }
    
    get limit(){
        return this._limit
    }

}