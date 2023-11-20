import React, { Component, useEffect, useState } from 'react';
import ConvertToRate from '../../Utilities/ConvertToRate';
import { Link, useParams } from 'react-router-dom';
const Packages = () => {

	const[country, setCountry] = useState();
	const getCountry = () =>{
		fetch(process.env.REACT_APP_MAIN_API +'settings/get_country')
	.then((response) => response.json())
	.then((json) => {
		if (json.status == 1) {
			setCountry(json.message)
		}
	})
	.catch((error) => console.error(error))
	.finally(() => console.log(""));
	}

	useEffect(() => {
		getCountry()
	},[])

    return <section class="elementor-section elementor-top-section elementor-element elementor-element-51184324 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="51184324" data-element_type="section">
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-row">
<div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-2885fe92" data-id="2885fe92" data-element_type="column">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-widget-wrap">
<section class="elementor-section elementor-inner-section elementor-element elementor-element-46acc628 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="46acc628" data-element_type="section">
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-row">
<div class="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-4a1ff380" data-id="4a1ff380" data-element_type="column">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-widget-wrap">
<div class="elementor-element elementor-element-7d8e78ce elementor-widget elementor-widget-heading animated fadeInUp" data-id="7d8e78ce" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;}" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h2 class="elementor-heading-title elementor-size-default">Our Packages</h2> </div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<section class="elementor-section elementor-inner-section elementor-element elementor-element-72b849d4 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="72b849d4" data-element_type="section">
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-row">
<div class="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-a9e7c19 animated fadeInUp" data-id="a9e7c19" data-element_type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;animation&quot;:&quot;fadeInUp&quot;}">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-widget-wrap">
<section class="elementor-section elementor-inner-section elementor-element elementor-element-47ccaccb elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="47ccaccb" data-element_type="section">
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-row">
<div class="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-369773a1" data-id="369773a1" data-element_type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-background-overlay"></div>
<div class="elementor-widget-wrap">
<div class="elementor-element elementor-element-31fdfa05 elementor-widget elementor-widget-heading" data-id="31fdfa05" data-element_type="widget" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h3 class="elementor-heading-title elementor-size-default">Basic</h3> </div>
</div>
<div class="elementor-element elementor-element-340b33dd elementor-widget__width-auto elementor-widget elementor-widget-heading" data-id="340b33dd" data-element_type="widget" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h4 class="elementor-heading-title elementor-size-default">{ConvertToRate(country, 5)}</h4> </div>
</div>
<div class="elementor-element elementor-element-5325346f elementor-widget__width-auto elementor-widget elementor-widget-text-editor" data-id="5325346f" data-element_type="widget" data-widget_type="text-editor.default">
<div class="elementor-widget-container">
<div class="elementor-text-editor elementor-clearfix">
<p>/year</p> </div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<div class="elementor-element elementor-element-49e1f55c elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-id="49e1f55c" data-element_type="widget" data-widget_type="icon-list.default">
<div class="elementor-widget-container">
<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item">
<span class="elementor-icon-list-icon">
<i aria-hidden="true" class="fas fa-check"></i> </span>
<span class="elementor-icon-list-text">Free Games</span>
</li>
<li class="elementor-icon-list-item">
<span class="elementor-icon-list-icon">
<i aria-hidden="true" class="fas fa-check"></i> </span>
<span class="elementor-icon-list-text">Daily Earning / {ConvertToRate(country, 0.2)}</span>
</li>
<li class="elementor-icon-list-item">
	<span class="elementor-icon-list-icon">
	<i aria-hidden="true" class="fas fa-check"></i> </span>
	<span class="elementor-icon-list-text">Sharing of Posts / {ConvertToRate(country, 0.3)}</span>
	</li>
	<li class="elementor-icon-list-item">
		<span class="elementor-icon-list-icon">
		<i aria-hidden="true" class="fas fa-check"></i> </span>
		<span class="elementor-icon-list-text">Referral Bonus / {ConvertToRate(country, 1)}</span>
		</li>
		<li class="elementor-icon-list-item">
