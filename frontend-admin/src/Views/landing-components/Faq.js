import TitleBanner from '../layout-components/TitleBanner';
import React, { Component, useEffect, useState } from 'react';
import Packages from './Packages';

const Faq = () => {

    const [faqList, setFaqList] = useState([]);
    const getFAQ = () => {
      
        fetch(process.env.REACT_APP_MAIN_API +'settings/faq')
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1) {
                    var x = json.message;
                    setFaqList(x)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => console.log(""));
    }
  
    const [selectedId, setSelectId] = useState(1);

function selectQuestion(id){
    setSelectId(id)
}
    useEffect(()=>{
        getFAQ()
    },[])

    const faqView = <section class="faq-area bg-color-e9f7fe ptb-100">
    <div class="container">
        <div class="faq-accordion">
            <ol class="accordion">
              {faqList.map(x =>
                <li onClick={() => selectQuestion(x.id)} class="accordion-item">
                   
                        <h6 class="font-weight-bold m-3">{x.question}</h6>
                   
                    <div style={{display: selectedId == x.id? `block` : `none` }} className={"accordion-content"}>
                        <div className='col-12 m-3'>
                        <div dangerouslySetInnerHTML={{ __html: x.answer }} />
                        </div>
                    </div>
                </li>
                )}
</ol>

        </div>
    </div>
</section>
  
    return <>
    <TitleBanner Title="FAQ" Info="Everything you need to know" />
{faqView}
<Packages/>
                    </>
}
export default Faq