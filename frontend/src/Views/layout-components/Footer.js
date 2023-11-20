import React, { Component, useEffect, useState } from 'react';
import Header from './Header';
import { Link, Outlet } from "react-router-dom";

const Footer = () => {    
    const [websiteDetails, setWebsiteDetails] = useState([])
    const GetWebsiteDetails = () => {         
        fetch(process.env.REACT_APP_MAIN_API + 'settings/website_settings')
      .then((response) => response.json())
      .then((json) => {
          if (json.status == 1) { 
            setWebsiteDetails(json.message)         
          }
      })
      .catch((error) => console.error(error))
      .finally(console.log(""))
    }

    useEffect( () => {
        GetWebsiteDetails()
     },[]);

return(
    <div data-elementor-type="footer" data-elementor-id="200" class="elementor elementor-200 elementor-location-footer">
<div class="elementor-section-wrap">
<section class="elementor-section elementor-top-section elementor-element elementor-element-3dafb6f elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="3dafb6f" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;shape_divider_top&quot;:&quot;curve&quot;,&quot;shape_divider_top_negative&quot;:&quot;yes&quot;}">
<div class="elementor-background-overlay"></div>
<div class="elementor-shape elementor-shape-top" data-negative="true">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
<path class="elementor-shape-fill" d="M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z"></path>
</svg> </div>
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-row">
<div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-13da4a8" data-id="13da4a8" data-element_type="column">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-widget-wrap">
<section class="elementor-section elementor-inner-section elementor-element elementor-element-6d8da1c elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="6d8da1c" data-element_type="section">
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-row">
<div class="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-864b40e" data-id="864b40e" data-element_type="column">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-widget-wrap">
<div class="elementor-element elementor-element-cdbb712 elementor-widget__width-initial elementor-widget elementor-widget-spacer" data-id="cdbb712" data-element_type="widget" data-widget_type="spacer.default">
<div class="elementor-widget-container">
<div class="elementor-spacer">
<div class="elementor-spacer-inner"></div>
</div>
</div>
</div>
<div class="elementor-element elementor-element-48d062f elementor-widget__width-initial elementor-widget elementor-widget-spacer" data-id="48d062f" data-element_type="widget" data-widget_type="spacer.default">
<div class="elementor-widget-container">
<div class="elementor-spacer">
<div class="elementor-spacer-inner"></div>
</div>
</div>
</div>
<div class="elementor-element elementor-element-0787b1b elementor-widget__width-auto elementor-widget elementor-widget-heading" data-id="0787b1b" data-element_type="widget" data-widget_type="heading.default">
<div class="elementor-widget-container">
<span class="elementor-heading-title elementor-size-default">{websiteDetails.title}</span> </div>
</div>
<div class="elementor-element elementor-element-bcfd74b elementor-widget elementor-widget-text-editor" data-id="bcfd74b" data-element_type="widget" data-widget_type="text-editor.default">
<div class="elementor-widget-container">
<div class="elementor-text-editor elementor-clearfix">
<p>Profitable sports trading for everyone. With short rich, you can make profit in a short time.&nbsp;</p> </div>
</div>
</div>
<div class="elementor-element elementor-element-2d1ee90 e-grid-align-left elementor-shape-circle e-grid-align-tablet-center e-grid-align-mobile-left elementor-grid-0 elementor-widget elementor-widget-social-icons" data-id="2d1ee90" data-element_type="widget" data-widget_type="social-icons.default">
<div class="elementor-widget-container">
<div class="elementor-social-icons-wrapper elementor-grid">

<span class="elementor-grid-item">
<a href={websiteDetails.telegram} class="elementor-icon elementor-social-icon elementor-social-icon-facebook elementor-repeater-item-9f3a8e8" target="_blank">
<span class="elementor-screen-only">Telegram</span>
<i class="fab fa-telegram"></i> </a>
</span>

</div>
</div>
</div>
</div>
</div>
</div>
<div class="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-c76b218" data-id="c76b218" data-element_type="column">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-widget-wrap">
<section class="elementor-section elementor-inner-section elementor-element elementor-element-4c0f34a elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="4c0f34a" data-element_type="section">
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-row">
<div class="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-cbcc0e8" data-id="cbcc0e8" data-element_type="column">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-widget-wrap">
<div class="elementor-element elementor-element-d68db26 elementor-widget__width-initial elementor-widget elementor-widget-spacer" data-id="d68db26" data-element_type="widget" data-widget_type="spacer.default">
<div class="elementor-widget-container">
<div class="elementor-spacer">
<div class="elementor-spacer-inner"></div>
</div>
</div>
</div>
<div class="elementor-element elementor-element-6f903d6 elementor-widget__width-auto elementor-widget-tablet__width-inherit elementor-view-default elementor-vertical-align-top elementor-widget elementor-widget-icon-box" data-id="6f903d6" data-element_type="widget" data-widget_type="icon-box.default">
<div class="elementor-widget-container">
<div class="elementor-icon-box-wrapper">
<div class="elementor-icon-box-content">
<h2 class="elementor-icon-box-title">
<span>
Phone </span>
</h2>
<p class="elementor-icon-box-description">
{websiteDetails.phone} </p>
</div>
</div>
</div>
</div>
<div class="elementor-element elementor-element-f6ad57a elementor-widget elementor-widget-heading" data-id="f6ad57a" data-element_type="widget" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h3 class="elementor-heading-title elementor-size-default">Quick Links</h3> </div>
</div>
<div class="elementor-element elementor-element-ec8f3d4 elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-id="ec8f3d4" data-element_type="widget" data-widget_type="icon-list.default">
<div class="elementor-widget-container">
<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item">
<Link className='text-white' to="/posts">Posts</Link>
</li>
<li class="elementor-icon-list-item">
<Link className='text-white' to="/contact-us">Contact Us</Link>
</li>
<li class="elementor-icon-list-item">
<a className='text-white' href={websiteDetails.telegram}>Telegram Chat</a>
</li>
</ul>
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
<div class="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-f205874" data-id="f205874" data-element_type="column">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-widget-wrap">
<section class="elementor-section elementor-inner-section elementor-element elementor-element-c4c8047 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="c4c8047" data-element_type="section">
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-row">
<div class="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-6758a8a" data-id="6758a8a" data-element_type="column">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-widget-wrap">
<div class="elementor-element elementor-element-d18923d elementor-widget__width-initial elementor-widget elementor-widget-spacer" data-id="d18923d" data-element_type="widget" data-widget_type="spacer.default">
<div class="elementor-widget-container">
<div class="elementor-spacer">
<div class="elementor-spacer-inner"></div>
</div>
</div>
</div>
<div class="elementor-element elementor-element-f9b798f elementor-widget__width-auto elementor-widget-tablet__width-inherit elementor-view-default elementor-vertical-align-top elementor-widget elementor-widget-icon-box" data-id="f9b798f" data-element_type="widget" data-widget_type="icon-box.default">
<div class="elementor-widget-container">
<div class="elementor-icon-box-wrapper">
<div class="elementor-icon-box-content">
<h2 class="elementor-icon-box-title">
<span>
Email </span>
</h2>
<p class="elementor-icon-box-description">
<a href={"mailto://"+websiteDetails.email} class="__cf_email__" >{websiteDetails.email}</a> </p>
</div>
</div>
</div>
</div>
<div class="elementor-element elementor-element-712ad18 elementor-widget elementor-widget-heading" data-id="712ad18" data-element_type="widget" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h3 class="elementor-heading-title elementor-size-default">Quick Links</h3> </div>
</div>
<div class="elementor-element elementor-element-8147735 elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-id="8147735" data-element_type="widget" data-widget_type="icon-list.default">
<div class="elementor-widget-container">
<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item">
    <Link className='text-white' to="/login">Sign In</Link>
</li>
<li class="elementor-icon-list-item">
<Link className='text-white' to="/register">Register</Link>
</li>
<li class="elementor-icon-list-item">
<Link className='text-white' to="/faq">FAQ</Link>

</li>
</ul>
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
<div class="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-3a8c8b7" data-id="3a8c8b7" data-element_type="column">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-widget-wrap">
<section class="elementor-section elementor-inner-section elementor-element elementor-element-077416f elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="077416f" data-element_type="section">
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-row">
<div class="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-107be05" data-id="107be05" data-element_type="column">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-widget-wrap">
<div class="elementor-element elementor-element-0a87d44 elementor-widget__width-initial elementor-widget elementor-widget-spacer" data-id="0a87d44" data-element_type="widget" data-widget_type="spacer.default">
<div class="elementor-widget-container">
<div class="elementor-spacer">
<div class="elementor-spacer-inner"></div>
</div>
</div>
</div>
<div class="elementor-element elementor-element-861a0ab elementor-widget__width-auto elementor-widget-tablet__width-inherit elementor-view-default elementor-vertical-align-top elementor-widget elementor-widget-icon-box" data-id="861a0ab" data-element_type="widget" data-widget_type="icon-box.default">
<div class="elementor-widget-container">
<div class="elementor-icon-box-wrapper">
<div class="elementor-icon-box-content">
<h2 class="elementor-icon-box-title">
<span>
Location </span>
</h2>
<p class="elementor-icon-box-description">
{websiteDetails.address} </p>
</div>
</div>
</div>
</div>
<div class="elementor-element elementor-element-777de56 elementor-widget elementor-widget-heading" data-id="777de56" data-element_type="widget" data-widget_type="heading.default">
<div class="elementor-widget-container">
<h3 class="elementor-heading-title elementor-size-default">Newsletter</h3> </div>
</div>
<div class="elementor-element elementor-element-c11ba47 elementor-button-align-stretch elementor-widget elementor-widget-form" data-id="c11ba47" data-element_type="widget" data-settings="{&quot;step_next_label&quot;:&quot;Next&quot;,&quot;step_previous_label&quot;:&quot;Previous&quot;,&quot;button_width&quot;:&quot;100&quot;,&quot;step_type&quot;:&quot;number_text&quot;,&quot;step_icon_shape&quot;:&quot;circle&quot;}" data-widget_type="form.default">
<div class="elementor-widget-container">
<input type="hidden" name="post_id" value="200" />
<input type="hidden" name="form_id" value="c11ba47" />
<input type="hidden" name="referer_title" value="" />
<input type="hidden" name="queried_id" value="1056" />
<div class="elementor-form-fields-wrapper elementor-labels-">
<div class="elementor-field-type-email elementor-field-group elementor-column elementor-field-group-email elementor-col-100 elementor-field-required">
<label for="form-field-email" class="elementor-field-label elementor-screen-only">
Email </label>
<input size="1" type="email" name="form_fields[email]" id="form-field-email" class="elementor-field elementor-size-lg  elementor-field-textual" placeholder="Email" required="required" aria-required="true" />
</div>
<div class="elementor-field-group elementor-column elementor-field-type-submit elementor-col-100 e-form__buttons">
<button type="submit" class="elementor-button elementor-size-lg elementor-animation-pop">
<span>
 <span class=" elementor-button-icon">
</span>
<span class="elementor-button-text">Subscribe</span>
</span>
</button>
</div>
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
<section class="elementor-section elementor-inner-section elementor-element elementor-element-a52c85f elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="a52c85f" data-element_type="section">
<div class="elementor-container elementor-column-gap-default">
<div class="elementor-row">
<div class="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-d929385" data-id="d929385" data-element_type="column">
<div class="elementor-column-wrap elementor-element-populated">
<div class="elementor-widget-wrap">
<div class="elementor-element elementor-element-6ef7e7a elementor-widget elementor-widget-text-editor" data-id="6ef7e7a" data-element_type="widget" data-widget_type="text-editor.default">
<div class="elementor-widget-container">
<div class="elementor-text-editor elementor-clearfix">
©2023 – {websiteDetails.title} </div>
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
</div>
</div>
)}
export default Footer