<span class="elementor-icon-list-icon">
<i aria-hidden="true" class="fas fa-times"></i> </span>
<span class="elementor-icon-list-text">Premium Games</span>
</li>
</ul>
</div>
</div>
<div class="elementor-element elementor-element-40759cf8 elementor-mobile-align-justify elementor-widget elementor-widget-button" data-id="40759cf8" data-element_type="widget" data-widget_type="button.default">
<div class="elementor-widget-container">
<div class="elementor-button-wrapper">
<Link to="/register" class="elementor-button-link elementor-button elementor-size-sm elementor-animation-pop" role="button">
<span class="elementor-button-content-wrapper">
<span class="elementor-button-text">Get Started</span>
</span>
</Link>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-1374939b animated fadeInUp" data-id="1374939b" data-element_type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;animation&quot;:&quot;fadeInUp&quot;}">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-widget-wrap">
<section class="elementor-section elementor-inner-section elementor-element elementor-element-709baf88 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="709baf88" data-element_type="section">
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-row">
<div class="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-54f3e614" data-id="54f3e614" data-element_type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-background-overlay"></div>
<div class="elementor-widget-wrap">
<div class="elementor-element elementor-element-6543b948 elementor-widget elementor-widget-heading" data-id="6543b948" data-element_type="widget" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h3 class="elementor-heading-title elementor-size-default">Standard</h3> </div>
</div>
<div class="elementor-element elementor-element-713d22d8 elementor-widget__width-auto elementor-widget elementor-widget-heading" data-id="713d22d8" data-element_type="widget" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h4 class="elementor-heading-title elementor-size-default">{ConvertToRate(country, 20)}</h4> </div>
</div>
<div class="elementor-element elementor-element-3c452a57 elementor-widget__width-auto elementor-widget elementor-widget-text-editor" data-id="3c452a57" data-element_type="widget" data-widget_type="text-editor.default">
<div class="elementor-widget-container">
<div class="elementor-text-editor elementor-clearfix">
<p>/year</p> </div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<div class="elementor-element elementor-element-17e66d6b elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-id="17e66d6b" data-element_type="widget" data-widget_type="icon-list.default">
<div class="elementor-widget-container">
<ul class="elementor-icon-list-items">
	<li class="elementor-icon-list-item">
		<span class="elementor-icon-list-icon">
		<i aria-hidden="true" class="fas fa-check"></i> </span>
		<span class="elementor-icon-list-text">Free Games</span>
		</li>
		<li class="elementor-icon-list-item">
		<span class="elementor-icon-list-icon">
		<i aria-hidden="true" class="fas fa-check"></i> </span>
		<span class="elementor-icon-list-text">Daily Earning / {ConvertToRate(country, 0.5)}</span>
		</li>
		<li class="elementor-icon-list-item">
		<span class="elementor-icon-list-icon">
		<i aria-hidden="true" class="fas fa-check"></i> </span>
		<span class="elementor-icon-list-text">Sharing of Posts / {ConvertToRate(country, 0.3)}</span>
		</li>
		<li class="elementor-icon-list-item">
			<span class="elementor-icon-list-icon">
			<i aria-hidden="true" class="fas fa-check"></i> </span>
			<span class="elementor-icon-list-text">Referral Bonus / {ConvertToRate(country, 4)}</span>
			</li>
			<li class="elementor-icon-list-item">
		<span class="elementor-icon-list-icon">
		<i aria-hidden="true" class="fas fa-check"></i> </span>
		<span class="elementor-icon-list-text">Premium Games</span>
		</li>
</ul>
</div>
</div>
<div class="elementor-element elementor-element-55157ab3 elementor-mobile-align-justify elementor-widget elementor-widget-button" data-id="55157ab3" data-element_type="widget" data-widget_type="button.default">
<div class="elementor-widget-container">
<div class="elementor-button-wrapper">
<Link to="/register" class="elementor-button-link elementor-button elementor-size-sm elementor-animation-pop" role="button">
<span class="elementor-button-content-wrapper">
<span class="elementor-button-text">Get Started</span>
</span>
</Link>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-2ae59c8b animated fadeInUp" data-id="2ae59c8b" data-element_type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;animation&quot;:&quot;fadeInUp&quot;}">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-widget-wrap">
<section class="elementor-section elementor-inner-section elementor-element elementor-element-184d7227 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="184d7227" data-element_type="section">
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-row">
<div class="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-6d76903" data-id="6d76903" data-element_type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-background-overlay"></div>
<div class="elementor-widget-wrap">
<div class="elementor-element elementor-element-1848a70f elementor-widget elementor-widget-heading" data-id="1848a70f" data-element_type="widget" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h3 class="elementor-heading-title elementor-size-default">Premium</h3> </div>
</div>
<div class="elementor-element elementor-element-2c590301 elementor-widget__width-auto elementor-widget elementor-widget-heading" data-id="2c590301" data-element_type="widget" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h4 class="elementor-heading-title elementor-size-default">{ConvertToRate(country, 50)}</h4> </div>
</div>
<div class="elementor-element elementor-element-49280ba7 elementor-widget__width-auto elementor-widget elementor-widget-text-editor" data-id="49280ba7" data-element_type="widget" data-widget_type="text-editor.default">
<div class="elementor-widget-container">
<div class="elementor-text-editor elementor-clearfix">
<p>/year</p> </div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<div class="elementor-element elementor-element-bbd4abe elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-id="bbd4abe" data-element_type="widget" data-widget_type="icon-list.default">
<div class="elementor-widget-container">
<ul class="elementor-icon-list-items">
	<li class="elementor-icon-list-item">
		<span class="elementor-icon-list-icon">
		<i aria-hidden="true" class="fas fa-check"></i> </span>
		<span class="elementor-icon-list-text">Free Games</span>
		</li>
		<li class="elementor-icon-list-item">
		<span class="elementor-icon-list-icon">
		<i aria-hidden="true" class="fas fa-check"></i> </span>
		<span class="elementor-icon-list-text">Daily Earning / {ConvertToRate(country, 1)}</span>
		</li>
		<li class="elementor-icon-list-item">
		<span class="elementor-icon-list-icon">
		<i aria-hidden="true" class="fas fa-check"></i> </span>
		<span class="elementor-icon-list-text">Sharing of Posts / {ConvertToRate(country, 0.3)}</span>
		</li>
		<li class="elementor-icon-list-item">
			<span class="elementor-icon-list-icon">
			<i aria-hidden="true" class="fas fa-check"></i> </span>
			<span class="elementor-icon-list-text">Referral Bonus / {ConvertToRate(country, 10)}</span>
			</li>
			<li class="elementor-icon-list-item">
		<span class="elementor-icon-list-icon">
		<i aria-hidden="true" class="fas fa-check"></i> </span>
		<span class="elementor-icon-list-text">Premium Games</span>
		</li>
</ul>
</div>
</div>
<div class="elementor-element elementor-element-7b82f790 elementor-mobile-align-justify elementor-widget elementor-widget-button" data-id="7b82f790" data-element_type="widget" data-widget_type="button.default">
<div class="elementor-widget-container">
<div class="elementor-button-wrapper">
<Link to="/register" class="elementor-button-link elementor-button elementor-size-sm elementor-animation-pop" role="button">
<span class="elementor-button-content-wrapper">
<span class="elementor-button-text">Get Started</span>
</span>
</Link>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
</div>
</div>
</div>
</div>
</div>
</section>
}
export default Packages