import { useState } from "react";
import Header from "./components/templates/Header";

function DetailProduct(){
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
            <Header />
            <div className="content">
                <div className="content-data">
                        <div className="detail-head">
                            <div className="breadcrumb">
                                <ul>
                                    <li>Novel</li>
                                    <li> / Fantasi</li>
                                    <li className="active"> / Nebula</li>
                                </ul>
                            </div>
                        </div>
                        <div className="split-detail">
                            <div className="left-detail">
                                <div className="image-detail">
                                    <img src={`/assets/images/nebula.jpg`}/>
                                </div>
                            </div>
                            <div className="right-detail">

                            </div>
                        </div>
                    
                </div>
            </div>
        </>
    )
}

export default DetailProduct