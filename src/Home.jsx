import { useState } from "react";
import Header from "./components/templates/Header";

function Home(){
    const [filterLeft, setFilterLeft] = useState([
        {
            code : "book_category",
            name : "Book category",
            dd_class : "hide",
            dd_item : [
                {
                    link : '#',
                    name : 'Science'
                },
                {
                    link : '#',
                    name : 'Business'
                }
            ]
        },
        {
            code : "type",
            name : "Tipe",
            dd_class : "hide",
            dd_item : [
                {
                    link : '#',
                    name : 'Promo'
                },
                {
                    link : '#',
                    name : 'Flash Sale'
                }
            ]
        }
    ]);

    const [filterRight , setFilterRight] = useState([
        {
            code : 'sort_by',
            name : "Sort By",
            dd_class : "hide",
            dd_item : [
                {
                    link : "#",
                    name : "Name"
                },
                {
                    link : "#",
                    name : "Date"
                },
                {
                    link : "#",
                    name : "Date"
                },
            ]
        }
    ])

    const [products , setProducts] = useState([
        {
            code : 'tentang_kamu',
            image : 'tentang-kamu.png',
            title : 'Tentang Kamu',
            author : 'Tere Liye',
            harga : 80000
        },
        {
            code : 'pergi',
            image : 'pergi.jpg',
            title : 'Pergi',
            author : 'Tere Liye',
            harga : 98000
        },
        {
            code : 'nebula',
            image : 'nebula.jpg',
            title : 'Nebula',
            author : 'Tere Liye',
            harga : 102000
        },
        {
            code : 'moon',
            image : 'moon.jpg',
            title : 'Moon',
            author : 'Tere Liye',
            harga : 110000
        }
    ])

    const toggleDropDown = (code) => {
        const newFilter = []
        for (const fl of filterLeft){
            const rebuildFilter = fl;
            if (rebuildFilter.code == code){
                rebuildFilter.dd_class = rebuildFilter.dd_class == 'hide' ? '' : 'hide'
            } else {
                rebuildFilter.dd_class = 'hide'
            }
            
            newFilter.push(rebuildFilter)
        }

        setFilterLeft(newFilter)
    }

    const toggleDropDownRight = (code) => {
        const newFilter = []
        for (const fl of filterRight){
            const rebuildFilter = fl;
            if (rebuildFilter.code == code){
                rebuildFilter.dd_class = rebuildFilter.dd_class == 'hide' ? '' : 'hide'
            } else {
                rebuildFilter.dd_class = 'hide'
            }
            
            newFilter.push(rebuildFilter)
        }

        setFilterRight(newFilter)
    }
    const numberFormat = (number) =>{
        
        let str = number.toString();
        let parts = str.split('.');
        let integerPart = parts[0];
        let decimalPart = parts[1] ? '.' + parts[1] : '';
        
        
        let formatted = '';
        for (let i = integerPart.length - 1, count = 0; i >= 0; i--, count++) {
            if (count > 0 && count % 3 === 0) {
            formatted = '.' + formatted;
            }
            formatted = integerPart[i] + formatted;
        }
        
        return formatted + decimalPart;
    }
    return (

        
        <>
            <Header/>
            <div className="content">
                <div className="image-head">
                    <img src={"/assets/images/bannerv2.jpg"}/>
                </div>
                <div className="content-filter">
                    <div className="cf-right">
                        {filterLeft.map((val , idx) => (
                            <div className="dropdown-btn">
                                <button className="btn-outlined" type="button" onClick={() => toggleDropDown(val.code)}>
                                    {val.name}  <i className="arrow down"></i>
                                </button>
                                <div className={`dropdown-item ${val.dd_class}`}>
                                    {val.dd_item.map((dd , dd_idx) => (
                                        <a href="#" onClick={() => toggleDropDown('')}>{dd.name}</a>
                                    ))}
                                </div>    
                            </div>
                        ))}
                        
                        
                    </div>
                    <div className="cf-left">
                        {filterRight.map((val , idx) => (
                            <div className="dropdown-btn">
                                <button className="btn-outlined transparent" type="button" onClick={() => toggleDropDownRight(val.code)}>
                                    {val.name}  <i className="arrow down"></i>
                                </button>
                                <div className="dropdown-item transparent hide">
                                    {val.dd_item.map((dd , dd_idx) => (
                                        <a href="#" onClick={() => toggleDropDownRight('')}>{dd.name}</a>
                                    ))}
                                </div>    
                            </div>
                        ))}
                    </div>
                </div>
                <div className="content-data">
                    <div className="cd-item">
                        <div className="cd-item-product">
                            {products.map((v, k) => (
                                <div className="cdi-card" key={k}>
                                    <div className="cdic-image">
                                        <img src={`/assets/images/${v.image}`}/>
                                    </div>
                                    <div className="cdic-title">
                                        {v.title}
                                    </div>
                                    <div className="cdic-foot">
                                        <div className="cdic-author">
                                            {v.author}
                                        </div>
                                        <div className="cdic-price">
                                            Rp. {numberFormat(v.harga)}
                                        </div>
                                    </div>
                                    <div className="cdic-button">
                                        <button className="but-main">
                                            <i className="fas fa-cart-plus"></i> Add to chart
                                        </button>
                                    </div>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home