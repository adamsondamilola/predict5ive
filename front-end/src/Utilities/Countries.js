const countryAndDialCodes = [
    // { label: "+234", value: "Nigeria" },
     { label: "+93", value: "Afghanistan" },
     { label: "+355", value: "Albania" },
     { label: "+213", value: "Algeria" },
     { label: "+1", value: "American Samoa" },
     { label: "+376", value: "Andorra" },
     { label: "+244", value: "Angola" },
     { label: "+1", value: "Anguilla" },
     { label: "+1", value: "Antigua & Barbuda" },
     { label: "+54", value: "Argentina" },
     { label: "+374", value: "Armenia" },
     { label: "+297", value: "Aruba" },
     { label: "+247", value: "Ascension Island" },
     { label: "+61", value: "Australia" },
     { label: "+43", value: "Austria" },
     { label: "+994", value: "Azerbaijan" },
     { label: "+1", value: "Bahamas" },
     { label: "+973", value: "Bahrain" },
     { label: "+880", value: "Bangladesh" },
     { label: "+1", value: "Barbados" },
     { label: "+375", value: "Belarus" },
     { label: "+32", value: "Belgium" },
     { label: "+501", value: "Belize" },
     { label: "+229", value: "Benin" },
     { label: "+1", value: "Bermuda" },
     { label: "+975", value: "Bhutan" },
     { label: "+591", value: "Bolivia" },
     { label: "+387", value: "Bosnia & Herzegovina" },
     { label: "+267", value: "Botswana" },
     { label: "+55", value: "Brazil" },
     { label: "+246", value: "British Indian Ocean Territory" },
     { label: "+1", value: "British Virgin Islands" },
     { label: "+673", value: "Brunei" },
     { label: "+359", value: "Bulgaria" },
     { label: "+226", value: "Burkina Faso" },
     { label: "+257", value: "Burundi" },
     { label: "+855", value: "Cambodia" },
     { label: "+237", value: "Cameroon" },
     { label: "+1", value: "Canada" },
     { label: "+238", value: "Cape Verde" },
     { label: "+599", value: "Caribbean Netherlands" },
     { label: "+1", value: "Cayman Islands" },
     { label: "+236", value: "Central African Republic" },
     { label: "+235", value: "Chad" },
     { label: "+56", value: "Chile" },
     { label: "+86", value: "China" },
     { label: "+57", value: "Colombia" },
     { label: "+269", value: "Comoros" },
     { label: "+242", value: "Congo - Brazzaville" },
     { label: "+243", value: "Congo - Kinshasa" },
     { label: "+682", value: "Cook Islands" },
     { label: "+506", value: "Costa Rica" },
     { label: "+225", value: "Côte d’Ivoire" },
     { label: "+385", value: "Croatia" },
     { label: "+53", value: "Cuba" },
     { label: "+599", value: "Curaçao" },
     { label: "+357", value: "Cyprus" },
     { label: "+420", value: "Czechia" },
     { label: "+45", value: "Denmark" },
     { label: "+253", value: "Djibouti" },
     { label: "+1", value: "Dominica" },
     { label: "+1", value: "Dominican Republic" },
     { label: "+593", value: "Ecuador" },
     { label: "+20", value: "Egypt" },
     { label: "+503", value: "El Salvador" },
     { label: "+240", value: "Equatorial Guinea" },
     { label: "+291", value: "Eritrea" },
     { label: "+372", value: "Estonia" },
     { label: "+251", value: "Ethiopia" },
     { label: "+500", value: "Falkland Islands (Islas Malvinas)" },
     { label: "+298", value: "Faroe Islands" },
     { label: "+679", value: "Fiji" },
     { label: "+358", value: "Finland" },
     { label: "+33", value: "France" },
     { label: "+594", value: "French Guiana" },
     { label: "+689", value: "French Polynesia" },
     { label: "+241", value: "Gabon" },
     { label: "+220", value: "Gambia" },
     { label: "+995", value: "Georgia" },
     { label: "+49", value: "Germany" },
     { label: "+233", value: "Ghana" },
     { label: "+350", value: "Gibraltar" },
     { label: "+30", value: "Greece" },
     { label: "+299", value: "Greenland" },
     { label: "+1", value: "Grenada" },
     { label: "+590", value: "Guadeloupe" },
     { label: "+1", value: "Guam" },
     { label: "+502", value: "Guatemala" },
     { label: "+224", value: "Guinea" },
     { label: "+245", value: "Guinea-Bissau" },
     { label: "+592", value: "Guyana" },
     { label: "+509", value: "Haiti" },
     { label: "+504", value: "Honduras" },
     { label: "+852", value: "Hong Kong" },
     { label: "+36", value: "Hungary" },
     { label: "+354", value: "Iceland" },
     { label: "+91", value: "India" },
     { label: "+62", value: "Indonesia" },
     { label: "+98", value: "Iran" },
     { label: "+964", value: "Iraq" },
     { label: "+353", value: "Ireland" },
     { label: "+972", value: "Israel" },
     { label: "+39", value: "Italy" },
     { label: "+1", value: "Jamaica" },
     { label: "+81", value: "Japan" },
     { label: "+962", value: "Jordan" },
     { label: "+7", value: "Kazakhstan" },
     { label: "+254", value: "Kenya" },
     { label: "+686", value: "Kiribati" },
     { label: "+383", value: "Kosovo" },
     { label: "+965", value: "Kuwait" },
     { label: "+996", value: "Kyrgyzstan" },
     { label: "+856", value: "Laos" },
     { label: "+371", value: "Latvia" },
     { label: "+961", value: "Lebanon" },
     { label: "+266", value: "Lesotho" },
     { label: "+231", value: "Liberia" },
     { label: "+218", value: "Libya" },
     { label: "+423", value: "Liechtenstein" },
     { label: "+370", value: "Lithuania" },
     { label: "+352", value: "Luxembourg" },
     { label: "+853", value: "Macau" },
     { label: "+389", value: "Macedonia (FYROM)" },
     { label: "+261", value: "Madagascar" },
     { label: "+265", value: "Malawi" },
     { label: "+60", value: "Malaysia" },
     { label: "+960", value: "Maldives" },
     { label: "+223", value: "Mali" },
     { label: "+356", value: "Malta" },
     { label: "+692", value: "Marshall Islands" },
     { label: "+596", value: "Martinique" },
     { label: "+222", value: "Mauritania" },
     { label: "+230", value: "Mauritius" },
     { label: "+52", value: "Mexico" },
     { label: "+691", value: "Micronesia" },
     { label: "+373", value: "Moldova" },
     { label: "+377", value: "Monaco" },
     { label: "+976", value: "Mongolia" },
     { label: "+382", value: "Montenegro" },
     { label: "+1", value: "Montserrat" },
     { label: "+212", value: "Morocco" },
     { label: "+258", value: "Mozambique" },
     { label: "+95", value: "Myanmar (Burma)" },
     { label: "+264", value: "Namibia" },
     { label: "+674", value: "Nauru" },
     { label: "+977", value: "Nepal" },
     { label: "+31", value: "Netherlands" },
     { label: "+687", value: "New Caledonia" },
     { label: "+64", value: "New Zealand" },
     { label: "+505", value: "Nicaragua" },
     { label: "+227", value: "Niger" },
     { label: "+234", value: "Nigeria" },
     { label: "+683", value: "Niue" },
     { label: "+672", value: "Norfolk Island" },
     { label: "+850", value: "North Korea" },
     { label: "+1", value: "Northern Mariana Islands" },
     { label: "+47", value: "Norway" },
     { label: "+968", value: "Oman" },
     { label: "+92", value: "Pakistan" },
     { label: "+680", value: "Palau" },
     { label: "+970", value: "Palestine" },
     { label: "+507", value: "Panama" },
     { label: "+675", value: "Papua New Guinea" },
     { label: "+595", value: "Paraguay" },
     { label: "+51", value: "Peru" },
     { label: "+63", value: "Philippines" },
     { label: "+48", value: "Poland" },
     { label: "+351", value: "Portugal" },
     { label: "+1", value: "Puerto Rico" },
     { label: "+974", value: "Qatar" },
     { label: "+262", value: "Réunion" },
     { label: "+40", value: "Romania" },
     { label: "+7", value: "Russia" },
     { label: "+250", value: "Rwanda" },
     { label: "+685", value: "Samoa" },
     { label: "+378", value: "San Marino" },
     { label: "+239", value: "São Tomé & Príncipe" },
     { label: "+966", value: "Saudi Arabia" },
     { label: "+221", value: "Senegal" },
     { label: "+381", value: "Serbia" },
     { label: "+248", value: "Seychelles" },
     { label: "+232", value: "Sierra Leone" },
     { label: "+65", value: "Singapore" },
     { label: "+1", value: "Sint Maarten" },
     { label: "+421", value: "Slovakia" },
     { label: "+386", value: "Slovenia" },
     { label: "+677", value: "Solomon Islands" },
     { label: "+252", value: "Somalia" },
     { label: "+27", value: "South Africa" },
     { label: "+82", value: "South Korea" },
     { label: "+211", value: "South Sudan" },
     { label: "+34", value: "Spain" },
     { label: "+94", value: "Sri Lanka" },
     { label: "+590", value: "St Barthélemy" },
     { label: "+290", value: "St Helena" },
     { label: "+1", value: "St Kitts & Nevis" },
     { label: "+1", value: "St Lucia" },
     { label: "+590", value: "St Martin" },
     { label: "+508", value: "St Pierre & Miquelon" },
     { label: "+1", value: "St Vincent & Grenadines" },
     { label: "+249", value: "Sudan" },
     { label: "+597", value: "Suriname" },
     { label: "+268", value: "Swaziland" },
     { label: "+46", value: "Sweden" },
     { label: "+41", value: "Switzerland" },
     { label: "+963", value: "Syria" },
     { label: "+886", value: "Taiwan" },
     { label: "+992", value: "Tajikistan" },
     { label: "+255", value: "Tanzania" },
     { label: "+66", value: "Thailand" },
     { label: "+670", value: "Timor-Leste" },
     { label: "+228", value: "Togo" },
     { label: "+690", value: "Tokelau" },
     { label: "+676", value: "Tonga" },
     { label: "+1", value: "Trinidad & Tobago" },
     { label: "+216", value: "Tunisia" },
     { label: "+90", value: "Turkey" },
     { label: "+993", value: "Turkmenistan" },
     { label: "+1", value: "Turks & Caicos Islands" },
     { label: "+688", value: "Tuvalu" },
     { label: "+256", value: "Uganda" },
     { label: "+380", value: "Ukraine" },
     { label: "+971", value: "United Arab Emirates" },
     { label: "+44", value: "United Kingdom" },
     { label: "+1", value: "United States" },
     { label: "+598", value: "Uruguay" },
     { label: "+1", value: "US Virgin Islands" },
     { label: "+998", value: "Uzbekistan" },
     { label: "+678", value: "Vanuatu" },
     { label: "+39", value: "Vatican City" },
     { label: "+58", value: "Venezuela" },
     { label: "+84", value: "Vietnam" },
     { label: "+681", value: "Wallis & Futuna" },
     { label: "+967", value: "Yemen" },
     { label: "+260", value: "Zambia" },
     { label: "+263", value: "Zimbabwe" }
   ];

   export default  countryAndDialCodes