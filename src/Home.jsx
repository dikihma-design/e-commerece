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
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home